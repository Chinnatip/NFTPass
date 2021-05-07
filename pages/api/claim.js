import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import * as Sheet from '../../method/sheet'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'POST'){
    const response = await Sheet.createOrder(req.body)
    res.status(200).json(response)
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}
