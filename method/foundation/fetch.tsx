import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { Galleryst, Profile } from 'interfaces'
// import { ResponseDetail } from '../../interfaces/index'
import {
  Artwork,
  ArtworkHistory,
  FoundationFollowState,
  FoundationGetResponse,
  HasuraArtwork,
  User,
  UserFollower,
} from './interface'
import { FOUNDATION_GQL_URI, THE_GRAPH_GQL_URI } from './static'
import { getFoundationAssetUrl } from './utils'

const foundationApolloClient = new ApolloClient({
  uri: FOUNDATION_GQL_URI,
  cache: new InMemoryCache(),
})

const theGraphApolloClient = new ApolloClient({
  uri: THE_GRAPH_GQL_URI,
  cache: new InMemoryCache(),
})

export const hasuraUsersByAddresses = async (publicKeys: string[]): Promise<User[]> => {
  const USER_QUERY = gql`
    query hasuraUsersByIds(
      $publicKeys: [String!]!
      $moderationStatuses: [user_moderationstatus_enum!]
    ) {
      users: user(
        where: { publicKey: { _in: $publicKeys }, moderationStatus: { _in: $moderationStatuses } }
      ) {
        firstName
        lastName
        isAdmin
        links
        userIndex
        publicKey
        username
        profileImageUrl
        coverImageUrl
        name
        bio
        isApprovedCreator
        moderationStatus
        joinedWaitlistAt
        createdAt
      }
    }
  `
  const variables = {
    publicKeys,
    moderationStatuses: ['ACTIVE'],
  }
  const { data } = await foundationApolloClient.query({
    query: USER_QUERY,
    variables,
  })
  return data.users
}

export const userInfo = async (address: string): Promise<Profile> => {
  const users = await hasuraUsersByAddresses([address])
  const user = users.find(predicate => predicate.publicKey === address)
  if (!user) throw new Error('[FND] user address not found')
  const followState = await userFollowState(address)
  return {
    address: user.publicKey,
    username: user.username,
    pic: user.profileImageUrl,
    cover: user.coverImageUrl,
    followings: followState.followingCount,
    followers: followState.followerCount,
    description: user.bio,
    website: user.links.website.handle,
    twitterUsername: user.links.twitter.handle,
    // meta: {
    //   address,
    //   ownershipsWithStock: 0,
    //   itemsCreated: 0,
    //   ownerships: 0,
    //   hides: 0,
    //   followers: followState.followerCount,
    //   followings: followState.followingCount,
    //   likes: 0,
    // },
  }
}

export const hasuraArtworks = async (limit = 48, offset = 0): Promise<HasuraArtwork[]> => {
  const ARTWORK_QUERY = gql`
    query hasuraArtworks(
      $excludeHidden: Boolean!
      $moderationStatuses: [artwork_moderationstatus_enum!]
      $userModerationStatuses: [user_moderationstatus_enum!]
      $limit: Int!
      $offset: Int!
    ) {
      artworks: artwork(
        limit: $limit
        offset: $offset
        where: {
          deletedAt: { _is_null: true }
          moderationStatus: { _in: $moderationStatuses }
          user: { moderationStatus: { _in: $userModerationStatuses } }
          _or: [
            { _and: [{ hiddenAt: { _is_null: true } }, { user: { hiddenAt: { _is_null: true } } }] }
            {
              _or: [
                {
                  _and: [
                    { hiddenAt: { _is_null: $excludeHidden } }
                    { user: { hiddenAt: { _is_null: true } } }
                  ]
                }
                {
                  _and: [
                    { hiddenAt: { _is_null: true } }
                    { user: { hiddenAt: { _is_null: $excludeHidden } } }
                  ]
                }
                {
                  _and: [
                    { hiddenAt: { _is_null: $excludeHidden } }
                    { user: { hiddenAt: { _is_null: $excludeHidden } } }
                  ]
                }
              ]
            }
          ]
        }
      ) {
        id
        name
        description
        assetIPFSPath
        metadataIPFSPath
        width
        height
        duration
        mimeType
        mintTxHash
        assetId
        assetStatus
        tokenId
        status
        hiddenAt
        deletedAt
        moderationStatus
        latestTxDate
        creator: user {
          firstName
          lastName
          isAdmin
          links
          publicKey
          username
          profileImageUrl
          coverImageUrl
          name
          bio
          isApprovedCreator
          moderationStatus
          joinedWaitlistAt
          createdAt
        }
      }
    }
  `
  const variables = {
    limit,
    offset,
    excludeHidden: false,
    moderationStatuses: ['ACTIVE'],
    userModerationStatuses: ['ACTIVE'],
  }
  const { data } = await foundationApolloClient.query({
    query: ARTWORK_QUERY,
    variables,
  })
  return data.artworks
}

export const hasuraArtworksByTokenIds = async (
  tokenIds: number[] | string[],
  successOnly = false
): Promise<HasuraArtwork[]> => {
  const ARTWORK_QUERY = gql`
    query hasuraArtworksByTokenIds(
      $tokenIds: [Int!]!
      $excludeHidden: Boolean!
      $moderationStatuses: [artwork_moderationstatus_enum!]
      $userModerationStatuses: [user_moderationstatus_enum!]
    ) {
      artworks: artwork(
        where: {
          tokenId: { _in: $tokenIds }
          deletedAt: { _is_null: true }
          moderationStatus: { _in: $moderationStatuses }
          user: { moderationStatus: { _in: $userModerationStatuses } }
          ${successOnly ? 'assetStatus: { _eq: "SUCCESS" }' : ''}
          _or: [
            {
              _and: [
                { hiddenAt: { _is_null: true } }
                { user: { hiddenAt: { _is_null: true } } }
              ]
            }
            {
              _or: [
                {
                  _and: [
                    { hiddenAt: { _is_null: $excludeHidden } }
                    { user: { hiddenAt: { _is_null: true } } }
                  ]
                }
                {
                  _and: [
                    { hiddenAt: { _is_null: true } }
                    { user: { hiddenAt: { _is_null: $excludeHidden } } }
                  ]
                }
                {
                  _and: [
                    { hiddenAt: { _is_null: $excludeHidden } }
                    { user: { hiddenAt: { _is_null: $excludeHidden } } }
                  ]
                }
              ]
            }
          ]
        }
      ) {
        id
        name
        description
        assetIPFSPath
        metadataIPFSPath
        width
        height
        duration
        mimeType
        mintTxHash
        assetId
        assetStatus
        tokenId
        status
        hiddenAt
        deletedAt
        moderationStatus
        latestTxDate
        creator: user {
          firstName
          lastName
          isAdmin
          links
          publicKey
          username
          profileImageUrl
          coverImageUrl
          name
          bio
          isApprovedCreator
          moderationStatus
          joinedWaitlistAt
          createdAt
        }
      }
    }
  `
  const variables = {
    tokenIds,
    excludeHidden: false,
    moderationStatuses: ['ACTIVE'],
    userModerationStatuses: ['ACTIVE'],
  }
  const { data } = await foundationApolloClient.query({
    query: ARTWORK_QUERY,
    variables,
  })
  return data.artworks
}

export const userFollowers = async (
  publicKey: string,
  currentUserPublicKey = '',
  limit = 5,
  offset = 0
): Promise<UserFollower> => {
  const FOLLOWER_QUERY = gql`
    query userFollowersQuery(
      $publicKey: String!
      $currentUserPublicKey: String!
      $offset: Int!
      $limit: Int!
    ) {
      follows: follow(
        where: { followedUser: { _eq: $publicKey }, isFollowing: { _eq: true } }
        offset: $offset
        limit: $limit
      ) {
        id
        user: userByFollowingUser {
          name
          username
          profileImageUrl
          userIndex
          publicKey
          follows(where: { user: { _eq: $currentUserPublicKey }, isFollowing: { _eq: true } }) {
            createdAt
            isFollowing
          }
        }
      }
    }
  `
  const variables = {
    publicKey,
    currentUserPublicKey,
    limit,
    offset,
  }
  const { data } = await foundationApolloClient.query({
    query: FOLLOWER_QUERY,
    variables,
  })
  return data.follows
}

export const hasuraUserFeed = async (userIds: string[], publicKey = '', limit = 48, offset = 0) => {
  const USER_FEED_QUERY = gql`
    query hasuraUsersFeed($publicKey: String!, $userIds: [String!]!, $limit: Int!, $offset: Int!) {
      users: user(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
        where: {
          publicKey: { _in: $userIds }
          moderationStatus: { _eq: "ACTIVE" }
          _and: [{ publicKey: { _neq: $publicKey } }, { publicKey: { _in: $userIds } }]
          artworks: { tokenId: { _is_null: false } }
        }
      ) {
        ...HasuraFeedUserFragment
      }
    }

    fragment HasuraFeedUserFragment on user {
      ...HasuraUserFragment
      followerCount: follows_aggregate(where: { isFollowing: { _eq: true } }) {
        aggregate {
          count
        }
      }
      follows(where: { user: { _eq: $publicKey }, isFollowing: { _eq: true } }) {
        createdAt
        isFollowing
      }
    }

    fragment HasuraUserFragment on user {
      ...HasuraUserFragmentLight
      firstName
      lastName
      isAdmin
      links
    }

    fragment HasuraUserFragmentLight on user {
      userIndex
      publicKey
      username
      profileImageUrl
      coverImageUrl
      name
      bio
      isApprovedCreator
      moderationStatus
      joinedWaitlistAt
      createdAt
    }
  `
  const variables = {
    publicKey,
    userIds,
    limit,
    offset,
  }
  const { data } = await foundationApolloClient.query({
    query: USER_FEED_QUERY,
    variables,
  })
  return data.users
}

export const userFollowState = async (
  publicKey: string,
  currentUserPublicKey = ''
): Promise<FoundationFollowState> => {
  const FOLLOW_STATE_QUERY = gql`
    query getHasuraUserFollowState($currentUserPublicKey: String!, $publicKey: String!) {
      followerCount: follow_aggregate(
        where: { followedUser: { _eq: $publicKey }, isFollowing: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      followingCount: follow_aggregate(
        where: { user: { _eq: $publicKey }, isFollowing: { _eq: true } }
      ) {
        aggregate {
          count
        }
      }
      mutualFollowCount: follow_aggregate(
        where: {
          isFollowing: { _eq: true }
          _and: [
            { followedUser: { _eq: $publicKey } }
            {
              userByFollowingUser: {
                follows: { user: { _eq: $currentUserPublicKey }, isFollowing: { _eq: true } }
              }
            }
          ]
        }
      ) {
        aggregate {
          count
        }
      }
      follows: follow(
        where: {
          user: { _eq: $currentUserPublicKey }
          followedUser: { _eq: $publicKey }
          isFollowing: { _eq: true }
        }
      ) {
        id
        createdAt
        updatedAt
        user
        followedUser
        isFollowing
      }
    }
  `
  const variables = {
    publicKey,
    currentUserPublicKey,
  }
  const { data } = await foundationApolloClient.query({ query: FOLLOW_STATE_QUERY, variables })
  return {
    followerCount: data.followerCount.aggregate.count || 0,
    followingCount: data.followingCount.aggregate.count || 0,
    mutualFollowCount: data.mutualFollowCount.aggregate.count || 0,
    follows: data.follows || [],
  }
}

export const userOwnedArtworks = async (
  publicKey: string,
  limit = 100,
  offset = 0
): Promise<Artwork[]> => {
  const OWNED_ARTWORK_QUERY = gql`
    query getOwnedArtworks($publicKey: String!, $limit: Int!, $offset: Int!) {
      artworks: nfts(
        where: {
          ownedOrListedBy: $publicKey
          owner_not: "0x0000000000000000000000000000000000000000"
          creator_not: $publicKey
        }
        first: $limit
        skip: $offset
        orderBy: dateMinted
        orderDirection: desc
      ) {
        id
        tokenId
        dateMinted
        ownedOrListedBy {
          id
        }
        creator {
          id
        }
        nftHistory(orderBy: date, orderDirection: desc, first: 1) {
          event
        }
        mostRecentActiveAuction {
          id
          auctionId
          duration
          status
          reservePriceInETH
          seller {
            id
          }
          dateEnding
          dateStarted
          dateCreated
          transactionHashCreated
          highestBid {
            amountInETH
            status
            datePlaced
            bidder {
              id
            }
          }
        }
      }
    }
  `
  const variables = {
    publicKey: publicKey.toLowerCase(),
    limit,
    offset,
    moderationStatuses: ['ACTIVE'],
  }
  const { data } = await theGraphApolloClient.query({
    query: OWNED_ARTWORK_QUERY,
    variables,
  })
  return data.artworks
}

export const userMintedArtworks = async (
  publicKey: string,
  limit = 100,
  offset = 0
): Promise<Artwork[]> => {
  const MINTED_ARTWORK_QUERY = gql`
    query getMintedArtworks($publicKey: String!, $limit: Int!, $offset: Int!) {
      artworks: nfts(
        where: { creator: $publicKey, owner_not: "0x0000000000000000000000000000000000000000" }
        first: $limit
        skip: $offset
        orderBy: dateMinted
        orderDirection: desc
      ) {
        id
        tokenId
        dateMinted
        ownedOrListedBy {
          id
        }
        creator {
          id
        }
        nftHistory(orderBy: date, orderDirection: desc, first: 1) {
          event
        }
        mostRecentActiveAuction {
          id
          auctionId
          duration
          status
          reservePriceInETH
          seller {
            id
          }
          dateEnding
          dateStarted
          dateCreated
          transactionHashCreated
          highestBid {
            amountInETH
            status
            datePlaced
            bidder {
              id
            }
          }
        }
      }
    }
  `
  const variables = {
    publicKey: publicKey.toLowerCase(),
    limit,
    offset,
    moderationStatuses: ['ACTIVE'],
  }
  const { data } = await theGraphApolloClient.query({
    query: MINTED_ARTWORK_QUERY,
    variables,
  })
  return data.artworks
}

export const ownByAddress = async (
  address: string,
  limit = 100,
  offset = 0
): Promise<FoundationGetResponse> => {
  // fetch
  const ownedNfts = await userOwnedArtworks(address, limit, offset)
  const createdNfts = await userMintedArtworks(address, limit, offset)
  const allNfts = [...ownedNfts, ...createdNfts]
  const onsaleNfts = allNfts.filter(({ nftHistory }) => nftHistory?.[0].event === 'Bid')
  // return ids
  const owned = ownedNfts.map(nft => `${nft.id.split('-')[0]}:${nft.tokenId}`)
  const created = createdNfts.map(nft => `${nft.id.split('-')[0]}:${nft.tokenId}`)
  const onsale = onsaleNfts.map(nft => `${nft.id.split('-')[0]}:${nft.tokenId}`)
  const allID = Array.from(new Set([...owned, ...created])) // on-sales are already in these 2
  // memoization map
  const tokenIdToAddress = new Map(allID.map(id => [id.split(':')[1], id]))
  const tokenIdToPrice = new Map<string, number>(
    allNfts.map(nft => {
      return [nft.tokenId, parseInt(nft.mostRecentActiveAuction?.highestBid?.amountInETH) || 0]
    })
  )
  const allTokenID = allID.map(id => id.split(':')[1])
  const nftWithDetails = await hasuraArtworksByTokenIds(allTokenID)
  const items = nftWithDetails.map<Galleryst>(nft => {
    return {
      name: nft.name,
      id: tokenIdToAddress.get(nft.tokenId.toString())!,
      priceETH: tokenIdToPrice.get(nft.tokenId.toString()),
      imagePreview: getFoundationAssetUrl(nft.assetIPFSPath),
    }
  })
  return {
    owned,
    created,
    onsale,
    allID,
    items,
  }
}

export const userProfileCollectors = async (publicKey: string) => {
  const PROFILE_COLLECTOR_QUERY = gql`
    query ProfileCollectorsQuery($publicKey: String!, $timeStampNow: Int!) {
      account(id: $publicKey) {
        id
        nftMarketAuctions(where: { status_not: Canceled, dateEnding_lt: $timeStampNow }) {
          highestBid {
            datePlaced
            bidder {
              id
            }
          }
        }
      }
    }
  `
  const variables = {
    publicKey: publicKey.toLowerCase(),
    timeStampNow: Math.floor(Date.now() / 1000),
  }
  const { data } = await theGraphApolloClient.query({
    query: PROFILE_COLLECTOR_QUERY,
    variables,
  })
  return data.account
}

export const userArtworksPresence = async (publicKey: string) => {
  const ARTWORK_PRESENCE_QUERY = gql`
    query getArtworksPresence($publicKey: String!) {
      artworksMinted: nfts(
        where: { creator: $publicKey, owner_not: "0x0000000000000000000000000000000000000000" }
        first: 1
      ) {
        id
      }
      artworksOwned: nfts(
        where: {
          ownedOrListedBy: $publicKey
          owner_not: "0x0000000000000000000000000000000000000000"
          creator_not: $publicKey
        }
        first: 1
      ) {
        id
      }
    }
  `
  const variables = {
    publicKey: publicKey.toLowerCase(),
  }
  return theGraphApolloClient.query({
    query: ARTWORK_PRESENCE_QUERY,
    variables,
  })
}

export const trendingArtworks = async (limit = 48): Promise<any[]> => {
  const TRENDING_QUERY = gql`
    query trendingArtworksQuery($limit: Int, $now: Int) {
      auctions: nftMarketAuctions(
        where: { status: Open, dateEnding_gt: $now, highestBid_not: null }
        orderBy: numberOfBids
        orderDirection: desc
        first: $limit
      ) {
        auctionId
        bidVolumeInETH
        numberOfBids
        dateEnding
        nft {
          id
          tokenId
          dateMinted
          ownedOrListedBy {
            id
          }
          creator {
            id
          }
          nftHistory(orderBy: date, orderDirection: desc, first: 1) {
            event
          }
          mostRecentActiveAuction {
            id
            auctionId
            duration
            status
            reservePriceInETH
            seller {
              id
            }
            dateEnding
            dateStarted
            dateCreated
            transactionHashCreated
            highestBid {
              amountInETH
              status
              datePlaced
              bidder {
                id
              }
            }
          }
        }
      }
    }
  `
  const variables = {
    limit,
    now: Math.floor(Date.now() / 1000),
  }
  const { data } = await theGraphApolloClient.query({
    query: TRENDING_QUERY,
    variables,
  })
  return data.auctions
}

// export const nftDetail = async(address: string, defaultAction?: (data: any) => void, action?: (data: any) => void): Promise<ResponseDetail> => {
// }

// export const nftDetail = async (addressPlusTokenId: string, defaultAction?: (data: any) => void, action?: (data: any) => void): Promise<ArtworkHistory> => {
//   const ARTWORK_HISTORY_QUERY = gql`
//     query getArtworkHistory($addressPlusTokenId: String!) {
//       nft(id: $addressPlusTokenId) {
//         id
//         tokenId
//         dateMinted
//         ownedOrListedBy {
//           id
//         }
//         creator {
//           id
//         }
//         mostRecentActiveAuction {
//           id
//           auctionId
//           duration
//           status
//           reservePriceInETH
//           seller {
//             id
//           }
//           dateEnding
//           dateStarted
//           dateCreated
//           transactionHashCreated
//           bids(orderBy: amountInETH, orderDirection: desc) {
//             amountInETH
//             status
//             datePlaced
//             bidder {
//               id
//             }
//           }
//           highestBid {
//             amountInETH
//             status
//             datePlaced
//             bidder {
//               id
//             }
//           }
//         }
//         nftHistory(orderBy: date, orderDirection: desc) {
//           id
//           event
//           date
//           marketplace
//           transactionHash
//           amountInETH
//           actorAccount {
//             id
//           }
//           nftRecipient {
//             id
//           }
//         }
//       }
//     }
//   `
//   const variables = {
//     addressPlusTokenId: addressPlusTokenId.toLowerCase(),
//   }
//   console.log(variables)
//   const { data } = await theGraphApolloClient.query({
//     query: ARTWORK_HISTORY_QUERY,
//     variables,
//   })
//   console.log('nft loaded >>>>>',data.nft)
//   return data.nft
// }


export const getArtworkHistory = async (addressPlusTokenId: string): Promise<ArtworkHistory> => {
  const ARTWORK_HISTORY_QUERY = gql`
    query getArtworkHistory($addressPlusTokenId: String!) {
      nft(id: $addressPlusTokenId) {
        id
        tokenId
        dateMinted
        ownedOrListedBy {
          id
        }
        creator {
          id
        }
        mostRecentActiveAuction {
          id
          auctionId
          duration
          status
          reservePriceInETH
          seller {
            id
          }
          dateEnding
          dateStarted
          dateCreated
          transactionHashCreated
          bids(orderBy: amountInETH, orderDirection: desc) {
            amountInETH
            status
            datePlaced
            bidder {
              id
            }
          }
          highestBid {
            amountInETH
            status
            datePlaced
            bidder {
              id
            }
          }
        }
        nftHistory(orderBy: date, orderDirection: desc) {
          id
          event
          date
          marketplace
          transactionHash
          amountInETH
          actorAccount {
            id
          }
          nftRecipient {
            id
          }
        }
      }
    }
  `
  const variables = {
    addressPlusTokenId: addressPlusTokenId.toLowerCase(),
  }
  const { data } = await theGraphApolloClient.query({
    query: ARTWORK_HISTORY_QUERY,
    variables,
  })
  return data.nft
}
