import { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextSeo } from 'next-seo';
import { User, NFTDetail, ResponseDetail } from '../../interfaces/index'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import * as firebase from "../../method/firebase"
import dayjs from 'dayjs'

const Picon = ({platform} : {platform: 'rarible' | 'opensea' | 'nifty' | 'foundation'}) => {
  let style = ''
  switch (platform) {
    case 'rarible':
      style = 'text-black bg-yellow-500 rarible-logo logo-48'
      break
    case 'opensea':
      style = 'text-white bg-blue-500 opensea-logo logo-48'
      break
    case 'foundation':
      style = 'text-white bg-black foundation-logo logo-48'
      break
    case 'nifty':
      style = 'text-white bg-blue-700 nifty-logo logo-48'
  }

  return <div
  className={`
     mr-3 h-12 w-12 inline-flex items-center justify-center rounded-full shadow-nft
    ${style}
  `}
  />
}

export const Filter = ({ current, platform, action, targetAction, target }: {
  target?: NFTDetail,
  targetAction?: any,
  platform: any,
  action: any ,
  current: 'rarible' | 'opensea' | 'foundation' | 'nifty',
}) => {
  const market: {
    rarible?: { status:  boolean }
    opensea?: { status:  boolean }
    foundation?: { status:  boolean }
    nifty?: { status:  boolean }
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
      ${ platform.current == current && 'border-1 border-green-400 shadow-greenery'}
      ${market[current]?.status ? style : default_style}
    `}
    onClick={() => {
      action({ ...platform , current: current})
      console.log(target)
      if(targetAction != undefined) targetAction(target)
    }}>
    {text}
  </div>
}

const profilePic = (user: User | undefined) => {
  if(user != undefined ){
    return <a href={`/profile?address=${user.address}`} className="bg-gray-500 mx-2 w-8 h-8 rounded-full overflow-hidden inline-flex items-center justify-center">
      <img src={user.image} className="h-8 inline " />
    </a>
  }else{
    return <div className="w-8 h-8 inline bg-gray-600 rounded-full" />
  }
}

const profileAddress = (user: User | undefined, index: number) => {
  return user != undefined && user?.image != '' ?
    <a key={index} href={`/profile?address=${user.address}`} target="_blank" className="ml-2 bg-gray-500 w-10 h-10 rounded-full overflow-hidden inline-flex items-center justify-center">
      <img src={user?.image} className="h-10 inline" />
    </a> :
    <span className="inline-block w-10 h-10 rounded-full bg-purple-500 ml-2 flex items-center justify-center">{user?.name?.substr(0, 1)}</span>
}

const selectActivity = (nft: NFTDetail, openseas: NFTDetail) => {
  if(openseas.activity != undefined){
    return openseas.activity
  } else{
    return nft.activity
  }
}

interface PlatformItem {
  link?: string
  status: boolean
}

interface NFTPlatform {
  current: string
  check: {
    opensea?: PlatformItem
    rarible?: PlatformItem
    nifty?: PlatformItem
    foundation?: PlatformItem
  }
}

export const nftSanitizer = (objs: ResponseDetail) => {
  const clean = (obj: any) => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName] }}
    return obj
  }
  const cleaning = clean({...objs,
    data: clean({...objs.data,
      creator: clean(objs.data?.creator),
      owner: objs.data?.owner?.map(ow => clean(ow)),
      offer: clean(objs.data?.offer),
      pricing: clean(objs.data?.pricing),
      activity: objs.data?.activity?.map( ac => {
        return clean({
          ...ac,
          current_owner: clean({...ac.current_owner, user: clean(ac.current_owner.user) }),
          previous_owner: clean({...ac.previous_owner, user: clean(ac.previous_owner?.user) })
        })
      } )
    })
  })
  return cleaning
}

const checkDiff = (current_update: number, diffAmount: number = 2) => {
  const today = dayjs()
  const updatedAt = dayjs.unix(current_update)
  const diff = diffAmount >= today.diff(updatedAt, 'days')
  return diff
}

const Page = ({ address, seo, getPlatform , getNFT, getOpensea, getRarible, current_update }: {
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
  current_update?: number
}) => {
  const [nft, setNFT] = useState<NFTDetail>(getNFT != undefined ? getNFT : { address })
  const [raribles, setRarible] = useState<NFTDetail>( getRarible != undefined ? getRarible : { address })
  const [openseas, setOpensea] = useState<NFTDetail>( getOpensea != undefined ? getOpensea : { address })
  const [platform, setPlatform] = useState<NFTPlatform>( getPlatform != undefined ? getPlatform : {current: 'opensea', check: {rarible: {status: false}, opensea: {status: false}}})
  useEffect(() => {
    (async () => {
      if(current_update != undefined && checkDiff(current_update) ){
        console.log('not load')
        // TODO: load only offer and tradeHistory
      }else{
        // Rarible
        const raribleCheck: ResponseDetail = await rarible.nftDetail(address, setNFT, setRarible)
        const openseaCheck: ResponseDetail = await opensea.nftDetail(address, setNFT, setOpensea)
        const checkCurrent = raribleCheck.status ? 'rarible' : openseaCheck.status ? 'opensea' : 'nifty'
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
        setPlatform(platform)
        switch(checkCurrent){
          case 'opensea': openseaCheck.data && setNFT(openseaCheck.data); break;
          case 'rarible': raribleCheck.data && setNFT(raribleCheck.data); break;
        }
        await firebase.writeDocument('nft',address, {
          platform,
          rarible: nftSanitizer(raribleCheck),
          opensea: nftSanitizer(openseaCheck),
          current_update: dayjs().unix()
        })
      }
    })()
  }, []);

  const {image, title, description, creator, owner } = nft
  const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')
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
    <div className="flex flex-col">
      <div className="w-full relative flex items-center justify-center" style={{ background: 'rgba(92, 86, 86, 0.48)', height: '75vh' }}>
        <div className="p-4 flex items-center flex" style={{height: '100%'}}>
          <img src={image} className="shadow-nft-img rounded-lg fit-wh-img" style={{ height: '80%' }} />
          {/* <div className="pt-3 text-center flex justify-center items-center">
            <Filter current="opensea" platform={platform}  action={setPlatform} targetAction={setNFT} target={openseas} />
            <Filter current="rarible" platform={platform}  action={setPlatform} targetAction={setNFT} target={raribles} />
            <Filter current="foundation" platform={platform}  action={setPlatform} />
            <Filter current="nifty" platform={platform}  action={setPlatform} />
          </div> */}
        </div>
      </div>
      <div className="text-center mt-10 mb-12 hidden">
        <a href={`/profile?address=${address}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
      </div>
      <div className="mt-10 m-auto md:w-2/3 w-full md:px-0 px-3 flex lg:flex-row flex-col justify-between">
        <div className="lg:w-1/2 w-full lg:flex lg:flex-col contents">
          <div className="text-2xl order-1 font-black mb-4">{title != null ? title : 'Untitled'}</div>
          <div className="text-gray-500 mb-4 break-words order-2 hidden">{address}</div>
          <div className="order-5 mb-3"><h3 >{description != null ? description : 'No description.'}</h3></div>
          {/* Link to Platform */}
          { platform.check['rarible']?.status && <div className="order-6 flex mt-4 p-4 items-center rounded-xl bg-white shadow-nft">
            <span className="flex-grow ">Link to Rarible</span>
            <a href={platform.check['rarible']?.link} target="_blank" className="text-black bg-yellow-500 rarible-logo logo-48 h-12 w-12 rounded-full" ></a>
          </div> }
          { platform.check['opensea']?.status && <div className="order-6 flex mt-4 p-4 items-center rounded-xl bg-white shadow-nft">
            <span className="flex-grow ">Link to Opensea</span>
            <a href={platform.check['opensea']?.link} target="_blank" className="text-white bg-blue-500 opensea-logo logo-48 h-12 w-12 rounded-full" ></a>
          </div> }
        </div>
        <div className="lg:w-1/2 w-full lg:pl-6 pr-0 lg:sticky lg:flex lg:flex-col contents">
          <div className="order-3 mb-4">
            {openseas.pricing?.eth != undefined && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="opensea"></Picon> Current price
              </span>
              <span className="text-right">{openseas.pricing?.eth} ETH</span>
            </div>}
            {raribles.pricing?.eth != undefined && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
                <Picon platform="rarible"></Picon> Current price
              </span>
              <span className="text-right">{raribles.pricing?.eth} ETH</span>
            </div>}
            <hr />
            { openseas.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
              <Picon platform="opensea"></Picon> Best offer
              </span>
              <span className="text-right"> {openseas.offer?.best_offer?.toFixed(2)} ETH</span>
            </div>}
            { raribles.offer?.status && <div className="flex text-xl items-center py-2">
              <span className="flex-grow text-gray-500 text-left flex items-center">
              <Picon platform="rarible"></Picon> Best offer
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
                <a href={`/profile?address=${creator?.address}`} className="flex justify-between w-full mb-4 items-center	">
                  {profileAddress(creator, 0)}
                  {creator?.name}
                </a>
              </div>

              {owner !== undefined && owner.length > 0 && <div className="flex h-auto items-center flex-col w-full content-start">
                <div className="flex w-full text-gray-700 mb-2">Collected by </div>
                <div className="flex content-start w-full flex-wrap">
                  {owner.map((owner,index) => profileAddress(owner, index))}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="md:w-2/3 w-full m-auto">
      <div className="px-3 m-auto">
        <h2 className="mt-8 text-xl font-semibold">NFT History</h2>
        { selectActivity(nft, openseas)?.map(({ type, current_owner, previous_owner, date, value, price },index) => {
          switch (type) {
            case 'order': return <div className="flex items-center my-4" key={index}>
              {profilePic(current_owner)} - {type} ({value}items | price {price}ETH) @ {getDate(date)}
            </div>
            case 'transfer': return <div className="flex items-center my-5" key={index}>
              {profilePic(previous_owner)} - {type} to {profilePic(current_owner)} ({value}item) @ {getDate(date)}
            </div>
            case 'mint': return <div className="flex items-center my-5" key={index}>
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
  if(document.exists){
    const response : any = document.data()
    const {
      platform: getPlatform,
      opensea: { data: getOpensea},
      rarible: { data: getRarible },
      current_update } = response
    const getNFT = response[getPlatform.current].data
    const constructImage = `https://api.placid.app/u/sxpwrxogf?&thumbnail[image]=${getNFT.image}&title[text]=${getNFT.title}&creator_name[text]=${getNFT.creator?.name}`
    seo = {
      image: constructImage,
      title: getNFT.title != undefined ? getNFT.title : '-',
      description: getNFT.description != undefined ? getNFT.description : '-',
      creator: getNFT.creator?.name != undefined ? getNFT.creator.name : '-',
    }
    return {
      props: { address, seo, getPlatform, getNFT, current_update, getOpensea, getRarible },
    }
  }else{
    return {
      props: { address, seo },
    }
  }
}

export default Page



