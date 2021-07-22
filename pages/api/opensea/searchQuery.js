import Cors from 'cors'
import axios from 'axios'
import { queryFinder } from '../../../method/opensea/graph'
import initMiddleware from '../../../method/middleware'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const address = req.query.address
    const parse_url = `https://api.opensea.io/graphql/`
    const parcel = JSON.stringify({
      id: "NavSearchQuery",
      variables:{
        query: address
      },
      query: queryFinder
    })
    const response = await axios.post(parse_url, parcel, { headers: { 'Content-Type': 'application/json' }})
    let result
    if(response.status == 200){
      const accountLists = response.data.data.accounts.edges
      if( accountLists.length > 0 ){
        const { chain: { identifier }, imageUrl, user: { publicUsername }} = accountLists[0].node
        result = {
          status:  true,
          pic:   imageUrl,
          username: publicUsername,
          address: address,
          description: '',
          chain:   identifier
        }
      }else{
        result = { status: false }
      }
      res.status(200).json(result)
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}

