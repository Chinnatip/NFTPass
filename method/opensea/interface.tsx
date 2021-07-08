import { Galleryst } from '../../interfaces/index'

export interface OpenseaGetResponse {
  onsale: string[]
  created: string[]
  owned: string[]
  allID: string[]
  items: Galleryst[]
}

export interface SaleOrder {
  created_date: string
  closing_date?: string
  closing_extendable: boolean
  expiration_time: number
  listing_time: number
  order_hash: string
  metadata: {
      asset: {
          id: string
          address: string
          quantity: string
      },
      schema: string
  },
  exchange: string
  maker: {
      user: number
      profile_img_url: string
      address: string
      config: string
      discord_id: string
  },
  taker: {
      user: number
      profile_img_url: string
      address: string
      config: string
      discord_id: string
  },
  current_price: string
  current_bounty: string
  bounty_multiple: string
  maker_relayer_fee: string
  taker_relayer_fee: string
  maker_protocol_fee: string
  taker_protocol_fee: string
  maker_referrer_fee: string
  fee_recipient: {
      user: number
      profile_img_url: string
      address: string
      config: string
      discord_id: string
  },
  fee_method: number
  side: number
  sale_kind: number
  target: string
  how_to_call: number
  calldata: string
  replacement_pattern: string
  static_target: string
  static_extradata: string
  payment_token: string
  payment_token_contract: {
      id: number
      symbol: string
      address: string
      image_url: string
      name: string
      decimals: number
      eth_price: string
      usd_price: string
  },
  base_price: string
  extra: string
  quantity: string
  salt: string
  v: number
  r: string
  s: string
  approved_on_chain: boolean
  cancelled: boolean
  finalized: boolean
  marked_invalid: boolean
  prefixed_hash: string
}

export interface OpenSeaNFT {
  assets: OpenseaItem[]
}

export interface OpenseaItem {
  id: number
  token_id: string
  num_sales: number
  background_color?: string
  image_url: string
  image_preview_url: string
  image_thumbnail_url: string
  image_original_url: string
  animation_url?: string
  animation_original_url?: string
  name: string
  description: string
  external_link: string
  asset_contract: {
      address: string
      asset_contract_type: string
      created_date: string
      name: string
      nft_version: string
      opensea_version?: string
      owner?: string
      schema_name: string
      symbol: string
      total_supply: string
      description: string
      external_link: string
      image_url: string
      default_to_fiat: boolean
      dev_buyer_fee_basis_points: number
      dev_seller_fee_basis_points: number
      only_proxied_transfers: boolean
      opensea_buyer_fee_basis_points: number
      opensea_seller_fee_basis_points: number
      buyer_fee_basis_points: number
      seller_fee_basis_points: number
      payout_address: string
  },
  permalink: string
  collection: {
      banner_image_url: string
      chat_url?: string
      created_date: string
      default_to_fiat: boolean
      description: string
      dev_buyer_fee_basis_points: string
      dev_seller_fee_basis_points: string
      discord_url: string
      display_data: {
          card_display_style: string
      },
      external_url: string
      featured: boolean
      featured_image_url: string
      hidden: boolean
      safelist_request_status: string
      image_url: string
      is_subject_to_whitelist: boolean
      large_image_url: string
      medium_username?: string
      name: string
      only_proxied_transfers: boolean
      opensea_buyer_fee_basis_points: string
      opensea_seller_fee_basis_points: string
      payout_address: string
      require_email: boolean
      short_description?: string
      slug: string
      telegram_url?: string
      twitter_username: string
      instagram_username?: string
      wiki_url?: string
  },
  decimals: number
  token_metadata: string
  owner: {
      user: {
          username: string
      },
      profile_img_url: string
      address: string
      config: string
      discord_id: string
  },
  sell_orders?: SaleOrder[]
  creator: {
      user?: string
      profile_img_url: string
      address: string
      config: string
      discord_id: string
  },
  traits: [],
  last_sale?: null,
  top_bid?: null,
  listing_date?: null,
  is_presale: boolean
  transfer_fee_payment_token?: null,
  transfer_fee?: null
}

export interface Offer {
  "token": string
  "tokenId": string
  "assetType": string
  "owner": string
  "salt": {
      "value": string
      "type": string
  },
  "buyValue": number
  "buyToken": string
  "buyTokenId": string
  "buyAssetType": string
  "value": number
  "signature": string
  "updateDate": string
  "importantUpdateDate": string
  "contractVersion": number
  "fee": number
  "sold": number
  "canceled": false,
  "pending": string[]
  "buyPriceEth": number
  "version": number
  "id": string
  "active": true,
  "buyStock": number
  "sellPrice": number
  "buyPrice": number
}

export interface RaribleNFT {
  id: string
  token: string
  tokenId: string
  owner: string
  value: number
  date: string
  status: string
  selling: number
  sold: number
  stock: number
  pending: string[]
  blacklisted: boolean
  creator: string
  verified: true,
  categories: string[]
  likes: number
  hide: boolean
}

export interface Royalty {
  recipient: string
  value: number
}

export interface Ownership {
  id: string
  token: string
  tokenId: string
  owner: string
  value: number
  date: string
  price: number
  priceEth: number
  buyToken: string
  buyTokenId: string
  status: string
  selling: number
  sold:number
  stock: number
  signature: string
  pending: string[],
  blacklisted: boolean
  creator: string
  verified: boolean
  categories: string[]
  likes: number
  hide: boolean
}

export interface RaribleNFTFull {
  item: {
    id: string
    token: string
    tokenId: string
    unlockable: boolean
    creator: string
    blacklisted: boolean
    supply: number
    royalties: Royalty[]
    likes: number
    categories: string[]
    verified: boolean
    owners: string[]
    sellers: number
    ownership: Ownership
    totalStock: number
    visits: number
  }
  properties: {
    name: string
    description: string
    image: string
    imagePreview: string
    imageBig: string
    attributes: string[]
  },
  meta: {
    imageMeta: {
      type: string
      width: number
      height: number
    }
  }
  id: string
}

export interface ProfileList {
  id: string
  type: string
  name: string
  image: string
  shortUrl: string
  website: string
  description: string
  has3Box: boolean
  badges: string[]
  cover: string
  followings: number
  followers: number
  blacklisted: boolean
}

export interface Profile {
  address?: string
  username?: string
  shortUrl?: string
  pic?: string
  cover?: string
  followings?: number
  followers?: number
  acceptedTerms?: number
  description?: string
  website?: string
  twitterUsername?: string
  receiveEmailNotifications?: boolean
  version?: number
  emailConfirmed?: boolean
  meta?: {
    address?: string
    ownershipsWithStock?: number
    itemsCreated?: number
    ownerships?: number
    hides?: number
    followers?: number
    followings?: number
    likes?: number
  }
}

export interface BestOffer {
  token: string
  tokenId: string
  assetType: string
  owner: string
  salt: {
      value: string
      type: string
  },
  buyValue: number
  buyToken: string
  buyTokenId: string
  buyAssetType: string
  value: number
  signature: string
  updateDate: string
  importantUpdateDate: string
  contractVersion: number
  fee: number
  sold: number
  canceled: boolean
  pending: string[],
  buyPriceEth: number
  version: number
  id: string
  active: boolean
  buyStock: number
  sellPrice: number
  buyPrice: number
}

export interface Activity {
  "@type": string
  date: string
  id: string
  owner: string
  from?: string
  token: string
  tokenId: string
  value: number
  buyValue?: number
  price?: number
  buyToken?: string
  transactionHash: string
}
