import Cors from 'cors'
import axios from 'axios'
import { RARIBLE_PREFIX } from '../../../method/rarible/static'
import { raribleImg, raribleCover } from '../../../method/rarible/method'
import initMiddleware from '../../../method/middleware'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const address = req.query.address
    const response = await axios.get(`${RARIBLE_PREFIX}profiles/${address}/meta`)
    if(response.status == 200){
      res.status(200).json(response.data)
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}
