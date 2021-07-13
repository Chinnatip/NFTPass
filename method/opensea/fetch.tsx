import axios from 'axios'
import { OpenseaItem, SaleOrder } from './interface'
import { Galleryst } from '../../interfaces/index'
import { beasrOfferQuery, priceHistory } from './graph'
import { NFTDetail } from '../../interfaces/index'

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
  const parse_url = `https://api.opensea.io/graphql/`
  const parcel = JSON.stringify({
    "query": priceHistory,
    "id":"EventHistoryQuery",
    "variables":{
        "archetype":{
            "assetContractAddress": contact_address,
            "tokenId": token_id
        },
        "eventTypes":["AUCTION_SUCCESSFUL","ASSET_TRANSFER"],
        "count":10,
        "showAll":false
    },
  })
  const resp = await axios.post(parse_url, parcel, {
    headers: {
      'x-api-key': '2f6f419a083c46de9d83ce3dbe7db601',
      'x-build-id': '7uNU3d0X-cJsnsg8jvrhm',
      'Content-Type': 'application/json'
    }
  })
  console.log(resp.data)
  const priceResp = resp.data.data.assetEvents.edges.map((edge: any) => {
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
  console.log(priceResp)
  return priceResp

}

const getBestOffer = async(contact_address: string, token_id: string) => {
  const parse_url = `https://api.opensea.io/graphql/`
  const parcel = JSON.stringify({
    "id":"OrdersQuery",
    "query": beasrOfferQuery,
    "variables":{
        "count":10,
        "isExpired":false,
        "isValid":true,
        "makerAssetIsPayment":true,
        "takerArchetype":{
            "assetContractAddress": contact_address,
            "tokenId": token_id,
            "chain":"ETHEREUM"
        },
        "sortBy":"MAKER_ASSETS_USD_PRICE"
    }
  })
  const resp = await axios.post(parse_url, parcel, {
    headers: {
      'x-api-key': '2f6f419a083c46de9d83ce3dbe7db601',
      'x-build-id': '7uNU3d0X-cJsnsg8jvrhm',
      'Content-Type': 'application/json',
      'Cookie': 'csrftoken=4PJ8epNu3qtuNic4V1W10YROyRwHEiSCXZ4bqHmftpznw2qcL8v1GZI3TxSLq0di'
    }
  })
  try{
    const offerResp = resp.data.data.orders.edges
    if(offerResp.length > 0){
      const offers =  resp.data.data.orders.edges.map((assetX: any) => {
        const { asset, quantity } = assetX?.node?.makerAssetBundle?.assetQuantities?.edges[0].node
        const { decimals, symbol,usdSpotPrice } = asset
        return {
          amount: parseInt(quantity) / 10**decimals ,
          quantity,
          decimals,symbol,usdSpotPrice
        }
      })
      return {
        status: true,
        best_offer: offers[0].amount,
        offers
      }
    }else{
      return undefined
    }
  }catch(e){
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

interface Detail {
  status: boolean
  data?: NFTDetail | undefined
}

export const nftDetail = async(address: string, defaultAction: any, action: any): Promise<Detail> => {
  const splitAddress = address.split(':')
  const contact_address = splitAddress[0]
  const token_id = splitAddress[1]
  const resp = await axios.get(`${OPENSEA_URL}?token_ids=${token_id}&asset_contract_address=${contact_address}&order_direction=desc&offset=0&limit=20`)
  if(resp.data['assets'].length > 0){
    const os : OpenseaItem = resp.data['assets'][0]
    const pricing = os.sell_orders != undefined  && os.sell_orders.length > 0 ? {
      status: true,
      eth: parseFloat(os.sell_orders[0]?.base_price) / 10**os.sell_orders[0]?.payment_token_contract.decimals,
      usd: parseFloat(os.sell_orders[0]?.payment_token_contract.usd_price) * parseFloat(os.sell_orders[0]?.base_price) / 10**os.sell_orders[0]?.payment_token_contract.decimals
    } : undefined
    const offer = await getBestOffer(contact_address, token_id)
    const activity = await getPriceHistory(contact_address, token_id)
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
    defaultAction(data)
    action(data)
    return { status: true, data }
  }else{
    return { status: false }
  }
}
