import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { FOUNDATION_GQL_URI, THE_GRAPH_GQL_URI } from './static'

const foundationApolloClient = new ApolloClient({
  uri: FOUNDATION_GQL_URI,
  cache: new InMemoryCache(),
})

const theGraphApolloClient = new ApolloClient({
  uri: THE_GRAPH_GQL_URI,
  cache: new InMemoryCache(),
})

export const usersInfo = async (publicKeys: string[]) => {
  const USER_QUERY = gql`
    query hasuraUsersByIds(
      $publicKeys: [String!]!
      $moderationStatuses: [user_moderationstatus_enum!]
    ) {
      users: user(
        where: {
          publicKey: { _in: $publicKeys }
          moderationStatus: { _in: $moderationStatuses }
        }
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
  return foundationApolloClient.query({ query: USER_QUERY, variables })
}

export const hasuraArtworks = async (tokenIds: number[]) => {
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
        mintTxHash
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
  return foundationApolloClient.query({ query: ARTWORK_QUERY, variables })
}

export const userFollowers = async (
  publicKey: string,
  currentUserPublicKey = '',
  limit = 5,
  offset = 0
) => {
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
          follows(
            where: {
              user: { _eq: $currentUserPublicKey }
              isFollowing: { _eq: true }
            }
          ) {
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
  return foundationApolloClient.query({ query: FOLLOWER_QUERY, variables })
}

export const userFollowState = async (
  publicKey: string,
  currentUserPublicKey = ''
) => {
  const FOLLOW_STATE_QUERY = gql`
    query getHasuraUserFollowState(
      $currentUserPublicKey: String!
      $publicKey: String!
    ) {
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
                follows: {
                  user: { _eq: $currentUserPublicKey }
                  isFollowing: { _eq: true }
                }
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
  return foundationApolloClient.query({ query: FOLLOW_STATE_QUERY, variables })
}

export const userOwnedArtworks = async (
  publicKey: string,
  limit = 48,
  offset = 0
) => {
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
  return theGraphApolloClient.query({ query: OWNED_ARTWORK_QUERY, variables })
}

export const userMintedArtworks = async (
  publicKey: string,
  limit = 48,
  offset = 0
) => {
  const MINTED_ARTWORK_QUERY = gql`
    query getMintedArtworks($publicKey: String!, $limit: Int!, $offset: Int!) {
      artworks: nfts(
        where: {
          creator: $publicKey
          owner_not: "0x0000000000000000000000000000000000000000"
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
  return theGraphApolloClient.query({ query: MINTED_ARTWORK_QUERY, variables })
}

export const userProfileCollectors = async (publicKey: string) => {
  const PROFILE_COLLECTOR_QUERY = gql`
    query ProfileCollectorsQuery($publicKey: String!, $timeStampNow: Int!) {
      account(id: $publicKey) {
        id
        nftMarketAuctions(
          where: { status_not: Canceled, dateEnding_lt: $timeStampNow }
        ) {
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
  return theGraphApolloClient.query({
    query: PROFILE_COLLECTOR_QUERY,
    variables,
  })
}

export const userArtworksPresence = async (publicKey: string) => {
  const ARTWORK_PRESENCE_QUERY = gql`
    query getArtworksPresence($publicKey: String!) {
      artworksMinted: nfts(
        where: {
          creator: $publicKey
          owner_not: "0x0000000000000000000000000000000000000000"
        }
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

export const trendingArtworks = async (limit = 48) => {
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
  return theGraphApolloClient.query({ query: TRENDING_QUERY, variables })
}
