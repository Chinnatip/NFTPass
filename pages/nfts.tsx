import { useState, useEffect } from 'react'

type NFT = {
  token_id: string
  address: string
  permalink: string
  oa_collection_slug: string
  nifty_creatir_url: string
  name: string
  description: string
  create_date: string
  schema_name: string
  symbol: string
  supply: string
  image: {
    original: string
    preview: string
    thumbnail: string
  },
  collection: {
    name: string
    image: string
  },
  owner: {
    user: {
      username: string
    },
    profile_img_url: string
    address: string
    config: string
    discord_id: string
  },
  investment: {
    num_sales: number
    sell_orders: any
    top_bid: any
    traits: any[]
    transfer_fee: any
    transfer_fee_payment_token: any
  }
}


type Collection = {
  storeURL: string
  storeName: string
  project_cover_photo_url: string
  contractAddress: string
  drops_amount: number
  opensea_slug: string
}

type Creator = {
  creator_name: string
  creator_url: string
  creator_nifty_url: string
  creator_image: string
  collections: Collection[]
  total_drops: number
  opensea_slug: string[]
}

const Page = () => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [nfts_lists, setNFTS] = useState<NFT[]>([])
  const getCreator=()=>{
    fetch('https://koh-assets.s3-ap-southeast-1.amazonaws.com/galleryst/creator_df.json'
    ,{ headers : { 'Content-Type': 'application/json', 'Accept': 'application/json'}})
    .then((response) => { return response.json() })
    .then((data: any) => { setCreators(data)})
  }
  const getNFTS=()=>{
    fetch('static/opensea_asset.json'
    ,{ headers : { 'Content-Type': 'application/json', 'Accept': 'application/json'}})
    .then((response) => { return response.json() })
    .then((data: any) => { setNFTS(data)})
  }
  useEffect(()=>{
    getCreator()
    getNFTS()
  },[])
  return <div className="p-20">
    <h1 className="text-center text-2xl ">Top Creator in Nifty</h1>
    <div className="text-center mb-12">
      <span className="text-xl font-bold">{nfts_lists.length} </span>
       Total NFT in mornitoring from
      <span className="text-xl font-bold"> {creators.length} </span>
       Top creators</div>
    <div className="grid grid-cols-4 gap-3">
    {
      nfts_lists.map(nft => <div>
        <img src={nft.image.thumbnail} alt=""/>
        <div>{nft.name}</div>
      </div>)
    }
  </div>

  </div>

}





export default Page
