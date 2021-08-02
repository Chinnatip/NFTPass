import Cors from 'cors'
import initMiddleware from '../../method/middleware'
import * as firebase from "../../method/firebase"

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({ methods: ['GET', 'POST', 'OPTIONS'], })
)

export default async function handler(req: any, res: any){
  await cors(req, res)
  if(req.method === 'GET'){
    const resp = await firebase.getAllUser()
    // res.status(200).json(resp)
    res.status(200).json(resp.map(r => {
      const { profile: { verified , name, shortUrl, address, pic }} = r
      return { verified , name, shortUrl, address, pic }
    }))
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}
