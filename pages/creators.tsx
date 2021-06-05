import { useState, useEffect } from 'react'
import { getCreator, getNFTS, Creator } from '../method/fetchJSON'

const Page = () => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [nfts_lists, setNFTS] = useState([])
  useEffect(()=>{
    getCreator(setCreators)
    getNFTS(setNFTS)
  },[])
  return <div className="md:p-20 p-4" style={{ background: 'url("image/bg_blur.jpg")'}}>
    <h1 className="text-center text-2xl ">Top Creator in Nifty</h1>
    <div className="text-center mb-12">
      <span className="text-xl font-bold">{nfts_lists.length} </span>
       Total NFT in mornitoring from
      <span className="text-xl font-bold"> {creators.length} </span>
       Top creators</div>
    <div className="grid lg:grid-cols-4 sm:grid-cols-3  grid-cols-1 gap-3">
    {
      creators.filter(c => c.total_drops > 1000).map(creator => <a target="_blank" href={creator.creator_nifty_url} className="bg-white shadow-lg px-2 rounded-m16 flex h-24 items-center">
        
          <img src={creator.creator_image} className="shadow-lg rounded-full h-12 w-12"/>
        
        <div className="flex-grow pl-3">
          <h1 className="text-sm">{creator.creator_name}</h1>
          <p className="text-xs">{creator.total_drops} drops</p>
        </div>
      </a>)
    }
  </div>

  </div>

}





export default Page
