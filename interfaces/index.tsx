export type User = {
  id: number
  name: string
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
