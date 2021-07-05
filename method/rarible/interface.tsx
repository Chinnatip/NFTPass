import { Galleryst } from '../../interfaces/index'

export interface RaribleGetResponse {
  onsale: string[]
  created: string[]
  owned: string[]
  allID: string[]
  items?: Galleryst[]
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
  email?: string
  followings?: number
  followers?: number
  acceptedTerms?: number
  description?: string
  website?: string
  twitterUsername?: string
  receiveEmailNotifications?: boolean
  version?: number
  emailConfirmed?: boolean
  verified?: boolean
  marketCheck?: {
    rarible?: boolean
    opensea?: boolean
    foundation?: boolean
    nifty?: boolean
  }
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
