import { VercelRequest, VercelResponse } from '@vercel/node'
import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import axios from 'axios'

const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)
const RARIBLE_URL = 'http://api.rarible.com/protocol/v0.1'

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
