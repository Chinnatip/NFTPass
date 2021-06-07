import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import * as Apollo from '@apollo/client'

const theGraphApolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GQL_GPH,
  cache: new InMemoryCache(),
})

const defaultOptions = {
  client: theGraphApolloClient,
}

type ArtworkHistoryVariables = {
  addressPlusToken: string
}
export function useArtworkHistoryQuery(baseOptions?: {
  variables: ArtworkHistoryVariables
}) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery(
    gql`
      query getArtworksHistory($addressPlusToken: String!) {
        nft(id: $addressPlusToken) {
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
    `,
    options
  )
}

type MintedArtworksVariables = {
  publicKey: string
  limit?: number
  offset?: number
}
export function useMintedArtworksQuery(baseOptions?: {
  variables: MintedArtworksVariables
}) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery(
    gql`
      query getMintedArtworks(
        $publicKey: String!
        $limit: Int = 48
        $offset: Int = 0
      ) {
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
    `,
    options
  )
}

type OwnedArtworksVariables = {
  publicKey: string
  limit?: number
  offset?: number
}
export function useOwnedArtworksQuery(baseOptions?: {
  variables: OwnedArtworksVariables
}) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery(
    gql`
      query getOwnedArtworks(
        $publicKey: String!
        $limit: Int = 48
        $offset: Int = 0
      ) {
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
    `,
    options
  )
}
