import { VercelRequest, VercelResponse } from '@vercel/node'
import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import * as firebase from "../../method/firebase"
import axios from 'axios'

const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)
const RARIBLE_URL = 'http://api.rarible.com/protocol/v0.1'
const MORALIS_API_KEY = 'VWtW1wkC5OLqsZGORbuTMda1aaVUsqrl7AsukAV9diKSndpW14bcSjbgjT13FEkM'
const MORALIS_API = 'https://deep-index.moralis.io/api/v2'


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

const NFTOf = async (address: string, chain:string='eth'): Promise<Owned[]> => {
  const ownedString = '&format=decimal&order=name.DESC'
  const resp = await axios(`${MORALIS_API}/${address}/nft?chain=${chain}${ownedString}`,options)
  if(resp.status == 200){
    return resp.data.result
  }else{
    return []
  }
}

const NFTtransfer = async (address: string, chain:string='eth'): Promise<Transfer[]> => {
  const transferString = '&format=decimal&direction=both&order=token_address.DESC'
  const resp = await axios(`${MORALIS_API}/${address}/nft/transfers?chain=${chain}${transferString}`,options)
  if(resp.status == 200){
    return resp.data.result
  }else{
    return []
  }
}

const NFTCollection = async (address: string, chain:string='eth') => {
  const doc = await firebase.findbyAddress('collection', address)
  if(doc.exists){
    return doc.data()
  }else{
    const resp = await axios(`${MORALIS_API}/erc721/${address}/metadata?chain=${chain}`,options)
    if(resp.status == 200){
      const data = { 
        address, 
        tokenType: 'erc721', 
        collection: resp.data.symbol != "" ,
        ...resp.data }
      firebase.writeDocument('collection',address, data)
      return data
    }else{
      return []
    }
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

const ignoreNullTokenID = (lists: string[]): string[] => {
  let result : string[] = []
  lists.map(address => {
    const splits = address.split(':')
    if(splits[1] != ''){
      result.push(address)
    }
  })
  return result
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cors(req, res)
  if(req.method === 'GET'){
    const { address } = req.query
    if(address != undefined && typeof address === 'string'){
      let nfts : string[]
      const ownedResp = await NFTOf(address)
      const ownLists = [...new Set(ownedResp.map(o => `${o.token_address}:${o.token_id}`))]
      const transferResp = await NFTtransfer(address)
      const uniqueAddress = [...new Set([...ownLists, ...transferResp.map(o => `${o.token_address}:${o.token_id}`)])]
      const collection = await Promise.all(
        [...new Set( uniqueAddress.map(u => u.split(':')[0]) )]
          .map( async address => await NFTCollection(address))
      )
      nfts = ignoreNullTokenID(uniqueAddress)
      console.log(`${ownLists.length} : ${transferResp.length} >>> ${uniqueAddress.length}`)
      console.log(nfts.length)
      res.status(200).json({
        nfts,
        ownLists,
        collection})
    }else{
      res.json({ message: 'Missing query' })
    }
  }else{
    res.json({ message: 'Some error occurred!' })
  }
}
