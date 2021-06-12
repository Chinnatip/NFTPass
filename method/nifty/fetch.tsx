import axios from 'axios'
import { NiftyResp } from './interface'
// import { Galleryst } from '../../interfaces/index'

const NIFTY_URL = 'https://api.niftygateway.com/'

// const constructOpensea = (nftLists: OpenseaItem[]) : Galleryst[] => {
//   return nftLists.map(item => {
//     const {image_thumbnail_url , name , token_id , asset_contract: {address} , sell_orders  } = item
//     // item.asset_contract
//     return {
//       name: name,
//       id: `${address}:${token_id}`,
//       priceETH: sell_orders != undefined ? osPriceCal(sell_orders[0]).base : undefined,
//       priceUSD: sell_orders != undefined ? osPriceCal(sell_orders[0]).usd : undefined,
//       imagePreview: image_thumbnail_url,
//     }
//   })
// }

export const creatorDetailAndWorks = async (nifty_slug: string | false) => {
  if (nifty_slug == false) return {}
  const niftyResp = await axios.get(`http://localhost:3000/api/nifty?nifty_slug=${nifty_slug}`)
  const nifty : NiftyResp = niftyResp.data
  const { userProfileAndNifties } = nifty
  const { nifties, stores, ...creatorInfo } = userProfileAndNifties
  let createdLists : string[] = []
  stores.map(collection => {
    collection.nifties.map(nifty => createdLists.push( nifty.contractObj.contractAddress ))
  })
  return {
    creator: creatorInfo,
    owned: nifties.map(nifty => `${nifty.contractAddress}:${nifty.tokenId}`),
    onsale: nifties.filter(nifty => nifty.sell_order.currently_on_sale == true).map(nifty => `${nifty.contractAddress}:${nifty.tokenId}`),
    created: createdLists,
    drops: stores.map(collection => {
      return {
        name: collection.storeName,
        image: collection.project_icon,
        amount: collection.nifties.length
      }
    })
  }
}

export const ownByAddress = async(slug: string|false) => {
  if( slug == false ) return []
  const parse_url = `${NIFTY_URL}/user/profile-and-offchain-nifties-by-url/?profile_url=${slug}`
  const resp = await axios.get(parse_url)
  return resp.data
}
