import Cors from 'cors'
import axios from 'axios'
import initMiddleware from '../../../method/middleware'
import { RARIBLE_PREFIX } from '../../../method/rarible/static'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const token = req.query.token
    const token_id = req.query.token_id
    const response = await axios.post(`${RARIBLE_PREFIX}activity`, {
      types:["BID","BURN","BUY","CANCEL","CANCEL_BID","ORDER","MINT","TRANSFER","SALE"],
      filter:{
          "@type":"by_item",
          address:token,
          tokenId:token_id
      },
      size:1000
    })
    if(response.status == 200){
      res.status(200).json(response.data)
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}
