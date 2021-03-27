export interface OpenseaData {
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

export interface OpenseaCollection  {
  address?: string
  asset_contract_type?: string
  buyer_fee_basis_points?: number
  collection?: {
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
  created_date?: string
  default_to_fiat?: boolean
  description?: string
  dev_buyer_fee_basis_points?: number
  dev_seller_fee_basis_points?: number
  external_link?: string
  image_url?: string
  name?: string
  nft_version?: string
  only_proxied_transfers?: boolean
  opensea_buyer_fee_basis_points?: number
  opensea_seller_fee_basis_points?: number
  opensea_version?: string
  owner?: string
  payout_address?: string
  schema_name?: string
  seller_fee_basis_points?: number
  symbol?: string
  total_supply?: string
}

export interface OpenseaThing  {
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

export interface OpenSeaNFT {
  assets: NFTAsset[]
}

export interface NFTAsset {
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
