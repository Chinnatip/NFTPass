import { useState, useEffect } from 'react'
import axios from 'axios'

type OpenseaCollection = {
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

type OpenseaThing = {
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
  owned_asset_count: 1
  payout_address: string
  primary_asset_contracts: []
  require_email: boolean
  safelist_request_status: string
  short_description?: string
  slug: string
  stats: {
    average_price: number
    count: number
    market_cap: number
    num_owners: number
    seven_day_average_price: number
    seven_day_change: number
    seven_day_sales: number
    seven_day_volume: number
    total_sales: number
    total_supply: number
    total_volume: number
  }
  telegram_url?: string
  traits: {}
  twitter_username: string
  wiki_url: string
}

type OpenSeaNFT = {
  assets: NFTAsset[]
}

type NFTAsset = {
  "id": number
  "token_id": string
  "num_sales": number
  "background_color": string
  "image_url": string
  "image_preview_url": string
  "image_thumbnail_url": string
  "image_original_url": string
  "animation_url": string
  "animation_original_url": string
  "name": string
  "description": string
  "external_link": string
  "asset_contract": {
      "address": string
      "asset_contract_type": string
      "created_date": string
      "name": string
      "nft_version": string
      "opensea_version"?: string
      "owner"?: string
      "schema_name": string
      "symbol": string
      "total_supply": string
      "description": string
      "external_link": string
      "image_url": string
      "default_to_fiat": boolean
      "dev_buyer_fee_basis_points": number
      "dev_seller_fee_basis_points": number
      "only_proxied_transfers": boolean
      "opensea_buyer_fee_basis_points": number
      "opensea_seller_fee_basis_points": number
      "buyer_fee_basis_points": number
      "seller_fee_basis_points": number
      "payout_address": string
  },
  "owner": {
      "user": {
          "username": string
      },
      "profile_img_url": string
      "address": string
      "config": string
      "discord_id": string
  },
  "permalink": string
  "collection": {
      "banner_image_url": string
      "chat_url"?: string
      "created_date": string
      "default_to_fiat": boolean
      "description": string
      "dev_buyer_fee_basis_points": string
      "dev_seller_fee_basis_points": string
      "discord_url"?: string
      "display_data": {
          "card_display_style": string
      },
      "external_url": string
      "featured": boolean
      "featured_image_url": string
      "hidden": boolean
      "safelist_request_status": string
      "image_url": string
      "is_subject_to_whitelist": boolean
      "large_image_url": string
      "medium_username"?: string
      "name": string
      "only_proxied_transfers": boolean
      "opensea_buyer_fee_basis_points": string
      "opensea_seller_fee_basis_points": string
      "payout_address": string
      "require_email": boolean
      "short_description"?: string
      "slug": string
      "telegram_url"?: string
      "twitter_username"?: string
      "instagram_username"?: string
      "wiki_url"?: string
  },
  "decimals": number
  "sell_orders": [],
  "creator": {
      "user": {
          "username": string
      },
      "profile_img_url": string
      "address": string
      "config": string
      "discord_id": string
  },
  "traits": [],
  "last_sale": {
      "asset": {
          "token_id": string
          "decimals": number
      },
      "asset_bundle"?: string
      "event_type": string
      "event_timestamp": string
      "auction_type"?: string
      "total_price": string
      "payment_token": {
          "id": number
          "symbol": string
          "address": string
          "image_url": string
          "name": string
          "decimals": number
          "eth_price": string
          "usd_price": string
      },
      "transaction": {
          "block_hash": string
          "block_number": string
          "from_account": {
              "user": {
                  "username": string
              },
              "profile_img_url": string
              "address": string
              "config": string
              "discord_id": string
          },
          "id": number
          "timestamp": string
          "to_account": {
              "user": {
                  "username": string
              },
              "profile_img_url": string
              "address": string
              "config": string
              "discord_id": string
          },
          "transaction_hash": string
          "transaction_index": string
      },
      "created_date": string
      "quantity": string
  },
  "top_bid"?: string
  "listing_date"?: string
  "is_presale": boolean
  "transfer_fee_payment_token"?: string
  "transfer_fee"?: string
}

const Page = () => {
  const [creator, setCreator] = useState<OpenseaCollection>({})
  const [creatorThings, setCreatorCurate] = useState<OpenseaThing[]>([])
  const [creatorNFT, setcreatorNFT] = useState<NFTAsset[]>([])
  useEffect(() => {
    let assets : NFTAsset[] = []
    axios.get('https://api.opensea.io/api/v1/asset_contract/0x12f28e2106ce8fd8464885b80ea865e98b465149').then(res => {
      const creatorData : OpenseaCollection = res.data
      setCreator(creatorData)
      axios.get('https://api.opensea.io/api/v1/collections?asset_owner=0xc6b0562605d35ee710138402b878ffe6f2e23807&offset=0&limit=300').then(res => {
        const thingsData : OpenseaThing[] = res.data
        setCreatorCurate(thingsData)
        axios.get('https://api.opensea.io/api/v1/assets?asset_contract_address=0x12f28e2106ce8fd8464885b80ea865e98b465149&order_direction=desc&offset=0&limit=50').then(res => {
          const nfts : OpenSeaNFT = res.data
          const nft = nfts.assets
          assets.push(...nft)
          axios.get('https://api.opensea.io/api/v1/assets?asset_contract_address=0x12f28e2106ce8fd8464885b80ea865e98b465149&order_direction=desc&offset=50&limit=50').then(res => {
            const nfts : OpenSeaNFT = res.data
            const nft = nfts.assets
            assets.push(...assets,...nft)
            // console.log(assets.length)
            setcreatorNFT(nft.filter(thing => thing?.last_sale != undefined).sort((a,b) => parseFloat(b.last_sale.payment_token?.usd_price) - parseFloat(a.last_sale.payment_token.usd_price)))
          })
        })
      })
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
    <img className="w-1/3" src={creator?.collection?.banner_image_url} alt=""/>
    <span>{creator?.collection?.description}</span>
    <hr/>
    <h1 className="text-2xl m-auto text-center mt-12 mb-10">{creator?.name}'s arts</h1>
    {creatorNFT.map(thing => {
      return <div className="w-2/3 m-auto mb-6 flex  ">
        <img src={thing?.image_thumbnail_url} className="h-24" alt=""/>
        <div className="flex-grow ml-4">
          <p className="block">{thing?.name}</p>
          <p className="block">current owner: {thing?.owner?.user?.username}</p>
          <p className="block">
            Sale for {thing.last_sale.quantity} times | { Math.floor(parseFloat(thing.last_sale.payment_token.usd_price))} usd
          </p>
          <a href={thing?.permalink} className="inline-block border-2 border-black px-4 py-1 bg-white">Link</a>
        </div>

      </div>
    })}
    <hr/>
    <h1 className="text-2xl m-auto text-center mt-12 mb-10">{creator?.name}'s buys</h1>
    {creatorThings.map(thing => {
      return <span className="m-auto inline-flex flex-col mb-12 mx-6 items-center justify-center relative ">
        <img className="absolute top-0 left-0 h-8 inline rounded-full" src={thing.banner_image_url} alt=""/><br/>
        <img src={thing.image_url} className="h-24" alt=""/>
        <p className="inline">{thing.name}</p>
      </span>
    })}

  </div>
}

//
export default Page
