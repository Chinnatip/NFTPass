export type User = {
  id: number
  name: string
}

export interface Galleryst {
  name: string
  id: string
  likes?: number
  priceETH?: number
  priceUSD?: number
  imagePreview: string
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
