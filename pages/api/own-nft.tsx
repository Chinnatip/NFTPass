import { VercelRequest, VercelResponse } from '@vercel/node'
import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import axios from 'axios'

const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)
const RARIBLE_URL = 'http://api.rarible.com/protocol/v0.1'
const MORALIS_API_KEY = 'VWtW1wkC5OLqsZGORbuTMda1aaVUsqrl7AsukAV9diKSndpW14bcSjbgjT13FEkM'
const MORALIS_API = 'https://deep-index.moralis.io/api/v2'
// const CHAIN = 'eth'

type Attribute = {
  key: string
  value: string
}

type OpenseaMetadata = {
  description: string
  external_url: string
  image: string
  name: string
}

type RaribleMetadata = {
  name: string
  token: string
  token_address: string
  token_id: string
  description?: string
  attributes?: Attribute[],
  image: {
    url: {
      ORIGINAL: string
      BIG: string
      PREVIEW: string
    },
    meta: {
      PREVIEW: {
        type: string
        width: number
        height: number
      }
    }
  }
  animation?: {
    url: {
      ORIGINAL: string
    },
    meta: {
      ORIGINAL: {
          type: string
      }
    }
  }
}

type Owned = {
  chain?: string
  token_address: string
  token_id: string
  amount: string
  owner_of: string
  block_number: string
  block_number_minted: string
  contract_type: string
  token_uri?: string
  metadata?: string | OpenseaMetadata
  synced_at?: string
  name: string
  symbol: string
}

// type Transfer = {
//   token_address: string
//   token_id: string
//   from_address: string
//   to_address: string
//   amount: string
//   contract_type: string
//   block_number: string
//   block_timestamp: string
//   block_hash: string
//   transaction_hash: string
//   transaction_type: string
//   transaction_index: number
//   log_index: number
// }

// type TransferVerbose = {
//   transaction_hash: string
//   address: string
//   block_timestamp: string
//   block_number: string
//   block_hash: string
//   to_address: string
//   from_address: string
//   token_id: string[]
//   amounts: string[]
//   contract_type: string
// }

const options = { headers: {  'X-API-Key': MORALIS_API_KEY }}

const NFTOf = async (address: string, chain:string ): Promise<Owned[]> => {
  const ownedString = '&format=decimal&order=name.DESC'
  const resp = await axios(`${MORALIS_API}/${address}/nft?chain=${chain}${ownedString}`,options)
  if(resp.status == 200){
    return resp.data.result
  }else{
    return []
  }
}

// const NFTtransfer = async (address: string, chain:string='eth'): Promise<Transfer[]> => {
//   const transferString = '&format=decimal&direction=both&order=token_address.DESC'
//   const resp = await axios(`${MORALIS_API}/${address}/nft/transfers?chain=${chain}${transferString}`,options)
//   if(resp.status == 200){
//     return resp.data.result
//   }else{
//     return []
//   }
// }

// const NFTtransferVerbose = async (address: string, chain:string='eth'): Promise<TransferVerbose[]> => {
//   const resp = await axios(`${MORALIS_API}/${address}/nft/transfers/verbose?chain=${chain}`,options)
//   if(resp.status == 200){
//     return resp.data.result
//   }else{
//     return []
//   }
// }

const parse = (ownedResp: Owned[], chain: string): Owned[] => {
  const uniqueToken: string[] = [...new Set(ownedResp.map(o => `${o.token_address}:${o.token_id}`))]
  let result : Owned[] = []
  uniqueToken.map(u => {
    const o : Owned | undefined = ownedResp.find((o) => `${o.token_address}:${o.token_id}` === u)
    console.log(o)
    if(o != undefined){
      result.push({
        ...o,
        chain,
        metadata: typeof o.metadata == 'string' ? JSON.parse(o.metadata) : undefined,
      })
    }
  })
  console.log(result)
  return result
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cors(req, res)
  if(req.method === 'GET'){
    const { address, chain } = req.query
    // const fetchAll = ft != undefined
    const useChain = typeof chain == 'string' ? chain : 'eth'
    if(address != undefined && typeof address === 'string'){
      const ownedResp = await NFTOf(address, useChain)
      res.status(200).json({
        ownLists: [...new Set(ownedResp.map(o => `${o.token_address}:${o.token_id}`))],
        nfts: parse(ownedResp, useChain)
      })
    }else{
      res.json({ message: 'Missing query' })
    }
  }else{
    res.json({ message: 'Some error occurred!' })
  }
}
