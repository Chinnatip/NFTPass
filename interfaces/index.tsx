export interface ResponseDetail {
  status: boolean
  link?: string
  data?: NFTDetail | undefined
}

export interface Galleryst {
  name: string
  id: string
  likes?: number
  priceETH?: number
  priceUSD?: number
  imagePreview: string
  verified?: boolean
  check?: {
    rarible?: boolean
    opensea?: boolean
    foundation?: boolean
    nifty?: boolean
  }
}

export type Token = {
  login: boolean
  token: string
  username: string
  surname: string
  picture: string
  cover_image: string
  userId: number
} | null

type Follower = {
  facebook?: number
  instagram?: number
  youtube?: number
}

export type InfluencerProfile = {
  name: string
  picture: string
  cover_image: string
  feature_video: string
  description: string
  follower: Follower
  tags: string[]
}

export type UserProfile = {
  username: string
  surname: string
  picture: string
  cover_image: string
  userId: number
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

export interface User {
  address: string
  name?: string
  desription?: string
  image?: string
  shortUrl?: string
  user?: any
}

export interface ActivityLog {
  type: string
  current_owner: User
  previous_owner?: User
  date: string
  value: number
  price?: number
}

export interface NFTDetail {
  image?: string
  address: string
  owner?: User[]
  creator?: User
  title?: string
  description?: string
  pricing?: {
    status?: string | boolean
    eth?: number
    usd?: number
  }
  offer?:{
    status?: boolean
    best_offer?: number
  }
  activity?: ActivityLog[]
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
