import axios from 'axios'
import { RaribleNFT } from './interface'
import { RARIBLE_PREFIX } from './static'

export const userInfo = async (address: string) => await axios.get(`${RARIBLE_PREFIX}users/${address}`)

export const userMeta = async (address: string) => await axios.get(`${RARIBLE_PREFIX}profiles/${address}/meta`)

export const ownershipBy = async (address: string) => await axios.post(`${RARIBLE_PREFIX}ownerships/simple`, {
  "size":1000,
  "filter":{
      "@type":"by_owner",
      "address": address,
      "incoming":true,
      "inStockOnly":false,
      "hideOnly":false
  }
})

export const onsaleBy = async (address: string) => await axios.post(`${RARIBLE_PREFIX}ownerships/simple`, {
  "size":1000,
  "filter":{
    "@type":"by_owner",
    "address": address,
    "incoming":true,
    "inStockOnly":true,
    "hideOnly":false
  }
})

export const createdBy = async (address: string) => await axios.post(`${RARIBLE_PREFIX}items`, {
  "size":1000,
  "filter":{
    "@type":"by_creator",
    "creator": address
  }
})

export const collectNFTS = async (lists: string[]) => axios({
  method: 'post',
  url: `${RARIBLE_PREFIX}items/map`,
  headers: { 'Content-Type': 'application/json'},
  data : JSON.stringify(lists)
})

export const collectPROFILE = async (lists: string[]) => axios({
  method: 'post',
  url: `${RARIBLE_PREFIX}profiles/list`,
  headers: { 'Content-Type': 'application/json'},
  data : JSON.stringify(lists)
})

export const getBestOffer = async (lists: string[]) => axios({
  method: 'post',
  url: `${RARIBLE_PREFIX}items/bestOffers`,
  headers: { 'Content-Type': 'application/json'},
  data : JSON.stringify(lists)
})

export const collectBy = async (address: string, type: string, action: any ) => {
  let response
  switch (type) {
    case 'ownership':
      response = await ownershipBy(address)
      break;
    case 'onsale':
      response = await onsaleBy(address)
      break;
    case 'created':
      response = await createdBy(address)
      break;
    default:
      response = undefined
  }
  const responseData : RaribleNFT[]  = response?.data != undefined ? response.data : []
  const unique : string[] = [...new Set( responseData.map(item => `${item.token}:${item.tokenId}`))]
  action(unique)
  return unique
}

export const getNFTactivity = async (token : string, token_id : string) => await axios.post(`${RARIBLE_PREFIX}activity`, {
  types:["BID","BURN","BUY","CANCEL","CANCEL_BID","ORDER","MINT","TRANSFER","SALE"],
  filter:{
      "@type":"by_item",
      address:token,
      tokenId:token_id
  },
  size:1000
})
