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
      const creatorData : OpenseaData = res.data
      console.log(creatorData)
      setCreator(creatorData)
    })
  },[])

  return <div>
    {/* <p className="text-xs text-gray-300">{JSON.stringify(creator)}</p> */}
    <h1 className="text-2xl">{creator?.address}</h1>
    <h1 className="text-2xl">{creator?.payout_address}</h1>
    <h2 className="text-green-400 text-xl">{creator?.collection?.safelist_request_status}</h2>
    <h3 className="text-sm">
      <p>Contract type: {creator?.asset_contract_type}</p>
      <p>Created: {creator?.created_date}</p>
      <p>Fullname: {creator?.name}</p>
      <p>Symbol: {creator?.symbol}</p>
      <p>Schema: {creator?.schema_name}</p>
      <p>External : {creator?.external_link}</p>
      <p>Medium : {creator?.collection?.medium_username}</p>
      <p>Twitter : {creator?.collection?.twitter_username}</p>
      <p>Telegram : {creator?.collection?.telegram_url}</p>
      <p>Wikipedia : {creator?.collection?.wiki_url}</p>
      <p>Slug : {creator?.collection?.slug}</p>
    </h3>

    <img src={creator?.image_url} alt=""/>
    {/* <img src={creator} alt=""/> */}
    <img className="w-1/3" src={creator?.collection?.image_url} alt=""/>
    <img className="w-1/3" src={creator?.collection?.large_image_url} alt=""/>
    <img className="w-1/3" src={creator?.collection?.banner_image_url} alt=""/>
    <span>{creator?.collection?.description}</span>
  </div>
}

//
export default Page
