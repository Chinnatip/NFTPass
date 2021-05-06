// import { nfts } from '../static/NFTLists'
import { useState, useEffect } from 'react'
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import { getCreator, getNFTS, Creator, shuffle, randomNFT, NFT } from '../method/fetchJSON'

const tagList = [
  'All','New Arrival','Pixel Art','2D','3D','Vector','Generative','Raster Painting','Photography','Collage','Algorithmic Art'
]

const Page = () => {
  const [ current, setCurrent ] = useState(0)
  const [creators, setCreators] = useState<Creator[]>([])
  const [nfts_lists, setNFTS] = useState<NFT[]>([])
  useEffect(()=>{
    getCreator(setCreators)
    getNFTS(setNFTS)
  },[])
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="md:w-4/5 w-full m-auto z-10">
      <Navbar current={0} />
      {/* container */}
      <div className="rounded-24 mb-20 md:px-5 px-2 py-8 border border-white shadow-nft" style={{background: 'rgba(185, 184, 184, 0.32)'}}>
        {/* search box */}
        <input className="hidden placeholder-gray block w-3/5 bg-white m-auto rounded-full h-10 px-5 font-thin appearance-none outline-none" placeholder="Press creator ID and see the magic!" />

        <div className="text-center p-4">
          <div className="py-1 bg-white rounded-full text-center px-1 shadow-nft hidden" >
            {tagList.map((tag,index) =>
              <button onClick={() => { setCurrent(index)}} className={`py-2 px-3 font-semibold text-sm focus:outline-none appearance-none rounded-full px-2 ${current == index ?  'bg-black text-white': 'text-black' }`}>{tag}</button>
            )}
          </div>
          <div className="flex flex-row py-1 px-1 rounded-full text-center" >
          <button className={`py-2 px-3 mr-2 font-sm bg-white text-sm focus:outline-none appearance-none rounded-full px-2  'bg-black text-white': 'text-black' }`}>All Creators</button>
              <button className={`py-2 px-3 mr-2 font-sm bg-white text-sm focus:outline-none appearance-none rounded-full px-2 items-center	flex 'bg-black text-white': 'text-black' }`}>
              <img className=" h-6 w-6 rounded-full border-1 border-white shadow-nft inline" src="image/beeple_profile.png" alt=""/> <span className="ml-2">[ Creator Name]</span></button>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
          {shuffle(randomNFT(nfts_lists, creators)).map((item: any) => (
            <Card src={item} nfts_lists={nfts_lists} creators={creators}/>
          ))}
        </div>
      </div>
    </div>
  </div>
}

export default Page
