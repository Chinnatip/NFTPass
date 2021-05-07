export interface Sale {
  symbol: string
  total_price: string
  decimals: number
  usd_price: string
}

export interface NFT  {
  token_id: string
  address: string
  permalink: string
  oa_collection_slug: string
  nifty_creator_url: string
  name: string
  description: string
  create_date: string
  creator_name?: string
  creator_image?: string
  image: {
    original: string
    preview: string
    thumbnail: string
  },
  owner: {
    name: string
    image_url: string
  }
  num_sales: number
  last_sale: Sale
}


export interface Collection {
  storeURL: string
  storeName: string
  project_cover_photo_url: string
  contractAddress: string
  drops_amount: number
  opensea_slug: string
}

export interface Creator {
  creator_name: string
  creator_url: string
  creator_nifty_url: string
  creator_image: string
  collections: Collection[]
  total_drops: number
  opensea_slug: string[]
}


export const getCreator=(action: any)=>{
  fetch('https://koh-assets.s3-ap-southeast-1.amazonaws.com/galleryst/creator_df.json'
  ,{ headers : { 'Content-Type': 'application/json', 'Accept': 'application/json'}})
  .then((response) => { return response.json() })
  .then((data: any) => { action(data)})
}

export const loadCreator=(action: any, slug: string)=>{
  fetch('https://koh-assets.s3-ap-southeast-1.amazonaws.com/galleryst/creator_df.json'
  ,{ headers : { 'Content-Type': 'application/json', 'Accept': 'application/json'}})
  .then((response) => { return response.json() })
  .then((data: any) => {  action(data.find((item: any) => item.creator_url == slug))  })
}

export const getNFTS=(action: any)=>{
  fetch('https://koh-assets.s3-ap-southeast-1.amazonaws.com/galleryst/opensea_asset.json'
  ,{ headers : { 'Content-Type': 'application/json', 'Accept': 'application/json'}})
  .then((response) => { return response.json() })
  .then((data: any) => { action( data )})
}

export const randomNFT = ( lists: NFT[], creators: Creator[] ) => {
  const result = creators.map(creat => {
    const filterNFT = lists.filter(item => item.nifty_creator_url == creat.creator_url).map(item => {
      return {
        ...item,
        creator_name: creat.creator_name,
        creator_image: creat.creator_image
      }
    })
    const randomDigit =  Math.floor(Math.random() * (filterNFT.length - 1)) + 0
    return filterNFT[randomDigit]
  })
  return result?.filter(r => r != undefined)
}

export const profileNFT = ( lists: NFT[], creator: Creator | undefined) => {
  return lists.filter(item => item.nifty_creator_url == creator?.creator_url).map(item => {
    return {
      ...item,
      creator_name: creator?.creator_name,
      creator_image: creator?.creator_image
    }
  })
}

export const shuffle = (array: any) => {
  if(array != undefined) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }else{
    return []
  }
}

export const priceCal = (last_sale: Sale | undefined) => {
  if(last_sale != undefined){
    const price = parseInt(last_sale.total_price) / 10**last_sale.decimals
    return price > 0.99 ? price : price.toFixed(2)
  }else{
    return 0
  }
}

export const usdPriceCal = (last_sale: Sale | undefined) => {
  if(last_sale != undefined){
    const price = parseInt(last_sale.total_price) / 10**last_sale.decimals
    return (price * parseInt(last_sale.usd_price)).toFixed(2)
  }else{
    return 0
  }
}
