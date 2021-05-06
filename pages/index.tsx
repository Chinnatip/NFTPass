import { nfts } from '../static/NFTLists'
import { useState } from 'react'
import Card from "../components/Card"
import Navbar from "../components/Navbar"

const tagList = [
  'All','New Arrival','Pixel Art','2D','3D','Vector','Generative','Raster Painting','Photography','Collage','Algorithmic Art'
]

const Page = () => {
  const [ current, setCurrent ] = useState(0)
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="md:w-4/5 w-full m-auto z-10">
      <Navbar current={0} />
      {/* container */}
      <div className="rounded-24 mb-20 md:px-5 px-2 py-4 border border-white shadow-nft" style={{background: 'rgba(185, 184, 184, 0.32)'}}>
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
        
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:p-4 p-0 w-full">
          {[...nfts, ...nfts].map((item) => (
            <Card src={item}/>
          ))}
        </div>
      </div>
    </div>
  </div>
}

export default Page
