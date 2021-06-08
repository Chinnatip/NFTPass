type LinkPlatforms =
  | 'discord'
  | 'facebook'
  | 'instagram'
  | 'snapchat'
  | 'tiktok'
  | 'twitch'
  | 'twitter'
  | 'website'
  | 'youtube'

type UserLinks = {
  [Property in LinkPlatforms]: {
    handle: string
    platform: string
  }
}

export type User = {
  firstName: string
  lastName: string
  isAdmin: boolean
  links: UserLinks
  userIndex: number
  publicKey: string
  username: string
  profileImageUrl: string
  coverImageUrl: string
  name: string
  bio: string
  isApprovedCreator: boolean
  moderationStatus: string
  joinedWaitlistAt: Date
  createdAt: Date
}

export type UserFollower = {
  id: string
  user: Pick<
    User,
    'name' | 'profileImageUrl' | 'publicKey' | 'userIndex' | 'username'
  >
}

export interface HasuraArtwork {
  id: string
  name: string
  description: string
  assetIPFSPath: string
  metadataIPFSPath: string
  width: number
  height: number
  duration: string
  mimeType: string
  mintTxHash: string
  assetId: string
  assetStatus: string
  tokenId: number
  status: string
  hiddenAt: Date
  deletedAt: Date
  moderationStatus: string
  latestTxDate: Date
  creator: User
}

export type Artwork = {
  id: string
  tokenId: string
  dateMinted: string
  ownedOrListedBy: {
    id: string
  }
  creator: {
    id: string
  }
  nftHistory: { event: string }[]
  mostRecentActiveAuction: {
    id: string
    auctionId: string
    duration: string
    status: string
    reservePriceInETH: string
    seller: {
      id: string
    }
    dateEnding: string
    dateStarted: string
    dateCreated: string
    transactionHashCreated: string
    highestBid: {
      amountInETH: string
      status: string
      datePlaced: string
      bidder: {
        id: string
      }
    }
  }
}

type BidFragment = {
  amountInETH: string
  status: string
  datePlaced: string
  bidder: {
    id: string
  }
}

type NftHistoryFragment = {
  id: string
  event: string
  date: string
  marketplace: string
  transactionHash: string
  amountInETH: string
  actorAccount: {
    id: string
  }
  nftRecipient: {
    id: string
  }
}

export type ArtworkHistory = {
  id: string
  tokenId: string
  dateMinted: string
  ownedOrListedBy: {
    id: string
  }
  creator: {
    id: string
  }
  mostRecentActiveAuction: {
    id: string
    auctionId: string
    duration: string
    status: string
    reservePriceInETH: string
    seller: {
      id: string
    }
    dateEnding: string
    dateStarted: string
    dateCreated: string
    transactionHashCreated: string
    bids: BidFragment
    highestBid: BidFragment
  }
  nftHistory: NftHistoryFragment
}

export type UserProfileCollector = {
  id: string
  nftMarketAuctions: {
    highestBid: Pick<BidFragment, 'datePlaced' | 'bidder'>
  }
}
