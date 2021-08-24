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
const CHAIN = 'eth'

type Attribute = {
  key: string
  value: string
}

type NFTMetadata = {
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
  "token_address": string
  "token_id": string
  "amount": string
  "owner_of": string
  "block_number": string
  "block_number_minted": string
  "contract_type": string
  "token_uri"?: string
  "metadata"?: string
  "synced_at"?: string
  "name": string
  "symbol": string
}

type Transfer = {
  token_address: string
  token_id: string
  from_address: string
  to_address: string
  amount: string
  contract_type: string
  block_number: string
  block_timestamp: string
  block_hash: string
  transaction_hash: string
  transaction_type: string
  transaction_index: number
  log_index: number
}

type TransferVerbose = {
  transaction_hash: string
  address: string
  block_timestamp: string
  block_number: string
  block_hash: string
  to_address: string
  from_address: string
  token_id: string[]
  amounts: string[]
  contract_type: string
}

const options = { headers: {  'X-API-Key': MORALIS_API_KEY }}

const NFTOf = async (address: string): Promise<Owned[]> => {
  const ownedString = '&format=decimal&order=name.DESC'
  const resp = await axios(`${MORALIS_API}/${address}/nft?chain=${CHAIN}${ownedString}`,options)
  if(resp.status == 200){
    return resp.data.result
  }else{
    return []
  }
}

const NFTtransfer = async (address: string): Promise<Transfer[]> => {
  const transferString = '&format=decimal&direction=both&order=token_address.DESC'
  const resp = await axios(`${MORALIS_API}/${address}/nft/transfers?chain=${CHAIN}${transferString}`,options)
  if(resp.status == 200){
    return resp.data.result
  }else{
    return []
  }
}

const NFTtransferVerbose = async (address: string): Promise<TransferVerbose[]> => {
  const resp = await axios(`${MORALIS_API}/${address}/nft/transfers/verbose?chain=${CHAIN}`,options)
  if(resp.status == 200){
    return resp.data.result
  }else{
    return []
  }
}

const NFTMetadata = async(token: string): Promise<NFTMetadata|undefined> => {
  const resp = await axios(`${RARIBLE_URL}/ethereum/nft/items/${token}/meta`)
  if(resp.status == 200){
    return resp.data
  }else{
    return undefined
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cors(req, res)
  if(req.method === 'GET'){
    const { address, ft } = req.query
    const fetchAll = ft != undefined
    if(address != undefined && typeof address === 'string'){
      // let result: NFTMetadata[] = []
      let collectNFT : string[]
      const ownedResp = await NFTOf(address)
      const ownLists = [...new Set(ownedResp.map(o => `${o.token_address}:${o.token_id}`))]
      if(fetchAll){
        const transferResp = await NFTtransfer(address)
        const transferVerbResp = await NFTtransferVerbose(address)
        collectNFT = [...new Set([...ownLists, ...transferResp.map(o => `${o.token_address}:${o.token_id}`), ...transferVerbResp.map(o => `${o.address}:${o.token_id}`)])]
      }else{
        collectNFT = ownLists
      }
      res.status(200).json({
        ownLists,
        collectNFT
      })


    }else{
      res.json({ message: 'Missing query' })
    }
  }else{
    res.json({ message: 'Some error occurred!' })
  }
}
