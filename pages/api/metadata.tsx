import { VercelRequest, VercelResponse } from '@vercel/node'
import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import axios from 'axios'

const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)
const RARIBLE_URL = 'http://api.rarible.com/protocol/v0.1'
const MORALIS_URL = 'https://deep-index.moralis.io/api/v2/'
const MORALIS_API_KEY = 'VWtW1wkC5OLqsZGORbuTMda1aaVUsqrl7AsukAV9diKSndpW14bcSjbgjT13FEkM'

// Attribute schema
type Attribute = {
  key: string
  value: string
}

// NFT Metadata schema
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

const NFTMetadata = async(token: string): Promise<NFTMetadata|undefined> => {
  const metaResp = await axios(`${RARIBLE_URL}/ethereum/nft/items/${token}/meta`)
  // const resp = await axios(`${RARIBLE_URL}/ethereum/nft/items/${token}`)
  const split = token.split(':')
  const options = { headers: {  'X-API-Key': MORALIS_API_KEY }}
  const resp = await axios(`${MORALIS_URL}nft/${split[0]}/${split[1]}/transfers?chain=eth&format=decimal`, options)
  const findCreator = (nft: any) => {
    if (  nft.from_address == '0x0000000000000000000000000000000000000000'){
      return nft.to_address
    }else{
      return nft.from_address
    }
  }
  if(resp.status == 200 && metaResp.status == 200){
    const firstSync = resp.data.result[resp.data.result.length-1]
    return { ...metaResp.data,
      creators: findCreator(firstSync),
      supply: firstSync.amount != undefined ? parseInt(firstSync.amount) : 1,
      syncDate: firstSync.block_timestamp
    }
  }else{
    return undefined
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await cors(req, res)
  if(req.method === 'GET'){
    const { address } = req.query
    if(address != undefined && typeof address === 'string'){
      // let result: NFTMetadata[] = []
      const resp = await NFTMetadata(address)
      if(resp != undefined){
        res.status(200).json(resp)
      }else{
        res.json({ message: 'Cannot find metadata' })
      }
    }else{
      res.json({ message: 'Missing query' })
    }
  }else{
    res.json({ message: 'Some error occurred!' })
  }
}
