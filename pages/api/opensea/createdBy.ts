import { ApolloClient, InMemoryCache } from '@apollo/client'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { ACCOUNT_QUERY, ASSET_SEARCH_QUERY } from 'method/opensea/queries'
import { extractDataFromEdges } from 'method/opensea/utils'
import { accountQueryVariables, assetSearchVariables } from 'method/opensea/variables'
import { sleep } from 'utils'

const apolloClient = new ApolloClient({
  uri: 'https://api.opensea.io/graphql/',
  cache: new InMemoryCache(),
})

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  switch (req.method) {
    case 'POST': {
      const { username } = req.body
      let { cursor } = req.body
      let endCursor = ''
      let edges: any[] = []
      let hasNextPage: boolean = true
      while (hasNextPage) {
        if (!cursor) {
          const response = await apolloClient.query({
            query: ACCOUNT_QUERY,
            variables: accountQueryVariables(username),
          })
          edges = response.data.created.search.edges || []
          cursor = response.data.created.search.pageInfo.endCursor
          hasNextPage = response.data.created.search.pageInfo.hasNextPage
        } else {
          const response = await apolloClient.query({
            query: ASSET_SEARCH_QUERY,
            variables: assetSearchVariables(cursor, username),
          })
          edges = [...edges, ...(response.data.query.search.edges || [])]
          cursor = response.data.query.search.pageInfo.endCursor
          hasNextPage = response.data.query.search.pageInfo.hasNextPage
        }
        await sleep(1000)
      }
      res.status(200).send({
        assets: extractDataFromEdges(edges),
        endCursor,
        hasNextPage,
        totalCount: edges.length,
      })
      break
    }
    default: {
      res.status(404).send('Not found')
    }
  }
}
