import { useRouter } from 'next/router'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Icon, { FacebookIcon, InstagramIcon, TwitterIcon } from '../components/Icon'
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

const iconLists = [
{img_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png", title: "Facebook" , connected: false},
{img_url: "https://rmutrecht.org/wp-content/uploads/sites/259/2017/07/logo-twitter.png", title: "Twitter" , connected: false},
{img_url: "https://www.pngitem.com/pimgs/m/461-4618525_ig-small-instagram-logo-2019-hd-png-download.png", title: "Instagram" , connected: false},
{img_url: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-512.png", title: "Youtube" , connected: false},
{img_url: "https://pngimg.com/uploads/twitch/twitch_PNG13.png", title: "Twitch" , connected: false},
{img_url: "https://cdn2.iconfinder.com/data/icons/minimalism/512/soundcloud.png", title: "SoundCloud" , connected: false},
]

const Page = () => {
  const Router = useRouter()
  const [modal, setModal] = useState(false)
  const [connections, setConnection] = useState(iconLists)
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
  useEffect(() => { }, []);
  return <div className="flex flex-col items-center justify-center relative">
    {/* Modal */}
    { modal && <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75	z-10 flex items-center justify-center">

      <button onClick={() => setModal(false) } className="mt-2 mr-2 absolute top-0 right-0 text-4xl text-white">x</button>
      <div className="w-full ">
      <div className="flex flex-col items-center justify-center   w-full">
      <div>
        </div>
        <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col bg-pattern">
          <div className="flex flex-col mb-8">
            { connections.map((icon,index) => {
              return <div className="flex  flex-row justify-between w-full items-center	mb-6">
              <div className="flex flex-row items-center">
                <img className="sm-connector mr-2" src={icon.img_url} />{icon.title}
              </div>
              { icon.connected ?
                <button onClick={() => {
                  const updateConnection = connections.map((connect,getIndex) => { return getIndex != index ? connect : { ...connect, connected: false }})
                  setConnection(updateConnection)
                }} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">
                  <div className="text-green-400	inline">
                    <Icon fill={faCheckCircle}/>
                  </div>
                  Connected
                </button>:
                <button onClick={() => {
                  const updateConnection = connections.map((connect,getIndex) => { return getIndex != index ? connect : { ...connect, connected: true }})
                  setConnection(updateConnection)
                }} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Connect</button>
              }
            </div>
            })}
          </div>

        </div>
      </div>
      </div>
    </div>}

    {/* Passport page */}
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
          <div className="flex-grow text-right">
            <button onClick={() => setModal(true)} className="inline text-gray-700 border-2 bg-gray-300 px-4">Connect</button>
          </div>
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
          <img className="m-auto block thumbnail-work" src="https://res.cloudinary.com/nifty-gateway/video/upload/v1603975889/Beeple/POLITICAL_BULLSHIT_uqbc8x.png" alt="" />
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
      <span className="text-left">{creator?.name}'s buys</span>
      <div className="grid grid-cols-2 gap-4 my-4 mb-8">
    {creatorThings.slice(0, 8).map(thing => {
      return <span className="style-box-primary artwork-card flex-col text-left">
        <img src={thing.image_url} className="m-auto block thumbnail-work" alt=""/>
        <p className="text-sm	block text-blue-600 ">{thing.name}</p>
      </span>
    })}
      </div>
    </div>
  </div>
}

export default Page
