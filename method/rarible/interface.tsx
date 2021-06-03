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
