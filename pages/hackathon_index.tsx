import { useRouter } from 'next/router'
import { Person } from "schema-dts"
import { helmetJsonLdProp } from "react-schemaorg"
import { Helmet } from "react-helmet"

type Artist = {
  name: string
  alternateName: string
  alumniOf: {
    "@type": string
    name: string[]
  },
  knowsAbout: string[]
}

import { faCheckCircle, faIcons } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { OpenseaCollection, OpenseaThing } from '../interfaces/opensea'
import Icon, { InstagramIcon, TwitterIcon } from '../components/Icon'
import axios from 'axios'

const iconLists = [
  { img_url: "https://rmutrecht.org/wp-content/uploads/sites/259/2017/07/logo-twitter.png", title: "Twitter", connected: false },
  { img_url: "https://www.pngitem.com/pimgs/m/461-4618525_ig-small-instagram-logo-2019-hd-png-download.png", title: "Instagram", connected: false },
  { img_url: "https://pngimg.com/uploads/twitch/twitch_PNG13.png", title: "Twitch", connected: false },
  { img_url: "https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512", title: "Facebook", connected: false },
]

const Page = () => {
  const Router = useRouter()
  const [modal, setModal] = useState(false)
  const [connections, setConnection] = useState(iconLists)
  const [creator, setCreator] = useState<OpenseaCollection>({})
  const [creatorThings, setCreatorCurate] = useState<OpenseaThing[]>([])
  const [artist] = useState<Artist>({
    name: "Chinnatip Taemkaeo",
    alternateName: "Chinnatip D. Taemkaeo",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: ["Silpakorn University", "SIIT"],
    },
    knowsAbout: ["Architecture", "Artificial intelligence"],
  })
  useEffect(() => {
    axios.get('https://api.opensea.io/api/v1/asset_contract/0x12f28e2106ce8fd8464885b80ea865e98b465149').then(res => {
      const creatorData: OpenseaCollection = res.data
      setCreator(creatorData)
      axios.get('https://api.opensea.io/api/v1/collections?asset_owner=0xc6b0562605d35ee710138402b878ffe6f2e23807&offset=0&limit=300').then(res => {
        const thingsData: OpenseaThing[] = res.data
        setCreatorCurate(thingsData)
      })
    })
  }, [])
  useEffect(() => { }, []);
  return <>
    <Helmet
      script={[
        helmetJsonLdProp<Person>({
          "@context": "https://schema.org",
          "@type": "Person",
          name: artist.name,
          alternateName: artist.alternateName,
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: artist.alumniOf.name
          },
          knowsAbout: artist.knowsAbout
        }),
      ]}
    />
    <div className="flex flex-col items-center justify-center relative">
    {/* Modal */}
    { modal && <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75	z-10 flex items-center justify-center">

      <div className="w-full ">
        <div className="flex flex-col items-center justify-center   w-full">
          <div>
          </div>
          <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col">

            <div className="flex flex-col mb-8">
            <button onClick={() => setModal(false) } className="text-black text-right">x</button>
              {connections.map((icon, index) => {
                return <div className="flex  flex-row justify-between w-full items-center	mb-6">
                  <div className="flex flex-row items-center">
                    <img className="sm-connector mr-2" src={icon.img_url} />{icon.title}
                  </div>
                  {icon.connected ?
                    <button onClick={() => {
                      const updateConnection = connections.map((connect, getIndex) => { return getIndex != index ? connect : { ...connect, connected: false } })
                      setConnection(updateConnection)
                    }} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">
                      <div className="text-green-400	inline">
                        <Icon fill={faCheckCircle} />
                      </div>
                  Connected
                </button> :
                    <button onClick={() => {
                      const updateConnection = connections.map((connect, getIndex) => { return getIndex != index ? connect : { ...connect, connected: true } })
                      setConnection(updateConnection)
                    }} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connect</button>
                  }
                </div>
              })}
            </div>
            <hr className="border-2 border-dashed border-gray-300"/>
            <div className="flex  flex-row justify-between w-full items-center mt-6">
                  <div className="flex flex-row items-center text-left">
                    <img className="sm-connector mr-2" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/Suez-Logo.svg?alt=media&token=d60cddd7-cbd4-4520-a05d-2b5c4e57b0cf"/> Suez Authentication
                  </div>
                  <button className="inline text-gray-700 border-2 bg-gray-300 px-4 cursor-not-allowed">Verified</button>
                   </div>

          </div>
        </div>
      </div>
    </div>}

    {/* Passport page */}
    <div>
      <img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/Suez-Logo.svg?alt=media&token=d60cddd7-cbd4-4520-a05d-2b5c4e57b0cf" /></div>
    <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col ">
      <div className="flex flex-col mb-8">
        <div className="flex flex-row text-left w-full justify-between">
          <div className="flex flex-col">
            <p className="font-semibold text-black-700 mb-5 text-left">
              {creator?.name}</p>
            <span className="block text-base">Passport Views	1,771,705</span>
          </div>
          <img className="profile-image" src={creator?.collection?.image_url} alt="" />
        </div>
        <div className="flex flex-row bg-gray-200 p-4 rounded-lg mt-2 w-full">
        <a className="text-gray-500 mr-2" onClick={() => Router.push('https://twitter.com/beeple')}><TwitterIcon></TwitterIcon></a>
          <a className="text-gray-500" onClick={() => Router.push('http://instagram.com/beeple_crap')}><InstagramIcon></InstagramIcon></a>

          <div className="flex-grow text-right">
            <button onClick={() => setModal(true)} className="inline text-gray-700 border-2 bg-gray-300 px-4">Verified</button>
          </div>
        </div>
      </div>
      <span className="text-left">Exhibition</span>
      <div className="flex flex-col mb-8">
        <a onClick={() => Router.push('https://rarible.com/collection/0xd92e44ac213b9ebda0178e1523cc0ce177b7fa96')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2 flex justify-between">
          <div><img width="25" height="25" className="inline" src="https://dappstore.org/wp-content/uploads/2021/01/Rarible.jpg" /> <span>Rarible</span></div>
          <div>→</div>
        </a>
        <a onClick={() => Router.push('https://www.artsy.net/artist/beeple')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2 flex justify-between">
          <div><img width="25" height="25" className="inline" src="https://media-exp1.licdn.com/dms/image/C4E0BAQEx2xg5300_6Q/company-logo_200_200/0/1547489824860?e=2159024400&v=beta&t=saJPmXtDAMBfGv-lu07CGEoA9IT2GreSULAmydVANEg" /> <span>Artsy</span></div>
          <div>→</div></a>
        <a href={creator?.external_link} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2 flex justify-between">
          <div><img width="25" height="25" className="inline" src="https://res.cloudinary.com/nifty-gateway/image/upload/q_auto:good,w_500/v1576344316/nifty-builder-images/kyhclu5quebqm4sit0he.png" /> <span>Niftygateway</span></div><div>→</div></a>
        <a onClick={() => Router.push('https://opensea.io/collection/beeple-special-edition')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2 flex justify-between">
          <div><img width="25" height="25" className="inline" src="https://gblobscdn.gitbook.com/assets%2F-L9DhFFkz5PkhEAgbJGh%2F-L9DhJDoyXpD9LnyXPA3%2F-L9DhPyTanReDVyz90bg%2FP2c8qzV.png?alt=media" /> <span>Opensea</span></div><div>→</div></a>
          <a onClick={() => Router.push('https://www.christies.com/features/Monumental-collage-by-Beeple-is-first-purely-digital-artwork-NFT-to-come-to-auction-11510-7.aspx?fbclid=IwAR2CbeTwWWY-uED5s6XKh1xvK2_PD-ACWa_bOa80_uKAQWX7WuglhctAIAc')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2 flex justify-between">
          <div><img width="100" className="inline" src="https://www.align.com/hubfs/5c6af10d5056c73583cd1504_Christies%20logo.png" /></div><div>→</div>
          </a>
      </div>
      <span className="text-left"><span className="text-indigo-600"><Icon fill={faIcons}/></span> Works</span>
      <div className="grid grid-cols-2 gap-4 my-4 mb-8">
        <a onClick={() => Router.push('/collection?address=0x12f28e2106ce8fd8464885b80ea865e98b465149')} className="style-box-primary artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work price-overlay" src="https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Version: {creator?.nft_version}</span>
            <span className="text-sm	block">Creator: {creator?.symbol}</span>
            <span className="text-sm	block text-gray-500	text-show-less">Collection: {creator?.address} </span>

            <span className="text-sm	block text-gray-500	text-show-less">{creator?.collection?.description}</span>
          </div>
        </a>
        <a className="style-box-primary artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/cfe1cf73949311.5c1adc41c9b7b.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Symbol: {creator?.symbol}</span>
            <span className="text-sm	block text-gray-500	">Schema: {creator?.schema_name}</span>

            <span className="text-sm	block text-gray-500	text-show-less">{creator?.collection?.description}</span>
          </div>
        </a>
        <a className="style-box-primary artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/69caa773949311.5c1adc41c9f84.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Symbol: {creator?.symbol}</span>
            <span className="text-sm	block text-gray-500	">Schema: {creator?.schema_name}</span>

            <span className="text-sm	block text-gray-500	text-show-less">{creator?.collection?.description}</span>
          </div>
        </a>
        <a className="style-box-primary artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/9660c273949311.5c1adc41cc287.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Symbol: {creator?.symbol}</span>
            <span className="text-sm	block text-gray-500	">Schema: {creator?.schema_name}</span>

            <span className="text-sm	block text-gray-500	text-show-less">{creator?.collection?.description}</span>
          </div>
        </a>
      </div>
      <span className="text-left">{creator?.name}'s buyers</span>
      <div className="grid grid-cols-2 gap-4 my-4 mb-8">
        {creatorThings.slice(0, 8).map(thing => {
          return <a className="style-box-primary artwork-card flex-col text-left" href="">
            <img src={thing.image_url} className="m-auto block thumbnail-work" alt="" />
            <p className="text-sm	block text-blue-600 ">{thing.name}</p>
          </a>
        })}
      </div>
    </div>
  </div>
  </>

}

export default Page
