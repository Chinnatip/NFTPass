import { useState, useEffect } from 'react'
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import { getCreator, getNFTS, Creator, shuffle, randomNFT, profileNFT, NFT } from '../method/fetchJSON'

// const tagList = [
//   'All','New Arrival','Pixel Art','2D','3D','Vector','Generative','Raster Painting','Photography','Collage','Algorithmic Art'
// ]

const Page = () => {
  const [ current, setCurrent ] = useState('all')
  const [creators, setCreators] = useState<Creator[]>([])
  const [nfts_lists, setNFTS] = useState<NFT[]>([])
  useEffect(()=>{
    getCreator(setCreators)
    getNFTS(setNFTS)
  },[])
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="md:w-4/5 w-full m-auto z-10">
      <Navbar current={0} />
      <div
        className="bg-transparent m-auto md:px-24 p-4 pt-8 pb-12 text-5xl text-white text-center font-serif"
        style={{ letterSpacing: '0.04rem', textShadow: '0 0 40px #884d4d52', opacity: '90%' }}>
        Discover Your Dearest Crypto Art Pieces
      </div>
      {/* container */}
      <div className="rounded-24 mb-20 md:px-5 px-2 py-4 border border-white shadow-nft" style={{background: 'rgba(185, 184, 184, 0.32)'}}>
        {/* search box */}
        <input className="hidden placeholder-gray block w-3/5 bg-white m-auto rounded-full h-10 px-5 font-thin appearance-none outline-none" placeholder="Press creator ID and see the magic!" />
        <div className="text-center p-4">
          {/* <div className="py-1 bg-white rounded-full text-center px-1 shadow-nft hidden" >
            {tagList.map((tag,index) =>
              <button onClick={() => { setCurrent(index)}} className={`py-2 px-3 font-semibold text-sm focus:outline-none appearance-none rounded-full px-2 ${current == index ?  'bg-black text-white': 'text-black' }`}>{tag}</button>
            )}
          </div> */}
          <div className="flex p-1 rounded-full" >
            <button onClick={() => setCurrent('all')} className={`h-10 w-1/6 py-2 px-3 mr-2 font-sm text-sm focus:outline-none appearance-none rounded-full px-2  ${ current == 'all' ? 'bg-black text-white' : 'bg-white text-black'}`}>All Creators</button>
            <div className="overflow-x-auto overflow-y-hidden rounded-r-full w-5/6 " style={{whiteSpace: 'nowrap'}}>
              { creators.map(creat => {
                return <button onClick={() => setCurrent(creat.creator_url)} className={`inline p-2 mr-2 font-sm text-sm rounded-full items-center ${current == creat.creator_url ? 'bg-black text-white' : 'bg-white'}`}>
                  <img className=" h-6 rounded-full border-1 border-white shadow-nft inline" src={creat.creator_image} alt=""/>
                  <span className="ml-2">{creat.creator_name?.substr(0,4)}...</span>
                </button>
              })}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
          {current == 'all' ? shuffle(randomNFT(nfts_lists, creators)).map((item: NFT) => {
            const creator = creators.find(creat => creat.creator_url == item.nifty_creator_url)
            const parse : any = creator
            return <Card src={item} nfts_lists={nfts_lists} creator={parse}/>
          }) : profileNFT(nfts_lists, creators.find(creat => creat.creator_url == current)).map((item,index) => {
            const creator = creators.find(creat => creat.creator_url == current)
            return <div className="rounded-16 shadow-nft mb-8" key={index}>
              <Card src={item} nfts_lists={nfts_lists} creator={creator}/>
          </div>
          } )}
        </div>
      </div>
    </div>
  </div>
}

export default Page
