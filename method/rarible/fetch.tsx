import axios from 'axios'
import { RaribleNFT, RaribleNFTFull } from './interface'
import { RARIBLE_PREFIX } from './static'
import { Galleryst } from '../../interfaces/index'

export const userInfo = async (address: string) => {
  const resp = await axios.get(`${RARIBLE_PREFIX}users/${address}`)
  console.log(resp.status)
  return resp
}

export const userMeta = async (address: string) => await axios.get(`${RARIBLE_PREFIX}profiles/${address}/meta`)

const itemID = (items : RaribleNFT[]) => items.map(item => `${item.token}:${item.tokenId}`)

const extractID = (resp : { data: RaribleNFT[] | undefined }) => {
  return resp.data != undefined ? itemID(resp.data) : []
}

export const ownershipBy = async (address: string): Promise<string[]> => {
  const resp = await axios.post(`${RARIBLE_PREFIX}ownerships/simple`, {
    "size":100,
    "filter":{
        "@type":"by_owner",
        "address": address,
        "incoming":true,
        "inStockOnly":false,
        "hideOnly":false
    }
  })
  return extractID(resp)
}

export const onsaleBy = async (address: string): Promise<string[]> => {
  const resp = await axios.post(`${RARIBLE_PREFIX}ownerships/simple`, {
    "size":100,
    "filter":{
      "@type":"by_owner",
      "address": address,
      "incoming":true,
      "inStockOnly":true,
      "hideOnly":false
    }
  })
  return extractID(resp)
}

export const createdBy = async (address: string): Promise<string[]> => {
  const resp = await axios.post(`${RARIBLE_PREFIX}items`, {
    "size":100,
    "filter":{
      "@type":"by_creator",
      "creator": address
    }
  })
  return extractID(resp)
}

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

const constructRarible = (nftLists: RaribleNFTFull[]) : Galleryst[] => {
  return nftLists.map(item => {
    const { item: { id , ownership, likes } , properties } = item
    return {
      name: properties.name,
      id:  id,
      likes: likes,
      priceETH: ownership?.priceEth,
      imagePreview: properties?.imagePreview,
    }
  })
}

export const ownByAddress = async(address: string, action: {
  setOwnLists: any,
  setOnsaleLists: any,
  setCreatedLists: any,
}) => {
  const owned = await ownershipBy(address)
  const onsale = await onsaleBy(address)
  const created = await createdBy(address)
  const allID = [...new Set([...owned, ...onsale, ...created])]

  action.setOwnLists(owned)
  action.setOnsaleLists(onsale)
  action.setCreatedLists(created)

  return { onsale, created, owned, allID }
}

export const getAllNFTS = async (rari: string[]) => {
  const raribleResp = await collectNFTS(rari)
  return raribleResp.data != undefined ? constructRarible(raribleResp.data) : []
}

// export const collectBy = async (address: string, type: string) => {
//   let response
//   switch (type) {
//     case 'ownership':
//       response = await ownershipBy(address)
//       break;
//     case 'onsale':
//       response = await onsaleBy(address)
//       break;
//     case 'created':
//       response = await createdBy(address)
//       break;
//     default:
//       response = undefined
//   }
//   const responseData : RaribleNFT[]  = response?.data != undefined ? response.data : []
//   const unique : string[] = [...new Set( responseData.map(item => `${item.token}:${item.tokenId}`))]
//   return unique
// }

export const getNFTactivity = async (token : string, token_id : string) => await axios.post(`${RARIBLE_PREFIX}activity`, {
  types:["BID","BURN","BUY","CANCEL","CANCEL_BID","ORDER","MINT","TRANSFER","SALE"],
  filter:{
      "@type":"by_item",
      address:token,
      tokenId:token_id
  },
  size:1000
})
