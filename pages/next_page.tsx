import { useRouter } from 'next/router'
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
  const [creator, setCreator] = useState<OpenseaData>({})
  useEffect(() => {
    axios.get('https://api.opensea.io/api/v1/asset_contract/0x12f28e2106ce8fd8464885b80ea865e98b465149').then(res => {
      const creatorData: OpenseaData = res.data
      console.log(creatorData)
      setCreator(creatorData)
    })
  }, [])
  useEffect(() => { }, [])
  const Router = useRouter()
  return <div className="flex flex-col items-center justify-center bg-gray-300">
    <div><img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/NFTpass.svg?alt=media&token=624e343b-d138-4253-893d-e0a8bb39a4f8" /></div>
    <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col bg-pattern">
      <div className="flex flex-col mb-8">
        <a onClick={() => Router.push('/')} className="text-left mb-2"> ← Back </a>
        <img className="block w-full" src={creator?.collection?.large_image_url} alt="" />
        <div className="py-8 flex flex-col text-left">
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Symbol: {creator?.symbol}</span>
            <span className="text-sm	block text-gray-700	">Schema: {creator?.schema_name}</span>
            <span className="text-sm	block text-gray-700	">{creator?.collection?.description}</span>
          </div>
        </div>
      </div>
    
    <span className="text-left">Exhibition</span>
    <div className="flex flex-col mb-8">
    <a href={creator?.external_link} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><img width="25" height="25" className="inline" src="https://res.cloudinary.com/nifty-gateway/image/upload/q_auto:good,w_500/v1576344316/nifty-builder-images/kyhclu5quebqm4sit0he.png" /> <span>Niftygateway</span></a>
    </div>
    <span className="text-left">Same Collection(4)</span>
    <div className="grid grid-cols-2 gap-4 my-4 mb-8">
      <a onClick={() => Router.push('/next_page')} className="style-box-primary artwork-card flex-col text-left">
        <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ce0cbc73949311.5c1adc41ccdcd.jpg" alt="" />
        <div className="mt-2">
          <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
          <span className="text-sm	block">Market Place: Rarible</span>
          <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
          <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
          <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
        </div>
      </a>
      <a className="style-box-primary artwork-card flex-col text-left">
        <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/cfe1cf73949311.5c1adc41c9b7b.jpg" alt="" />
        <div className="mt-2">
          <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
          <span className="text-sm	block">Market Place: Rarible</span>
          <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
          <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
          <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
        </div>
      </a>
      <a className="style-box-primary artwork-card flex-col text-left">
        <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/69caa773949311.5c1adc41c9f84.jpg" alt="" />
        <div className="mt-2">
          <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
          <span className="text-sm	block">Market Place: Rarible</span>
          <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
          <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
          <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
        </div>
      </a>
      <a className="style-box-primary artwork-card flex-col text-left">
        <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/9660c273949311.5c1adc41cc287.jpg" alt="" />
        <div className="mt-2">
          <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
          <span className="text-sm	block">Market Place: Rarible</span>
          <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
          <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
          <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
        </div>
      </a>
    </div>
  </div>
  </div>
}

export default Page
