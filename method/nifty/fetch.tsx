import axios from 'axios'
import { NiftyResp, Nifties, NiftyGetResponse , Drop } from './interface'
import { Galleryst } from '../../interfaces/index'

const NIFTY_URL = 'https://api.niftygateway.com/'

const constructNifty = (nftLists: Nifties[]) : Galleryst[] => {
  return nftLists.map(item => {
    const {
      image_preview_url,
      name , tokenId , contractAddress , sell_order
    } = item
    // item.asset_contract
    return {
      name: name,
      id: `${contractAddress}:${tokenId}`,
      priceETH: sell_order.currently_on_sale ? 1 : undefined,
      priceUSD: sell_order.currently_on_sale ? 1 : undefined,
      imagePreview: image_preview_url,
    }
  })
}

export const construct = () : NiftyGetResponse => {
  return {
    owned: [],
    onsale: [],
    allID: [],
    drops: [],
    items: [],
  }
}

export const fetchOwnBySlug = async (nifty_slug: string) : Promise<NiftyGetResponse> => {
  const niftyResp = await axios.get(`https://www.galleryst.co/api/nifty?nifty_slug=${nifty_slug}`)
  const nifty : NiftyResp = niftyResp.data
  const { userProfileAndNifties } = nifty
  const { nifties, stores, ...creatorInfo } = userProfileAndNifties
  let drops : Drop[] = []
  stores.map(collection => {
    collection.nifties.map(nifty => drops.push({
      address:  `${nifty.contractObj.contractAddress}:${nifty.contractObj.contractId}`,
      collectionName: collection.storeName,
      title: nifty.niftyTitle,
      description: nifty.niftyDescription,
      image: nifty.niftyImageURL,
      type: nifty.niftyType,
      edition: nifty.niftyTotalNumOfEditions,
      sold: nifty.niftyTotalSold
    }))
  })
  return {
    creator: creatorInfo,
    owned: nifties.map(nifty => `${nifty.contractAddress}:${nifty.tokenId}`),
    onsale: nifties.filter(nifty => nifty.sell_order.currently_on_sale == true).map(nifty => `${nifty.contractAddress}:${nifty.tokenId}`),
    allID: nifties.map(nifty => `${nifty.contractAddress}:${nifty.tokenId}`),
    drops,
    items: constructNifty(nifties)
    // created: createdLists,
  }
}

export const ownByAddress = async(slug: string|false) => {
  if( slug == false ) return []
  const parse_url = `${NIFTY_URL}/user/profile-and-offchain-nifties-by-url/?profile_url=${slug}`
  const resp = await axios.get(parse_url)
  return resp.data
}
