import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import * as foundation from '../../method/foundation/fetch'
import * as firebase from "../../method/firebase"
import { NFTDetail, ResponseDetail, Media, NFTPlatform } from '../../interfaces/index'
import { prepareURI, checkDiff, nftSanitizer, makeid } from '../../method/integrate'
import NFTPage from '@/NFTPage';
import axios from 'axios';

export const Filter = ({ current, platform, action, targetAction, target }: {
  target?: NFTDetail,
  targetAction?: any,
  platform: any,
  action: any,
  current: 'rarible' | 'opensea' | 'foundation' | 'nifty',
}) => {
  const market: {
    rarible?: { status: boolean }
    opensea?: { status: boolean }
    foundation?: { status: boolean }
    nifty?: { status: boolean }
  } = platform.check != undefined ? platform.check : {}
  const check = (platform: 'rarible' | 'opensea' | 'foundation' | 'nifty') => {
    switch (platform) {
      case 'rarible':
        return { style: 'text-black bg-yellow-500 rarible-logo logo-48', text: '' }
      case 'opensea':
        return { style: 'text-white bg-blue-500 opensea-logo logo-48', text: '' }
      case 'foundation':
        return { style: 'text-white bg-black foundation-logo logo-48', text: 'F' }
      case 'nifty':
        return { style: 'text-white bg-blue-700 nifty-logo logo-48', text: 'N' }
    }
  }
  const default_style = 'border text-gray-400 bg-gray-200'
  const { text, style } = check(current)
  return <div
    className={`
      cursor-pointer h-12 w-12 mx-2 flex items-center
      shadow-xl justify-center rounded-full shadow-nft text-lg logo-48
      ${platform.current == current && 'border-1 border-green-400 shadow-greenery'}
      ${market[current]?.status ? style : default_style}
    `}
    onClick={() => {
      action({ ...platform , current: current})
      if(targetAction != undefined) targetAction(target)
    }}>
    {text}
  </div>
}

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
        // Fetch lastest activity of NFT
        await opensea.getOfferandActivity(address, setOpensea, openseas)
        await rarible.getOfferandActivity(address, setRarible, raribles)
        setLoad(false)
        // parse display media
        setNFT(getNFT!)
        if (getPlatform?.current === 'galleryst') {
          setMediaList((getNFT as any)?.mediaList)
          setDisplayMedia((getNFT as any)?.mediaList[0])
        } else {
          const media: Media = { type: 'image', src: getNFT?.image! }
          setMediaList([media])
          setDisplayMedia(media)
        }
      } else {
        // Rarible
        // const [contractAddress, tokenId] = address.split(':')
        // const gallerystTokenMetadata = await contractQuerierService.getMetadataUri(contractAddress, +tokenId)
        const raribleCheck: ResponseDetail = await rarible.nftDetail(address, setNFT, setRarible)
        const openseaCheck: ResponseDetail = await opensea.nftDetail(address, setNFT, setOpensea)
        const foundationCheck: ResponseDetail = await foundation.nftDetail(address, setNFT, setFoundation)

        const FNDCollection = '0x3b3ee1931dc30c1957379fac9aba94d1c48a5405'
        const RARICollection = '0xd07dc4262bcdbf85190c01c996b4c06a461d2430'

        const checkCurrent =
        // gallerystTokenMetadata !== null ? 'galleryst' :
          (foundationCheck.status && address.split(':')[0] == FNDCollection) ? 'foundation' :
          (foundationCheck.status && address.split(':')[0] == RARICollection) ? 'rarible' :
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
            setDisplayMedia({ type: 'image', src: openseaCheck.data!.image!})
            break;
          }
          case 'rarible': {
            setNFT(raribleCheck.data!);
            setDisplayMedia({ type: 'image', src: raribleCheck.data!.image!});
            break;
          }
          case 'foundation': {
            setNFT(foundationCheck.data!);
            setDisplayMedia({ type: 'image', src: foundationCheck.data!.image!});
            break;
          }
        }
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
  return <NFTPage prefix={true} getNFT={getNFT} stateData={stateData} stateAction={stateAction} address={address} seo={seo} />
}

export async function getServerSideProps(context: any) {
  const { id } = context.params
  let seo = {
    image: '',
    title: '',
    creator: '',
    description: ''
  }
  const document = await firebase.findDocument("nft", id, "galleryst_id")
  if(document.docs.length > 0){
    const doc : any = document.docs[0]
    const response : any = doc.data()
    const {
      platform: getPlatform,
      opensea: { data: getOpensea } = { data: {}},
      rarible: { data: getRarible } = { data: {}},
      foundation: { data: getFoundation } = { data: {} },
      address , current_update, galleryst_id } = response
    const getNFT = response[getPlatform.current].data
    const constructImage = `https://api.placid.app/u/sxpwrxogf?&thumbnail[image]=${prepareURI(getNFT.image)}&title[text]=${prepareURI(getNFT.title)}&creator_name[text]=${prepareURI(getNFT.creator?.name)}`
    seo = {
      image: constructImage,
      title: getNFT.title != undefined ? getNFT.title : '-',
      description: getNFT.description != undefined ? getNFT.description : '-',
      creator: getNFT.creator?.name != undefined ? getNFT.creator.name : '-',
    }
    return { props: { address, seo, getPlatform, getNFT, current_update, getOpensea, getRarible, getFoundation, galleryst_id }}
  }else{
    return { props: { seo } }
  }
}

export default Page
