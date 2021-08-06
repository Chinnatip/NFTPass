import axios from 'axios'
import { OpenseaItem, SaleOrder } from './interface'
import { Galleryst, NFTDetail, ResponseDetail } from '../../interfaces/index'
import { formatEther, parseEther } from 'ethers/lib/utils'
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
    const {image_thumbnail_url , name , token_id , asset_contract: {address} , sell_orders, display_image_url, image_url, animation_url } = item
    const lastSale = item.asset_event_data?.last_sale?.unit_price_quantity
    return {
      name: name,
      id: `${address}:${token_id}`,
      priceETH: sell_orders != undefined ? osPriceCal(sell_orders[0]).base : +formatEther(lastSale?.quantity || 0) || undefined,
      priceUSD: sell_orders != undefined ? osPriceCal(sell_orders[0]).usd : lastSale?.asset?.usd_spot_price || undefined,
      imagePreview: image_thumbnail_url || display_image_url || image_url,
    }
  })
}

export const userInfo = async(contact_address: string) => {
  const resp = await axios.get(`/api/opensea/searchQuery?address=${contact_address}`)
  if(resp.status ==200 && resp.data.status == true){
    return resp.data
  }else{
    return undefined
  }
}

const getPriceHistory = async(contact_address: string, token_id: string) => {
  const resp = await axios.get(`/api/opensea/tradeHistory?address=${contact_address}:${token_id}`)
  // console.log(resp.data)
  if(resp.status ==200){
    return resp.data
  }else{
    return undefined
  }
}

const getBestOffer = async(contact_address: string, token_id: string) => {
  const resp = await axios.get(`/api/opensea/offer?address=${contact_address}:${token_id}`)
  // console.log(resp.data)
  if(resp.status ==200){
    return resp.data
  }else{
    return undefined
  }
}

export const ownByAddress = async(address: string) => {
  const limitSize = 50
  const parse_url = `${OPENSEA_URL}?owner=${address}&order_direction=desc&offset=0&limit=${limitSize}`
  const resp = await axios.get(parse_url)
  let items : OpenseaItem[] = resp.data.assets
  const user = await userInfo(address)
  const createdByResponse = await axios.post('/api/opensea/createdBy', { username: user.username })
  const createdItems: any[] = createdByResponse.data.assets
    .map((asset: any) => ({ 
      ...asset,
      id: `${asset.asset_contract.address}:${asset.token_id}`
    }))
  items = [...items, ...createdItems]
  return {
    onsale: items.filter(({ sell_orders }) => sell_orders != undefined ).map(item => `${item.asset_contract.address}:${item.token_id}`) ,
    created: createdItems.map(item => `${item.asset_contract.address}:${item.token_id}`) ,
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
    const findOwner = activity[0]
    const findCreator = activity[activity.length-1].previous_owner.address !== "0x0000000000000000000000000000000000000000" ? activity[activity.length-1]['previous_owner'] : activity[activity.length-1]['current_owner']
    const data : NFTDetail = {
      address,
      image: os.image_url,
      video: os.animation_url,
      title: os.name,
      description: os.description,
      owner: [{
        address: findOwner?.current_owner?.address ,
        name: findOwner?.current_owner?.user?.publicUsername ,
        image: findOwner?.current_owner?.image
      }],
      creator: {
        address: findCreator?.address ,
        name: findCreator?.user?.publicUsername ,
        image: findCreator?.image
      },
      pricing,
      offer,
      activity
    }
    // console.log(data)
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
