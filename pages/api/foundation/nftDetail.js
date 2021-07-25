import Cors from 'cors'
import axios from 'axios'
import initMiddleware from '../../../method/middleware'
import { beasrOfferQuery } from '../../../method/opensea/graph'
import { getNftDetail } from '../../../method/foundation/fetch'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    try{
      const response = await getNftDetail(req.query.address)
      res.status(200).json(response)
    }catch(e){
      res.status(500).json({status: false})
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}

