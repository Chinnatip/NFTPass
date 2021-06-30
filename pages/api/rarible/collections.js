import Cors from 'cors'
import axios from 'axios'
import initMiddleware from '../../../method/middleware'
import { RARIBLE_PREFIX } from '../../../method/rarible/static'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'POST'){
    const { collections } = req.body
    const response = await axios({
      method: 'post',
      url: `${RARIBLE_PREFIX}profiles/list`,
      headers: { 'Content-Type': 'application/json'},
      data : JSON.stringify(collections)
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
