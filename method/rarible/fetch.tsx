import axios from 'axios'
import { RARIBLE_PREFIX } from './static'
import { Galleryst, Activity, User, NFTDetail, ResponseDetail } from '../../interfaces/index'
import { RaribleNFTFull, RaribleOffer  } from './interface'
import { raribleImg } from './method'

export const userInfo = async (address: string) => {
  const resp = await axios.get(`/api/rarible/profile?address=${address}`)
  return resp
}

export const userMeta = async (address: string) => await axios.get(`/api/rarible/meta?address=${address}`)

export const getOfferandActivity = async(address: string, setRarible: any, detail: NFTDetail) => {
  const splitAddress = address.split(':')
  const contact_address = splitAddress[0]
  const token_id = splitAddress[1]
  const offer : RaribleOffer = await getBestOffer([address])
  const activity : Activity[] = await getNFTactivity(contact_address, token_id)
  if(offer != undefined && activity != []){
    setRarible({ ...detail, offer, activity });
  }
}

export const nftDetail = async (address: string, defaultAction?: (data: any) => void, action?: (data: any) => void): Promise<ResponseDetail> => {
  try {
    const nfts: RaribleNFTFull  = await collectNFTS([address])
    defaultAction?.(nfts)
    const offer : RaribleOffer = await getBestOffer([address])
    const stringAddress = address.split(':')
    const useAddress = stringAddress[0]
    const token_id = stringAddress[1]
    const activities: Activity[] = await getNFTactivity(nfts.item?.token, nfts.item?.tokenId)
    if(nfts != undefined) {
      let lists : string[] = []
      activities.map(({owner, from}) => {
        lists.push(owner)
        if (from != undefined) { lists.push(from) }
      })

      lists = [...new Set([...lists, nfts.item.creator, ...nfts.item.owners])]
      const profileResp = await collectPROFILE(lists)
      const userLists = profileResp.data.map((user: any) => {
        const { id: address, name, description, shortUrl, image  } = user
        return {
          address, name, description, shortUrl,
          image: raribleImg(image)
        }
      })
      const data = {
        address,
        image: nfts.properties?.imageBig,
        title: nfts.properties?.name,
        description: nfts.properties?.description,
        owner: userLists.filter((user: User) => nfts.item.owners.indexOf(user.address) != -1),
        creator: userLists.find((user: User) => user.address == nfts.item.creator),
        pricing: {
          status: nfts.item?.ownership?.status,
          eth: nfts.item?.ownership?.priceEth,
        },
        offer,
        activity: activities.map(act => {
          const { owner, date, value, price, from } = act
          return {
            type: act['@type'], date, value, price,
            current_owner:  userLists.find((user: User) => user.address == owner),
            previous_owner: userLists.find((user: User) => user.address == from)
          }
        })
      }
      defaultAction?.(data)
      action?.(data)
      return {
        status: true,
        link: `https://rarible.com/token/${useAddress}:${token_id}?tab=owners`,
        data
      }
    } else {
      return { status: false }
    }
  } catch {
    return { status: false }
  }
}

export const collectNFTS = async (lists: string[]) : Promise<RaribleNFTFull> => {
  const resp = await axios({
    method: 'post',
    url: `${RARIBLE_PREFIX}items/map`,
    headers: { 'Content-Type': 'application/json'},
    data : JSON.stringify(lists)
  })
  return resp.data[0]
}

export const collectPROFILE = async (lists: string[]) => axios({
  method: 'post',
  url: `${RARIBLE_PREFIX}profiles/list`,
  headers: { 'Content-Type': 'application/json'},
  data : JSON.stringify(lists)
})

export const getBestOffer = async (lists: string[]) : Promise<{
  status: boolean,
  best_offer: number | undefined
}> => {
  const resp = await axios({
    method: 'post',
    url: `${RARIBLE_PREFIX}items/bestOffers`,
    headers: { 'Content-Type': 'application/json'},
    data : JSON.stringify(lists)
  })
  return {
    status: resp.data.length > 0,
    best_offer: resp.data.length > 0 ? resp.data[0]?.buyPriceEth : undefined
  }
}

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

export const getNFTactivity = async (token : string, token_id : string) : Promise<Activity[]> => {
  try{
    const response = await axios.post(`${RARIBLE_PREFIX}activity`, {
      types:["BID","BURN","BUY","CANCEL","CANCEL_BID","ORDER","MINT","TRANSFER","SALE"],
      filter:{
          "@type":"by_item",
          address:token,
          tokenId:token_id
      },
      size:1000
    })
    if(response.status == 200){
      return response.data
    }else{
      console.log(response)
      return []
    }
  }catch(e){
    console.log(e)
    return []
  }

}
