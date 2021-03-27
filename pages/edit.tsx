import { useRouter } from 'next/router'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
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
        <div className="flex  flex-row justify-between w-full items-center	mb-6">
          <div className="flex flex-row items-center"><img className="sm-connector mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" />Facebook</div>
          <button className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connect</button>
        </div>
        <div className="flex  flex-row justify-between w-full items-center	mb-6">
          <div className="flex flex-row items-center"><img className="sm-connector mr-2" src="https://rmutrecht.org/wp-content/uploads/sites/259/2017/07/logo-twitter.png" />Twitter</div>
          <button className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connect</button>
        </div>
        <div className="flex  flex-row justify-between w-full items-center	mb-6">
          <div className="flex flex-row items-center"><img className="sm-connector mr-2" src="https://www.pngitem.com/pimgs/m/461-4618525_ig-small-instagram-logo-2019-hd-png-download.png" />Instagram</div>
          <button className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connect</button>
        </div>
        <div className="flex  flex-row justify-between w-full items-center	mb-6">
          <div className="flex flex-row items-center"><img className="sm-connector mr-2" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-512.png" />Youtube</div>
          <button className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connect</button>
        </div>
        <div className="flex  flex-row justify-between w-full items-center	mb-6">
          <div className="flex flex-row items-center"><img className="sm-connector mr-2" src="http://pngimg.com/uploads/twitch/twitch_PNG13.png" />Twitch</div>
          <button className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><div className="text-green-400	inline"><Icon fill={faCheckCircle}/></div> Connected</button>
        </div>
        <div className="flex  flex-row justify-between w-full items-center	mb-6">
          <div className="flex flex-row items-center"><img className="sm-connector mr-2" src="https://cdn2.iconfinder.com/data/icons/minimalism/512/soundcloud.png" />Soundcloud</div>
          <button className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connected</button>
        </div>
      </div>

    </div>
  </div>
}

export default Page
