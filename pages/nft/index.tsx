import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import * as firebase from "../../method/firebase"
import { NFTDetail, ResponseDetail, Media, NFTPlatform } from '../../interfaces/index'
import { contractQuerierService } from 'services/contract-querier.service';
import { prepareURI, checkDiff, nftSanitizer, makeid } from '../../method/integrate'
import NFTPage from '@/NFTPage';

const Page = ({ address, seo, getPlatform, getNFT, getOpensea, getRarible, current_update, galleryst_id }: {
  address: string,
  seo: {
    image: string,
    title: string,
    creator: string,
    description: string
  },
  getPlatform?: NFTPlatform,
  getNFT?: NFTDetail,
  getOpensea?: NFTDetail,
  getRarible?: NFTDetail,
  current_update?: number,
  galleryst_id?: string
}) => {
  const [nft, setNFT] = useState<NFTDetail>(getNFT != undefined ? getNFT : { address })
  const [loading, setLoad] = useState(true)
  const [gallerystID] = useState(galleryst_id != undefined ? galleryst_id : makeid(5))
  const [raribles, setRarible] = useState<NFTDetail>(getRarible != undefined ? getRarible : { address })
  const [openseas, setOpensea] = useState<NFTDetail>(getOpensea != undefined ? getOpensea : { address })
  const [platform, setPlatform] = useState<NFTPlatform>(getPlatform != undefined ? getPlatform : { current: 'opensea', check: { rarible: { status: false }, opensea: { status: false } } })
  const [copied, setCopied] = useState(false)
  const [mediaList, setMediaList] = useState<Media[]>([])
  const [displayMedia, setDisplayMedia] = useState<Media>({ type: 'image', src: ''})
  const [displayIdx, setDisplayIdx] = useState<number>(0)
  const stateData = {
    nft, loading, gallerystID, raribles, openseas, platform, copied, mediaList, displayMedia, displayIdx
  }
  const stateAction = { setDisplayMedia, setDisplayIdx, setCopied }
  useEffect(() => {
    (async () => {
      if (current_update != undefined && checkDiff(current_update)) {
        // Fetch lastest activity of NFT
        await opensea.getOfferandActivity(address, setOpensea, openseas)
        await rarible.getOfferandActivity(address, setRarible, raribles)
        setLoad(false)
        // parse display media
        setNFT(getNFT!)
        if (getPlatform?.current === 'galleryst') {
          setMediaList((getNFT as any).mediaList)
          setDisplayMedia((getNFT as any).mediaList[0])
        } else {
          const media: Media = { type: 'image', src: getNFT?.image! }
          setMediaList([media])
          setDisplayMedia(media)
        }
      } else {
        // Rarible
        const [contractAddress, tokenId] = address.split(':')
        const gallerystTokenMetadata = await contractQuerierService.getMetadataUri(contractAddress, +tokenId)
        const raribleCheck: ResponseDetail = await rarible.nftDetail(address, setNFT, setRarible)
        const openseaCheck: ResponseDetail = await opensea.nftDetail(address, setNFT, setOpensea)
        const checkCurrent =
          gallerystTokenMetadata !== null ? 'galleryst' :
          raribleCheck.status ? 'rarible' :
          openseaCheck.status ? 'opensea' :
          ''
        const platform = {
          current: checkCurrent,
          check: {
            opensea: {
              link: openseaCheck.link,
              status: openseaCheck.status
            },
            rarible: {
              link: raribleCheck.link,
              status: raribleCheck.status
            }
          }
        }
        let gallerystCheck;
        if (gallerystTokenMetadata !== null) {
          const tmpMediaList: Media[] = [
            { type: 'image', src: gallerystTokenMetadata.image }, // main image
            ...(gallerystTokenMetadata.media_list ?? []) // other media
          ]
          if (!!gallerystTokenMetadata.animation_url) {
            tmpMediaList.unshift({ type: 'video', src: gallerystTokenMetadata.animation_url }) // main video
          }
          setMediaList(tmpMediaList)
          gallerystCheck = {
            status: true,
            data: {
              title: gallerystTokenMetadata.name,
              description: gallerystTokenMetadata.description,
              image: gallerystTokenMetadata.image,
              metadata: gallerystTokenMetadata,
              mediaList: tmpMediaList,
              creator: {
                address: gallerystTokenMetadata.creator ?? ''
              }
            }
          }
        }

        setPlatform(platform)
        switch (checkCurrent) {
          case 'galleryst' : {
            setDisplayMedia(mediaList[0]);
            break;
          }
          case 'opensea': {
            setNFT(openseaCheck.data!);
            setDisplayMedia({ type: 'image', src: openseaCheck.data!.image!})
            break;
          }
          case 'rarible': {
            setNFT(raribleCheck.data!);
            setDisplayMedia({ type: 'image', src: raribleCheck.data!.image!});
            break;
          }
        }
        await firebase.writeDocument('nft', address, {
          platform,
          rarible: nftSanitizer(raribleCheck),
          opensea: nftSanitizer(openseaCheck),
          galleryst: gallerystCheck,
          current_update: dayjs().unix(),
          galleryst_id: gallerystID,
          address
        })
        setLoad(false)
      }
    })()
  }, []);
  return <NFTPage getNFT={getNFT} stateData={stateData} stateAction={stateAction} address={address} seo={seo} />
}

export async function getServerSideProps(context: any) {
  const { address } = context.query
  const document = await firebase.findbyAddress("nft", address)
  let seo = {
    image: '',
    title: '',
    creator: '',
    description: ''
  }
  if (document.exists) {
    const response: any = document.data()
    const {
      platform: getPlatform,
      opensea: { data: getOpensea },
      rarible: { data: getRarible },
      current_update, galleryst_id } = response
    const getNFT = response[getPlatform.current].data
    const constructImage = `https://api.placid.app/u/sxpwrxogf?&thumbnail[image]=${prepareURI(getNFT.image)}&title[text]=${prepareURI(getNFT.title)}&creator_name[text]=${prepareURI(getNFT.creator?.name)}`
    seo = {
      image: constructImage,
      title: getNFT.title != undefined ? getNFT.title : '-',
      description: getNFT.description != undefined ? getNFT.description : '-',
      creator: getNFT.creator?.name != undefined ? getNFT.creator.name : '-',
    }
    return {
      props: { address, seo, getPlatform, getNFT, current_update, getOpensea, getRarible, galleryst_id },
    }
  } else {
    return {
      props: { address, seo },
    }
  }
}

export default Page
