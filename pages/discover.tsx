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
    <div className="w-4/5 m-auto z-10">
      <Navbar current={0} />
      {/* container */}
      <div className="rounded-24 mb-20 px-12 py-16 border border-white shadow-nft" style={{background: '#ffffff8c'}}>
        {/* search box */}
        <input className="block w-3/5 bg-white m-auto rounded-full h-10 px-5 font-thin appearance-none outline-none" placeholder="Press creator ID and see the magic!" />
        <div className="h-8"></div>
        <div className="text-center">
          <div className="py-1 inline-block  bg-white rounded-full text-center px-1 shadow-nft" >
            {tagList.map((tag,index) =>
              <button onClick={() => setCurrent(index)} className={`py-2 px-3 text-xs focus:outline-none appearance-none rounded-full px-2 ${current == index ?  'bg-black text-white': 'text-black' }`}>{tag}</button>
            )}
          </div>
        </div>
        <div className="h-8"></div>
        <div className="masonry py-4">
          {[...nfts, ...nfts].map((item,index) => (
            <div className="rounded-16 shadow-nft mb-8" key={index}>
              <Card src={item}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}

export default Page
