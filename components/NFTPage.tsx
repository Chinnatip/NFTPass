import React from 'react'
import Head from 'next/head'
import dayjs from 'dayjs'
import { NextSeo } from 'next-seo';
import { faArrowLeft, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Icon, { Picon } from '@/Icon'
import { NFTDetail, Media, NFTPlatform } from '../interfaces/index'
import { ConnectBtn, profilePic, profileAddress } from '@/Galleryst'
// import { selectActivity } from '../method/integrate'

const NFTPage = ({ stateData, getNFT, address, seo, stateAction, prefix = false }: {
  prefix?: boolean
  stateData: {
    nft: NFTDetail
    mediaList: Media[]
    loading: boolean
    gallerystID: string
    raribles: NFTDetail
    openseas: NFTDetail
    foundations: NFTDetail
    platform: NFTPlatform
    copied: boolean
    displayMedia: Media
    displayIdx: number
  }
  getNFT: NFTDetail | undefined
  stateAction: any
  address: string
  seo: {
    image: string
    title: string
    creator: string
    description: string
  }
}) => {
  const {
    nft, loading, gallerystID, raribles, openseas, foundations, platform, copied, mediaList, displayMedia, displayIdx
  } = stateData
  const { setDisplayMedia, setDisplayIdx, setCopied } = stateAction
  const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')
  const getDateUnix = (day: string) => dayjs.unix(parseInt(day)).format('DD MMM YYYY')
  const useCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 1300);
  }
  const { title, description, creator, owner } = nft
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
    {loading && <div className="fixed bottom-0  mb-2 left-0 ml-2 bg-black-blur-2  text-white w-min m-auto text-lg rounded-full px-4 py-2 z-40">Loading...</div>}
    <div className="flex flex-col pt-0" style={{ background: `url("${prefix ? ".." : ""}/image/bg_blur.jpg")` }}>
      <div className="md:w-4/5 w-full m-auto flex justify-between items-center">
        <a className="focus:outline-none" href={`/`}>
          <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
        </a>
        <ConnectBtn />
      </div>
      <div className="w-full relative flex-col flex items-center justify-center max-w-full m-auto" style={{ height: '75vh' }}>
        <a href={`/`} className="hidden absolute top-2 left-2 bg-white rounded-full h-8 md:w-auto w-8 md:px-2 flex items-center justify-center text-black active-shadow">
          <Icon fill={faArrowLeft} noMargin /> <span className="md:block hidden ml-1">Back</span>
        </a>

        {/* {JSON.stringify(displayMedia)} */}

        {/* Main image */}
        <div className="p-4 flex items-center" style={{ height: mediaList.length > 1 ? '80%' : '100%' }}>
          {displayMedia.type === 'image' && <img src={displayMedia.src} className="shadow-nft-img rounded-lg fit-wh-img" />}
          {displayMedia.type === 'video' && <video src={displayMedia.src} poster="" className="" style={{ height: '100%' }} autoPlay muted loop controls />}
        </div>
        {/* Carousel image */}
        <div className="pt-3 text-center flex justify-center items-center">
          {mediaList.length > 1 && mediaList.map((media, idx) => {
            const isDisplaying = displayIdx === idx
            return (
              <div
                className={`
                cursor-pointer
                mx-2
                rounded-sm
                transition-width duration-300
                w-16 h-12
                ${isDisplaying ? 'inline-block ' : 'inline-block'}
              `}
                onClick={() => { setDisplayMedia(media); setDisplayIdx(idx); }}
              >
                <div className='inline-block m-auto  bg-black rounded-lg w-16 h-12'>
                  {media.type === 'image' && <img src={media.src} style={{ maxHeight: '64px' }} className="rounded-lg w-full h-12 m-auto object-contain" />}
                  {media.type === 'video' && <video src={media.src} muted autoPlay loop className="rounded-lg m-auto w-full h-12 object-contain" />}
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
        <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURI(`https://www.galleryst.co/n/${gallerystID}`)}`} data-size="large" className="shadow-nft mr-4 bg-white text-black w-auto rounded-full py-3 md:w-auto px-4  text-black active-shadow flex items-center justify-center">
          <img src="/image/twitter_logo.svg" style={{ height: '20px' }} className="" /> <span className="ml-1 md:block hidden">Tweet</span></a>
        <button
          className="shadow-nft  bg-white w-auto rounded-full py-3 md:w-auto px-4  text-black active-shadow flex items-center justify-center"
          onClick={() => useCopyToClipboard(`https://www.galleryst.co/n/${gallerystID}`)}>
          {copied && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-10 -mr-2 text-sm rounded-full">Copied Link!</div>}
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
            <span className="flex-grow ">View on Rarible</span>
            <div className="text-black bg-yellow-500 rarible-logo logo-48 h-12 w-12 rounded-full" ></div>
          </a>}
          {platform.check['opensea']?.status && <a href={platform.check['opensea']?.link} target="_blank" className="order-6 flex mt-4 p-4 items-center rounded-24 bg-white shadow-nft active-shadow">
            <span className="flex-grow ">View on Opensea</span>
            <div className="text-white bg-blue-500 opensea-logo logo-48 h-12 w-12 rounded-full" ></div>
          </a>}
          {platform.check['foundation']?.status && <a href={platform.check['foundation']?.link} target="_blank" className="order-6 flex mt-4 p-4 items-center rounded-24 bg-white shadow-nft active-shadow">
            <span className="flex-grow ">Link to Foundation</span>
            <div className="text-white bg-blue-500 foundation-logo logo-48 h-12 w-12 rounded-full" ></div>
          </a>}
          {!!(getNFT as any)?.metadata && <div className='flex flex-wrap order-6 mt-3'>
            {(getNFT as any)?.metadata?.attributes?.map((attr: any) => {
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
                <Picon platform="opensea"></Picon> <span className="text-base">Lowest listing price</span>
              </span>
              <span className="text-right">{openseas.pricing?.eth} ETH</span>
            </div>}
            {raribles.pricing?.eth != undefined && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="rarible"></Picon> <span className="text-base">Lowest listing price</span>
              </span>
              <span className="text-right">{raribles.pricing?.eth} ETH</span>
            </div>}
            {foundations.pricing?.eth != undefined && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="foundation"></Picon> <span className="text-sm">Lowest listing price</span>
              </span>
              <span className="text-right">{foundations.pricing?.eth} ETH</span>
            </div>}
            {openseas.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="opensea"></Picon> <span className="text-base">Current best offer</span>
              </span>
              <span className="text-right"> {openseas.offer?.best_offer?.toFixed(2)} ETH</span>
            </div>}
            {raribles.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="rarible"></Picon> <span className="text-sm">Current best offer</span>
              </span>
              <span className="text-right"> {raribles.offer?.best_offer?.toFixed(2)} ETH</span>
            </div>}
            {foundations.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="foundation"></Picon> <span className="text-sm">Current best offer</span>
              </span>
              <span className="text-right"> {foundations.offer?.best_offer?.toFixed(2)} ETH</span>
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
                {owner.length > 1 ?
                  <div className="flex content-start w-full flex-wrap">
                    {owner.map((owner, index) => profileAddress(owner, index))}
                  </div> :
                  <a href={`/profile?address=${owner[0]?.address}`} className="flex justify-start w-full mb-4 items-center	">
                    {profileAddress(owner[0], 0)}
                    <div className="ml-2">
                      {owner[0]?.name}
                      <div className="text-gray-500 underline">View Profile</div>
                    </div>
                  </a>
                }
              </div>}
            </div>
          </div>
        </div>
      </div>
      {nft.activity != undefined && <div className="px-3 m-auto">
        <h2 className="mt-8 text-xl font-semibold">NFT History</h2>
        {nft.activity?.map((parcel, index) => {
          const { type, current_owner, previous_owner, date, value, price } = parcel
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
            case 'Minted': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
              {profilePic(current_owner)} - {type} @ {getDateUnix(date)}
            </div>
            case 'Bid': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
              {profilePic(current_owner)} - {type} @ {getDateUnix(date)}
            </div>
            // case 'Sold': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
            // {profilePic(current_owner)} - {type} @ {getDateUnix(date)}
            // </div>
            // case 'Settled': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
            // {profilePic(current_owner)} - {type} @ {getDateUnix(date)}
            // </div>
            case 'Listed': return <div className="flex items-center my-5 text-sm text-gray-500" key={index}>
              {profilePic(current_owner)} - {type} @ {getDateUnix(date)}
            </div>
          }
        })}
      </div>}
      <a href={`https://galleryst.hellonext.co`} className="fixed right-0 bottom-0 z-20 my-2 mx-4 w-max inline bg-white text-gray-700 focus:outline-none rounded-full p-2 items-center shadow-nft text-xs" target="_blank" ><img src="/image/feedback_icon.svg" style={{ height: '20px', opacity: '.6' }} className="inline-block mr-2 mb-0 " />Send us feedback</a>
      <div className="h-24" />
    </div>
  </div>
}

export default NFTPage
