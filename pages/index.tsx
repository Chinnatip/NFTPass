import { useRouter } from 'next/router'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import Icon, { FacebookIcon, InstagramIcon, TwitterIcon } from '../components/Icon'
import { useState, useEffect } from 'react'
import axios from 'axios'

type OpenseaData = {
  address: string
  asset_contract_type: string
  buyer_fee_basis_points: number
  collection: {
    banner_image_url: string
    chat_url?: string
    created_date: string
    default_to_fiat: boolean
    description: string
    dev_buyer_fee_basis_points: string
    dev_seller_fee_basis_points: string
    discord_url?: string
    display_data: {
      card_display_style: string
    }
    external_url: string
    featured: boolean
    featured_image_url: string
    hidden: boolean
    image_url: string
    instagram_username?: string
    is_subject_to_whitelist: boolean
    large_image_url: string
    medium_username?: string
    name: string
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: string
    opensea_seller_fee_basis_points: string
    payout_address: string
    require_email: boolean
    safelist_request_status: string
    short_description?: string
    slug: string
    telegram_url?: string
    twitter_username?: string
    wiki_url?: string
  }
  created_date: string
  default_to_fiat: boolean
  description: string
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  external_link: string
  image_url: string
  name: string
  nft_version: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
  opensea_version?: string
  owner?: string
  payout_address: string
  schema_name: string
  seller_fee_basis_points: number
  symbol: string
  total_supply: string
}

const Page = () => {
  const [title] = useState('NFTPass')
  const Router = useRouter()
  const [creator, setCreator] = useState<OpenseaData>({})
  useEffect(() => {
    axios.get('https://api.opensea.io/api/v1/asset_contract/0x12f28e2106ce8fd8464885b80ea865e98b465149').then(res => {
      const creatorData: OpenseaData = res.data
      console.log(creatorData)
      setCreator(creatorData)
    })
  }, [])
  useEffect(() => { }, []);
  return <div className="flex flex-col items-center justify-center bg-gray-300">
    <div>
      <img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/NFTpass.svg?alt=media&token=624e343b-d138-4253-893d-e0a8bb39a4f8" /></div>
    <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col bg-pattern">
      <div className="flex flex-col mb-8">


        <div className="flex flex-row text-left w-full justify-between">
          <div className="flex flex-col">
            <p className="font-semibold text-black-700 mb-5 text-left">

              {creator?.name}</p>

            <span className="block text-base">Passport Views	1,771,705</span>
          </div>
          <img className="profile-image" src={creator?.collection?.image_url} alt="" />

        </div>
        <div className="flex flex-row bg-white p-4 rounded-lg mt-2 w-full">
          <a className="text-gray-500" onClick={() => Router.push('https://www.facebook.com/beeple')}><FacebookIcon></FacebookIcon></a>
          <a className="text-gray-500" onClick={() => Router.push('http://instagram.com/beeple_crap')}><InstagramIcon></InstagramIcon></a>
          <a className="text-gray-500" onClick={() => Router.push('https://twitter.com/beeple')}><TwitterIcon></TwitterIcon></a>

        </div>
      </div>
      <span className="text-left">Exhibition (4)</span>
      <div className="flex flex-col mb-8">
        <a onClick={() => Router.push('https://rarible.com/collection/0xd92e44ac213b9ebda0178e1523cc0ce177b7fa96')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><img width="50" height="50" className="inline" src="https://cryptomode.com/wp-content/uploads/2020/09/CryptoMode-Rarible-Crypto-Art.png" /> <span>Rarible</span></a>
        <a onClick={() => Router.push('https://www.artsy.net/artist/beeple')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><img width="25" height="25" className="inline" src="https://media-exp1.licdn.com/dms/image/C4E0BAQEx2xg5300_6Q/company-logo_200_200/0/1547489824860?e=2159024400&v=beta&t=saJPmXtDAMBfGv-lu07CGEoA9IT2GreSULAmydVANEg" /> <span>Artsy</span></a>
        <a href={creator?.external_link} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><img width="25" height="25" className="inline" src="https://res.cloudinary.com/nifty-gateway/image/upload/q_auto:good,w_500/v1576344316/nifty-builder-images/kyhclu5quebqm4sit0he.png" /> <span>Niftygateway</span></a>
        <a onClick={() => Router.push('https://opensea.io/collection/beeple-special-edition')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><img width="25" height="25" className="inline" src="https://gblobscdn.gitbook.com/assets%2F-L9DhFFkz5PkhEAgbJGh%2F-L9DhJDoyXpD9LnyXPA3%2F-L9DhPyTanReDVyz90bg%2FP2c8qzV.png?alt=media" /> <span>Opensea</span></a>
      </div>
      <span className="text-left">Works(4)</span>
      <div className="grid grid-cols-2 gap-4 my-4 mb-8">
        <a onClick={() => Router.push('/next_page')} className="style-box-primary artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src={creator?.collection?.large_image_url} alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Symbol: {creator?.symbol}</span>
            <span className="text-sm	block text-gray-500	">Schema: {creator?.schema_name}</span>

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
    </div>
  </div>
}

export default Page
