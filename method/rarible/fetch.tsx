import axios from 'axios'
import { RaribleNFTFull } from './interface'
import { RARIBLE_PREFIX } from './static'
import { Galleryst } from '../../interfaces/index'

export const userInfo = async (address: string) => {
  const resp = await axios.get(`/api/rarible/profile?address=${address}`)
  return resp
}

export const userMeta = async (address: string) => await axios.get(`/api/rarible/meta?address=${address}`)

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
  const resp = await axios.get(`/api/rarible/nfts?address=${address}`)
  const { owned, onsale, created } = resp.data
  const allID = [...new Set([...owned, ...onsale, ...created])]
  action.setOwnLists(owned)
  action.setOnsaleLists(onsale)
  action.setCreatedLists(created)

  return { onsale, created, owned, allID }
}

export const getAllNFTS = async (rari: string[]) => {
  const raribleResp = await axios.post(`/api/rarible/nfts`, {
    lists: rari
  }) // await collectNFTS(rari)
  return raribleResp.data != undefined ? constructRarible(raribleResp.data) : []
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
