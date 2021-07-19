import axios from 'axios'
import { OpenseaItem, SaleOrder } from './interface'
import { Galleryst, NFTDetail, ResponseDetail } from '../../interfaces/index'
const OPENSEA_URL = 'https://api.opensea.io/api/v1/assets'

const osPriceCal = (sell_order : SaleOrder) => {
  const { current_price , payment_token_contract: { decimals, usd_price } } = sell_order
  const parsePrice : number = parseInt( current_price)  / (10 ** decimals)
  return  {
    base: parsePrice,
    usd: parsePrice * parseFloat(usd_price)
  }
}

const constructOpensea = (nftLists: OpenseaItem[]) : Galleryst[] => {
  return nftLists.map(item => {
    const {image_thumbnail_url , name , token_id , asset_contract: {address} , sell_orders  } = item
    // item.asset_contract
    return {
      name: name,
      id: `${address}:${token_id}`,
      priceETH: sell_orders != undefined ? osPriceCal(sell_orders[0]).base : undefined,
      priceUSD: sell_orders != undefined ? osPriceCal(sell_orders[0]).usd : undefined,
      imagePreview: image_thumbnail_url,
    }
  })
}

const getPriceHistory = async(contact_address: string, token_id: string) => {
  const resp = await axios.get(`/api/opensea/tradeHistory?address=${contact_address}:${token_id}`)
  console.log(resp.data)
  if(resp.status ==200){
    return resp.data
  }else{
    return undefined
  }
}

const getBestOffer = async(contact_address: string, token_id: string) => {
  const resp = await axios.get(`/api/opensea/offer?address=${contact_address}:${token_id}`)
  console.log(resp.data)
  if(resp.status ==200){
    return resp.data
  }else{
    return undefined
  }
}

export const ownByAddress = async(address: string) => {
  const parse_url = `${OPENSEA_URL}?owner=${address}&order_direction=desc&offset=0&limit=100`
  const resp = await axios.get(parse_url)
  const items : OpenseaItem[] = resp.data.assets
  const created = items
    .filter(({creator}) => {
      if(creator != null){
        return creator.address == address
      }else{
        return false
      }})
    .map(item => `${item.asset_contract.address}:${item.token_id}`)
  // console.log(created)
  return {
    onsale: items.filter(({ sell_orders }) => sell_orders != undefined ).map(item => `${item.asset_contract.address}:${item.token_id}`) ,
    created ,
    owned: items.map(item => `${item.asset_contract.address}:${item.token_id}`),
    allID: items.map(item => `${item.asset_contract.address}:${item.token_id}`),
    items: constructOpensea(items)
  }
}

export const getOfferandActivity = async(address: string, setOpensea: any, detail: NFTDetail) => {
  const splitAddress = address.split(':')
  const contact_address = splitAddress[0]
  const token_id = splitAddress[1]
  let activity = undefined
  let offer = undefined
  try{ offer = await getBestOffer(contact_address, token_id) }catch(e){
    console.log('get error while catch offer')
  }
  try{ activity = await getPriceHistory(contact_address, token_id) }catch(e){
    console.log('get error while catch history')
  }
  if(offer != undefined && activity != undefined){
    setOpensea({ ...detail, offer, activity });
  }
}

export const nftDetail = async(address: string, defaultAction?: (data: any) => void, action?: (data: any) => void): Promise<ResponseDetail> => {
  const splitAddress = address.split(':')
  const contact_address = splitAddress[0]
  const token_id = splitAddress[1]
  const resp = await axios.get(`${OPENSEA_URL}?token_ids=${token_id}&asset_contract_address=${contact_address}&order_direction=desc&offset=0&limit=20`)
  if(resp.data['assets'].length > 0){
    let activity = undefined
    let offer = undefined
    const os : OpenseaItem = resp.data['assets'][0]
    const pricing = os.sell_orders != undefined  && os.sell_orders.length > 0 ? {
      status: true,
      eth: parseFloat(os.sell_orders[0]?.base_price) / 10**os.sell_orders[0]?.payment_token_contract.decimals,
      usd: parseFloat(os.sell_orders[0]?.payment_token_contract.usd_price) * parseFloat(os.sell_orders[0]?.base_price) / 10**os.sell_orders[0]?.payment_token_contract.decimals
    } : undefined
    try{ offer = await getBestOffer(contact_address, token_id) }catch(e){
      console.log('get error while catch offer')
    }
    try{ activity = await getPriceHistory(contact_address, token_id) }catch(e){
      console.log('get error while catch history')
    }
    const data : NFTDetail = {
      address,
      image: os.image_original_url,
      title: os.name,
      description: os.description,
      owner: [{
        address: os.owner?.address,
        name: os.owner?.user?.username,
        image: os.owner?.profile_img_url
      }],
      creator: {
        address: os.creator?.address,
        name: os.creator?.user?.username,
        image: os.creator?.profile_img_url
      },
      pricing,
      offer,
      activity
    }
    // console.log(returner)
    defaultAction?.(data)
    action?.(data)
    return {
      status: true,
      link: `https://opensea.io/assets/${contact_address}/${token_id}`,
      data
    }
  }else{
    return { status: false }
  }
}
