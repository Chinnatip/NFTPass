import Cors from 'cors'
import axios from 'axios'
import { priceHistory } from '../../../method/opensea/graph'
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
      "query": priceHistory,
      "id":"EventHistoryQuery",
      "variables":{
          "archetype":{
              "assetContractAddress": address,
              "tokenId": token_id
          },
          "eventTypes":["AUCTION_SUCCESSFUL","ASSET_TRANSFER"],
          "count":10,
          "showAll":false
      },
    })
    const response = await axios.post(parse_url, parcel, {
      headers: {
        'x-api-key': '2f6f419a083c46de9d83ce3dbe7db601',
        'x-build-id': '7uNU3d0X-cJsnsg8jvrhm',
        'Content-Type': 'application/json'
      }
    })
    if(response.status == 200){
      const history = response.data.data.assetEvents.edges
      const result = history.map((edge) => {
        const { node: {
          eventTimestamp,
          price,
          seller, fromAccount,
          winnerAccount, toAccount,
        } } = edge
        if(price != undefined && seller!= undefined && winnerAccount ){
          // Successfull Auction
          const { quantity, asset: {  decimals, symbol } } = price
          return {
            date: eventTimestamp,
            price:  parseInt(quantity) / 10**decimals,
            value: 1,
            symbol,
            previous_owner: { address: seller.address, image: seller.imageUrl, user: seller.user },
            current_owner: { address: winnerAccount.address, image: winnerAccount.imageUrl, user: winnerAccount.user },
            type: 'order'
           }
        }else{
          // Transfer
          return {
            date: eventTimestamp,
            value: 1,
            type: 'transfer',
            previous_owner: { address: fromAccount.address, image: fromAccount.imageUrl, user: fromAccount.user },
            current_owner: { address: toAccount.address, image: toAccount.imageUrl, user: toAccount.user },
           }
        }
      })
      res.status(200).json(result)
    }else{
      res.status(500).json({ message: 'Some error occurred' })
    }
  }else{
    res.json({ message: 'Hello Everyone!' })
  }
}

