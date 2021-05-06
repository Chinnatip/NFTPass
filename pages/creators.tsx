import { useState, useEffect } from 'react'

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
  const [nfts_lists, setNFTS] = useState([])
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
      creators.filter(c => c.total_drops > 1000).map(creator => <div className="shadow-lg px-2 rounded-md flex h-24 items-center">
        <a target="_blank" href={creator.creator_nifty_url}>
          <img src={creator.creator_image} className="shadow-lg rounded-full h-12 w-12"/>
        </a>
        <div className="flex-grow pl-3">
          <h1 className="text-sm">{creator.creator_name}</h1>
          <p className="text-xs">{creator.total_drops} drops</p>
        </div>
      </div>)
    }
  </div>

  </div>

}





export default Page
