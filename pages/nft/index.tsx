import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import * as foundation from '../../method/foundation/fetch'
import * as firebase from "../../method/firebase"
import { NFTDetail, ResponseDetail, Media, NFTPlatform } from '../../interfaces/index'
import { prepareURI, checkDiff, nftSanitizer, makeid } from '../../method/integrate'
import { contractQuerierService } from '../../services/contract-querier.service'
import NFTPage from '@/NFTPage';
import axios from 'axios';

const Page = ({ address, seo, getPlatform, getNFT, getOpensea, getFoundation, getRarible, current_update, galleryst_id }: {
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
  getFoundation?: NFTDetail,
  current_update?: number,
  galleryst_id?: string
}) => {
  const [nft, setNFT] = useState<NFTDetail>(getNFT != undefined ? getNFT : { address })
  const [loading, setLoad] = useState(true)
  const [gallerystID] = useState(galleryst_id != undefined ? galleryst_id : makeid(5))
  const [raribles, setRarible] = useState<NFTDetail>(getRarible != undefined ? getRarible : { address })
  const [openseas, setOpensea] = useState<NFTDetail>(getOpensea != undefined ? getOpensea : { address })
  const [foundations, setFoundation] = useState<NFTDetail>(getFoundation != undefined ? getFoundation : { address })
  const [platform, setPlatform] = useState<NFTPlatform>(getPlatform != undefined ? getPlatform : { current: 'opensea', check: { rarible: { status: false }, opensea: { status: false } } })
  const [copied, setCopied] = useState(false)
  const [mediaList, setMediaList] = useState<Media[]>([])
  const [displayMedia, setDisplayMedia] = useState<Media>({ type: 'image', src: ''})
  const [displayIdx, setDisplayIdx] = useState<number>(0)
  const stateData = {
    nft, loading, gallerystID, raribles, openseas, foundations, platform, copied, mediaList, displayMedia, displayIdx
  }
  const stateAction = { setDisplayMedia, setDisplayIdx, setCopied }
  useEffect(() => {
    (async () => {
      if (current_update != undefined && checkDiff(current_update)) {
        try{ await opensea.getOfferandActivity(address, setOpensea, openseas)}catch(e){ console.log('Opensea offer fetch error ~')}
        try{ await rarible.getOfferandActivity(address, setRarible, raribles) }catch(e){ console.log('Rarible offer fetch error ~') }
        setLoad(false)

        // parse display media
        setNFT(getNFT!)
        if (getPlatform?.current === 'galleryst') {
          setMediaList((getNFT as any)?.mediaList)
          setDisplayMedia((getNFT as any)?.mediaList[0])
        } else {
          let media: Media
          if(getNFT?.video!){
            media = { type: 'video', src: getNFT?.video! }
          }else{
            media = { type: 'image', src: getNFT?.image! }
          }
          setMediaList([media])
          setDisplayMedia(media)
        }
      } else {
        // Rarible
        const [colAddress, tokenIdS] = address.split(':')
        const gallerystTokenMetadata = await contractQuerierService.getMetadataUri(colAddress, +tokenIdS)
        const raribleCheck: ResponseDetail = await rarible.nftDetail(address, setNFT, setRarible)
        const openseaCheck: ResponseDetail = await opensea.nftDetail(address, setNFT, setOpensea)
        const foundationCheck: ResponseDetail = await foundation.nftDetail(address, setNFT, setFoundation)

        const FNDCollection = '0x3b3ee1931dc30c1957379fac9aba94d1c48a5405'
        const RARICollection = ['0xd07dc4262bcdbf85190c01c996b4c06a461d2430','0x60f80121c31a0d46b5279700f9df786054aa5ee5']
        const GallerystCollection = '0x526a1A4b301D38C63bb9f1b8f0EBDeCc0d60192c'

        const checkCurrent =
          (colAddress == GallerystCollection && gallerystTokenMetadata !== null ) ? 'galleryst' :
          (foundationCheck.status && colAddress == FNDCollection) ? 'foundation' :
          (raribleCheck.status && RARICollection.indexOf(colAddress) > -1) ? 'rarible' :
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
            },
            foundation: {
              link: foundationCheck.link,
              status: foundationCheck.status
            }
          }
        }
        setPlatform(platform)
        switch (checkCurrent) {
          case 'opensea': {
            setNFT(openseaCheck.data!);
            if( openseaCheck.data!.video! ){
              setDisplayMedia({ type: 'video', src: openseaCheck.data!.video!})
            }else{
              setDisplayMedia({ type: 'image', src: openseaCheck.data!.image!})
            }
            break;
          }
          case 'rarible': {
            setNFT(raribleCheck.data!);
            if( raribleCheck.data!.video! ){
              setDisplayMedia({ type: 'video', src: raribleCheck.data!.video!})
            }else{
              setDisplayMedia({ type: 'image', src: raribleCheck.data!.image!})
            }
            break;
          }
          case 'foundation': {
            setNFT(foundationCheck.data!);
            if( foundationCheck.data!.video! ){
              setDisplayMedia({ type: 'video', src: foundationCheck.data!.video!})
            }else{
              setDisplayMedia({ type: 'image', src: foundationCheck.data!.image!})
            }
            break;
          }
        }
        // Write to firebase
        await firebase.writeDocument('nft', address, {
          platform,
          rarible: nftSanitizer(raribleCheck),
          opensea: nftSanitizer(openseaCheck),
          foundation: nftSanitizer(foundationCheck),
          current_update: dayjs().unix(),
          galleryst_id: gallerystID,
          address
        })
        // refresh metadata directly from contract
        //   use .then to prevent blocking
        const [contractAddress, tokenId] = address.split(':')
        axios.patch('/api/nft/metadata', { contractAddress, tokenId: +tokenId })
          .then((response) => {
            const galleryst = response?.data?.galleryst?.data
            const mediaList = galleryst?.mediaList
            setMediaList(mediaList)
            setDisplayMedia(mediaList[0])
            setDisplayIdx(0)
          })
          .catch((_e) => {
            // update failed, void handler
            //   every promises is expected to be handled (node:33041)
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
    // console.log(response)
    const {
      platform: getPlatform,
      opensea: { data: getOpensea } = { data: {} },
      rarible: { data: getRarible } = { data: {} },
      foundation: { data: getFoundation } = { data: {} },
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
      props: { address, seo, getPlatform, getNFT, current_update, getOpensea, getFoundation, getRarible, galleryst_id },
    }
  } else {
    return {
      props: { address, seo },
    }
  }
}

export default Page
