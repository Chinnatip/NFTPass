import Head from 'next/head'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { NextSeo } from 'next-seo';
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import * as firebase from "../../method/firebase"
import { faArrowLeft, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Icon , { Picon } from '@/Icon'
import { NFTDetail, ResponseDetail, Media, NFTPlatform } from '../../interfaces/index'
import { contractQuerierService } from 'services/contract-querier.service';
import { ConnectBtn , profilePic, profileAddress } from '@/Galleryst'
import { prepareURI, checkDiff, nftSanitizer, makeid, selectActivity } from '../../method/integrate'

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
  const { title, description, creator, owner } = nft
  const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')

  const useCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 1300);
  }

  return <div className="w-screen h-screen z-20 bg-white fixed top-0 left-0 overflow-y-scroll overflow-x-hidden">
    <NextSeo
      title={seo.title}
      description={seo.description}
      canonical="https://www.canonical.ie/"
      openGraph={{
        site_name: 'Galleryst',
        url: `https://www.galleryst.co/nft?address=${address}`,
        title: seo.title,
        description: seo.description,
        images: [{ url: seo.image, alt: seo.title, width: 1200, height: 600 }]
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <Head><title>{seo.title}</title></Head>
    {loading && <div className="fixed bottom-0 right-0 m-6 bg-black text-white text-lg rounded-full px-4 py-2">Loading ...</div>}
    <div className="flex flex-col pt-8" style={{ background: 'url("image/bg_blur.jpg")' }}>
      <div className="md:w-4/5 w-full m-auto flex justify-between">
        <a className="focus:outline-none" href={`/`}>
          <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
        </a>
        <ConnectBtn />
      </div>
      <div className="w-full relative flex-col flex items-center justify-center max-w-full m-auto" style={{ height: '75vh' }}>
        <a href={`/`} className="hidden absolute top-2 left-2 bg-white rounded-full h-8 md:w-auto w-8 md:px-2 flex items-center justify-center text-black active-shadow">
          <Icon fill={faArrowLeft} noMargin /> <span className="md:block hidden ml-1">Back</span>
        </a>
        <div className="p-4 flex items-center" style={{ height: mediaList.length > 1 ? '80%' : '100%' }}>
          {displayMedia.type === 'image' && <img src={displayMedia.src} className="shadow-nft-img rounded-lg fit-wh-img" />}
          {displayMedia.type === 'video' && <video src={displayMedia.src} poster="" className="" autoPlay loop muted /*controls*/ />}
        </div>
        <div className="pt-3 text-center flex justify-center items-center">
          {mediaList.length > 1 && mediaList.map((media, idx) => {
            const isDisplaying = displayIdx === idx
            return (
              <div
                className={`
                  cursor-pointer
                  mx-2 shadow-xl
                  rounded-sm
                  transition-width duration-300
                  ${isDisplaying ? 'w-16 sm:w-24 md:w-32' : 'w-12 sm:w-18 md:w-24'}
                `}
                onClick={() => { setDisplayMedia(media); setDisplayIdx(idx); }}
              >
                <div className='flex items-center h-full my-auto'>
                  {media.type === 'image' && <img src={media.src} />}
                  {media.type === 'video' && <video src={media.src} muted autoPlay loop />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-center mt-10 mb-12 hidden">
        <a href={`/profile?address=${address}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
      </div>
    </div>
    <div className="md:w-2/3 w-full m-auto relative">
      {/* Share Galleryst component */}
      {gallerystID != undefined && <div className="flex h-auto absolute md:right-0 right-2 top--12 rounded-full">
        <div className="flex-grow text-xl hidden">
          <span className="text-sm text-gray-600">Galleryst ID</span><br />
          {gallerystID}
        </div>
        <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURI(`https://www.galleryst.co/n/${gallerystID}`)}`} data-size="large" className="shadow-nft mr-4 bg-blue-500 text-white w-auto rounded-full py-3 md:w-auto px-4  text-black active-shadow flex items-center justify-center">share to twitter</a>
        <button
          className="shadow-nft  bg-white w-auto rounded-full py-3 md:w-auto px-4  text-black active-shadow flex items-center justify-center"
          onClick={() => useCopyToClipboard(`https://www.galleryst.co/n/${gallerystID}`)}>
          {copied && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-10 -mr-2 text-sm rounded-full">Copied !</div>}
          <Icon fill={faShareAlt} noMargin /> <span className="ml-2">Share </span>
        </button>

      </div>}
      <div className="mt-10 m-auto w-full md:px-0 px-3 flex lg:flex-row flex-col justify-between">
        <div className="lg:w-1/2 w-full lg:flex lg:flex-col contents">
          <div className="text-2xl order-1 font-black mb-4">{title != null ? title : 'Untitled'}</div>
          <div className="text-gray-500 mb-4 break-words order-2 hidden">{address}</div>
          <div className="order-5 mb-3"><h3 >{description != null ? description : 'No description.'}</h3></div>
          {/* Link to Platform */}
          {platform.check['rarible']?.status && <a href={platform.check['rarible']?.link} target="_blank" className="order-6 flex mt-4 p-4 items-center rounded-24 bg-white shadow-nft active-shadow">
            <span className="flex-grow ">Link to Rarible</span>
            <div className="text-black bg-yellow-500 rarible-logo logo-48 h-12 w-12 rounded-full" ></div>
          </a>}
          {platform.check['opensea']?.status && <a href={platform.check['opensea']?.link} target="_blank" className="order-6 flex mt-4 p-4 items-center rounded-24 bg-white shadow-nft active-shadow">
            <span className="flex-grow ">Link to Opensea</span>
            <div className="text-white bg-blue-500 opensea-logo logo-48 h-12 w-12 rounded-full" ></div>
          </a>}
          {!!(getNFT as any).metadata && <div className='flex flex-wrap order-6 mt-3'>
            {(getNFT as any).metadata?.attributes?.map((attr: any) => {
              return <div className='bg-white rounded-lg flex flex-col p-3 mr-2 flex-grow shadow-nft'>
                <p className="text-xs text-gray-600">#{attr.trait_type}</p>
                <p className="truncate">{attr.value}</p>
              </div>
            })}
          </div>}
        </div>
        <div className="lg:w-1/2 w-full lg:pl-6 pr-0 lg:sticky lg:flex lg:flex-col contents">
          <div className="order-3 mb-4">
            {openseas.pricing?.eth != undefined && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="opensea"></Picon> <span className="text-sm">Lowest listing price</span>
              </span>
              <span className="text-right">{openseas.pricing?.eth} ETH</span>
            </div>}
            {raribles.pricing?.eth != undefined && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="rarible"></Picon> <span className="text-sm">Lowest listing price</span>
              </span>
              <span className="text-right">{raribles.pricing?.eth} ETH</span>
            </div>}
            {openseas.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="opensea"></Picon> <span className="text-sm">Current best offer</span>
              </span>
              <span className="text-right"> {openseas.offer?.best_offer?.toFixed(2)} ETH</span>
            </div>}
            {raribles.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="rarible"></Picon> <span className="text-sm">Current best offer</span>
              </span>
              <span className="text-right"> {raribles.offer?.best_offer?.toFixed(2)} ETH</span>
            </div>}

            <br />

            <div hidden>
              <div>Supply: {'supply'} / Selling: {'selling'}</div>
              <div>Like:  {'likes'} / Visit: {'visits'}</div>
            </div>
            <div className="shadow-nft p-4 rounded-24">
              <div className="flex h-auto items-center flex-col w-full ">
                <div className="flex w-full text-gray-700 mb-2">Created by</div>
                {/* <span>{JSON.stringify(creator)}</span> */}
                <a href={`/profile?address=${creator?.address}`} className="flex justify-start w-full mb-4 items-center	">
                  {profileAddress(creator, 0)}
                  <div className="ml-2">

                    {creator?.name}
                    <div className="text-gray-500 underline">View Profile</div>
                  </div>
                </a>
              </div>
              {owner !== undefined && owner.length > 0 && <div className="flex h-auto items-center flex-col w-full content-start">
                <div className="flex w-full text-gray-700 mb-2">Collected by </div>
                <div className="flex content-start w-full flex-wrap">
                  {owner.map((owner, index) => profileAddress(owner, index))}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 m-auto">
        <h2 className="mt-8 text-xl font-semibold">NFT History</h2>
        {selectActivity(nft, openseas)?.map(({ type, current_owner, previous_owner, date, value, price }, index) => {
          switch (type) {
            case 'order': return <div className="flex items-center my-4 text-sm text-gray-500" key={index}>
              {profilePic(current_owner)} - {type} ({value}items | price {price}ETH) @ {getDate(date)}
            </div>
            case 'transfer': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
              {profilePic(previous_owner)} - {type} to {profilePic(current_owner)} ({value}item) @ {getDate(date)}
            </div>
            case 'mint': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
              {profilePic(current_owner)} - {type} @ {getDate(date)}
            </div>
          }
        })}
      </div>
    </div>
  </div>
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
