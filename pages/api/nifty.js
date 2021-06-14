import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import { ownByAddress } from '../../method/nifty/fetch'
// .

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const slug = req.query.nifty_slug
    const response = await ownByAddress(slug)
    res.status(200).json(response)
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}
