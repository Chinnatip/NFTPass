import Cors from 'cors'
import axios from 'axios'
import { beasrOfferQuery } from '../../../method/opensea/graph'
import initMiddleware from '../../../method/middleware'

// Initialize the cors middleware
const cors = initMiddleware( Cors({ methods: ['GET', 'POST', 'OPTIONS'], }))

export default async function handler(req, res) {
  await cors(req, res)
  if(req.method === 'GET'){
    const stringAddress = req.query.address.split(':')
    const address = stringAddress[0]
    const token_id = stringAddress[1]
    const parse_url = `https://api.opensea.io/graphql/`
    const parcel = JSON.stringify({
      "id":"OrdersQuery",
      "query": beasrOfferQuery,
      "variables":{
          "count":10,
          "isExpired":false,
          "isValid":true,
          "makerAssetIsPayment":true,
          "takerArchetype":{
              "assetContractAddress": address,
              "tokenId": token_id,
              "chain":"ETHEREUM"
          },
          "sortBy":"MAKER_ASSETS_USD_PRICE"
      }
    })
    const response = await axios.post(parse_url, parcel, {
      headers: {
        'x-api-key': '2f6f419a083c46de9d83ce3dbe7db601',
        'x-build-id': '7uNU3d0X-cJsnsg8jvrhm',
        'Content-Type': 'application/json',
        'Cookie': 'csrftoken=4PJ8epNu3qtuNic4V1W10YROyRwHEiSCXZ4bqHmftpznw2qcL8v1GZI3TxSLq0di'
      }
    })
    if(response.status == 200){
      const offerResp = response.data.data.orders.edges
      if(offerResp.length > 0){
        const offers =  offerResp.map((assetX) => {
          const { asset, quantity } = assetX?.node?.makerAssetBundle?.assetQuantities?.edges[0].node
          const { decimals, symbol,usdSpotPrice } = asset
          return {
            amount: parseInt(quantity) / 10**decimals ,
            quantity,
            decimals,symbol,usdSpotPrice
          }
        })
        res.status(200).json({
          status: true,
          best_offer: offers[0].amount,
          offers
        })
      }else{
        res.status(200).json({
          status: false
        })
      }
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}

