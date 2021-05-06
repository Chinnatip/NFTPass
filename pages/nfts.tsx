import { useState, useEffect } from 'react'
import { getCreator, getNFTS, Creator, randomNFT, NFT } from '../method/fetchJSON'

const Page = () => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [nfts_lists, setNFTS] = useState<NFT[]>([])
  useEffect(()=>{
    getCreator(setCreators)
    getNFTS(setNFTS)
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
      randomNFT(nfts_lists, creators).map((nft: any) => <div>
        <img src={nft?.image?.thumbnail} alt=""/>
        <div>{nft?.name}</div>
      </div>)
    }
  </div>

  </div>

}





export default Page
