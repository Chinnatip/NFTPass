import axios from 'axios'
import { OpenseaItem, SaleOrder } from './interface'
import { Galleryst } from '../../interfaces/index'

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

export const nftDetail = async(address: string) => {
  const splitAddress = address.split(':')
  const contact_address = splitAddress[0]
  const token_id = splitAddress[1]
  return await axios.get(`${OPENSEA_URL}?token_ids=${token_id}&asset_contract_address=${contact_address}&order_direction=desc&offset=0&limit=20`)
}
