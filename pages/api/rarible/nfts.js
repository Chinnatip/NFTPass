import Cors from 'cors'
import axios from 'axios'
import { RARIBLE_PREFIX } from '../../../method/rarible/static'
import initMiddleware from '../../../method/middleware'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

const itemID = (items) => items.map(item => `${item.token}:${item.tokenId}`)

const extractID = (resp) => {
  return resp.data != undefined ? itemID(resp.data) : []
}

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const address = req.query.address
    const createdResponse = await axios.post(`${RARIBLE_PREFIX}items`, {
      "size":100,
      "filter":{
        "@type":"by_creator",
        "creator": address
      }
    })
    const onsaleResponse = await axios.post(`${RARIBLE_PREFIX}ownerships/simple`, {
      "size":100,
      "filter":{
        "@type":"by_owner",
        "address": address,
        "incoming":true,
        "inStockOnly":true,
        "hideOnly":false
      }
    })
    const ownershipResponse = await axios.post(`${RARIBLE_PREFIX}ownerships/simple`, {
      "size":100,
      "filter":{
          "@type":"by_owner",
          "address": address,
          "incoming":true,
          "inStockOnly":false,
          "hideOnly":false
      }
    })
    if(createdResponse.status == 200 && onsaleResponse.status == 200 && ownershipResponse.status == 200){
      res.status(200).json({
        created: extractID(createdResponse),
        onsale: extractID(onsaleResponse),
        owned: extractID(ownershipResponse)
      })
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else if(req.method === 'POST'){
    const { lists } = req.body
    const response = await axios({
      method: 'post',
      url: `${RARIBLE_PREFIX}items/map`,
      headers: { 'Content-Type': 'application/json'},
      data : JSON.stringify(lists)
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
