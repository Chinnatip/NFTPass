import { Galleryst } from '../../interfaces/index'

interface SocialLink {
  id: number
  socialMediaIconLink: string
  socialMediaLabel: string
  socialMediaLink: string
}

export interface Drop {
  address: string
  collectionName: string
  title: string
  description: string
  image: string
  type: number
  edition: number
  sold: number
}

interface CreatorInfo {
  id: number;
  name: string;
  bio: string;
  profile_pic_url: string;
  profile_url: string;
  verified: boolean;
  userCanCreateNiftyStores: boolean;
  verifiedPurchaseEnabled: boolean;
  social_links: SocialLink[]
}

export interface NiftyGetResponse {
  creator?: CreatorInfo
  owned: string[]
  onsale: string[]
  allID: string[]
  drops: Drop[]
  items: Galleryst[]
}

export interface NiftyCollection {
  Timestamp: string
  contractObj: {
    Timestamp: string
    id: number
    template: string
    contractId: number
    userWhoCreated: number
    storeName: string
    storeURL: string
    project_cover_photo_url: string
    contractAddress: string
    contractOwner: string
    storeDescription: string
    storeDescription2: string
    storeHeadline: string
    AdditionalInfo: string
    project_icon: string
    project_trading_fee_bips: number
    project_category: string
    OpeningDateTimeInUTC: string
    ClosingDateTimeInUTC: string
    storeLink1: string
    storeLink2: string
    storeLink3: string
    storeLink4: string
    storeLink5: string
    hiddenNifties: boolean
    hiddenNiftiesDisplayImage: string
    timed_purchasing_end?: string
  },
  niftyType: number
  niftyTotalNumOfEditions: number
  niftyTotalReserved: number
  niftyTotalBurnt: number
  isAnAuctionNifty: boolean
  isSilentAuction: boolean
  isDrawing: boolean
  niftyPriceInCents: number
  niftyBackgroundColor: string
  niftyEditionNumIncludedInTitle: boolean
  niftyTitle: string
  niftyDescription: string
  niftyAttributesAsJson: string
  niftyCanonicalImageHash: string
  niftyContractAddress: string
  niftyTotalSold: number
  niftyImageURL: string
  niftyDisplayImage: string
  staticThumbnailUrl: string
  isFromExistingContract: boolean
  has_sound: boolean
  id: number
  canTransform: boolean
  additionalAssets: string
  onePurchasePerUser: boolean
  forVerifiedUserPurchaseOnly: boolean
  auctionInfo: {
    id: number
    Timestamp: string
    end_date: string
    variant: string
  }
  on_hold: boolean
}

export interface Nifties {
  contractAddress: string
  project_name: string
  project_slug: string
  id: number
  name: string
  description: string
  image_url: string
  image_preview_url: string
  background_color: string
  permalink: string
  tokenId: string
  unmintedNiftyObjThatCreatedThis: {
    Timestamp: string
    contractObj: {
      Timestamp: string
      id: number
      template: string
      contractId: number
      userWhoCreated: number
      storeName: string
      storeURL: string
      project_cover_photo_url: string
      contractAddress: string
      contractOwner: string
      storeDescription: string
      storeDescription2: string
      storeHeadline: string
      AdditionalInfo: string
      project_icon: string
      project_trading_fee_bips: number
      project_category: string
      OpeningDateTimeInUTC: string
      ClosingDateTimeInUTC: string
      storeLink1: string
      storeLink2: string
      storeLink3: string
      storeLink4: string
      storeLink5: string
      hiddenNifties: boolean
      hiddenNiftiesDisplayImage: string
      timed_purchasing_end: string
    }
    niftyType: number
    niftyTotalNumOfEditions: number
    niftyTotalReserved: number
    niftyTotalBurnt: number
    isAnAuctionNifty: boolean
    isSilentAuction: boolean
    isDrawing: boolean
    niftyPriceInCents: number
    niftyBackgroundColor: string
    niftyEditionNumIncludedInTitle: boolean
    niftyTitle: string
    niftyDescription: string
    niftyAttributesAsJson: string
    niftyCanonicalImageHash: string
    niftyContractAddress: string
    niftyTotalSold: number
    niftyImageURL: string
    niftyDisplayImage: string
    staticThumbnailUrl: string
    isFromExistingContract: boolean
    has_sound: boolean
    id: number
    canTransform: boolean
    additionalAssets: string
    onePurchasePerUser: boolean
    forVerifiedUserPurchaseOnly: boolean
  }
  is_redeemed: boolean
  redeemable_project?: any
  is_accepting_offers: boolean
  minimum_offer_amount_in_cents: number
  on_hold: boolean
  sell_order: {
    currently_on_sale: boolean
    sellOrder: any
  }
  creator_info: {
    id: number
    name: string
    bio: string
    profile_pic_url: string
    profile_url: string
    verified: boolean
    userCanCreateNiftyStores: boolean
  }
}

export interface Collections {
  Timestamp: string
  id: number
  template: string
  contractId: number
  userWhoCreated: number
  storeName: string
  storeURL: string
  project_cover_photo_url: string
  contractAddress: string
  contractOwner: string
  storeDescription: string
  storeDescription2: string
  storeHeadline: string
  AdditionalInfo: string
  project_icon: string
  project_trading_fee_bips: number
  project_category: string
  OpeningDateTimeInUTC: string
  ClosingDateTimeInUTC: string
  storeLink1: string
  storeLink2: string
  storeLink3: string
  storeLink4: string
  storeLink5: string
  hiddenNifties: boolean
  hiddenNiftiesDisplayImage: string
  timed_purchasing_end?: string
  userProfile: {
    name: string
    profile_pic_url: string
    profile_url: string
    id: number
    social_links: SocialLink[]
  }
  nifties: NiftyCollection[]
}

export interface NiftyResp {
  userProfileAndNifties: {
    id: number
    name: string
    bio: string
    profile_pic_url: string
    profile_url: string
    verified: boolean
    userCanCreateNiftyStores: boolean
    verifiedPurchaseEnabled: boolean
    social_links: SocialLink[]
    nifties: Nifties[]
    stores: Collections[]
  }
}

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
