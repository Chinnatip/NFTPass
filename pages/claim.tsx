// import Card from "../components/Card"
import Navbar from "../components/Navbar"
// import { useState } from 'react'
import { nfts } from '../static/NFTLists'
// import { artistProfile } from '../static/Artist'
// import { ProfileCard, ProfileStat } from '../components/Profile'
import Carousel from '../components/Carousel'

// const charactorList = ['Creations','Owned','Saved']

const Page = () => {
  // const [ current, setCurrent ] = useState(0)
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
      <div className="md:w-4/5 w-full m-auto z-10">
        <Navbar current={1} />
        {/* container */}
        <div className="rounded-24 border border-white shadow-nft mt-20" style={{background: 'rgba(185, 184, 184, 0.32)'}}>
          <div className="bg-white pb-8" style={{borderRadius: '24px 24px 0px 0px'}}>
          <div className="text-center">
      <img
        src="image/empty_logo.png"
        className="inline-block h-20 w-20 border-4 border-white shadow-nft rounded-full -mt-12"
        alt="Profile Image"/>
    </div>
    <div className="m-auto text-center mt-3">
      <div className="mb-4 text-3xl font-semibold">
       Your NFT Porfolio
        <img src="image/verify_logo.png" className="inline h-6 ml-2 -mt-1 hidden"/>
      </div>
      <div className="flex flex-row justify-center">
      <div className="text-sm shadow-nft rounded-full bg-transparent inline p-2 px-4 font-thin ">
        <span>

          #S4T05hi...N4kaM0tO
        </span>

      </div>

      </div>
    </div>

            {/* Creator's Profile Tabs */}

        </div>
<div className="relative flex flex-col w-full h-60 md:px-24 md:py-8 p-4">
  <div className="flex flex-col m-auto w-full">
  <form className="m-auto md:w-2/4 w-full">
    <label className="text-lg	text-white">Email</label>
    <input className="h-6 w-full mb-6 rounded-full p-6" placeholder="Your Email Address"></input>
    <label className="text-lg	text-white">ID Address</label>
    <input className="h-6 w-full mb-6 rounded-full p-6" placeholder="Your Opensea ID Address"></input>
    <label className="text-lg	text-white">Opensea Profile URL (optional)</label>
    <input className="h-6 w-full mb-6 rounded-full p-6" placeholder="Your Opensea ID Address"></input>
    <label className="text-lg	text-white">Rarible Profile URL (optional)</label>
    <input className="h-6 w-full mb-6 rounded-full p-6" placeholder="Your Opensea ID Address"></input>
    <button className=" w-full bg-black text-white rounded-full p-4">Get Early Access</button>
  </form>
  </div>
  <div className="flex flex-row justify-center mt-8">
    <div>
      Follow Us on <a href="https://twitter.com/gallerystco" target="_blank">Twitter</a>
    </div>
  </div>
</div>
        {/* Tab Contents */}
        <div
          className="hidden h-auto flex justify-end flex-col items-center md:px-10 px-2 pb-16"
          style={{ background: '#d2cdcd26'}}>
          <div className="flex justify-center flex-col w-full">
            <div className="text-center text-white text-xl mt-6 mb-3">
              Current Bidding
            </div>
            <div className="w-full">
              <Carousel nfts={nfts}></Carousel>
            </div>
            <div className="text-center hidden">
              <a className="text-xl underline text-gray-400 font-thin" href="/">See more</a>
            </div>
            <div className="h-8"/>
          </div>

          {/* Contents Section */}
          <div className="flex flex-row mb-6">
            {[...new Set(nfts.map(item => item.provider)) ].map((item, index) => {
              return <button className={`${index > 0 && 'ml-3'} bg-white shadow-nft rounded-full h-10 inline-flex px-1 pr-3 items-center`}>
                <img src={`image/${item}_icon.png`} className="h-8  inline mr-2"/> {item}
              </button>
            })}
          </div>
          {/* <p className="text-lg mt-10 hidden">Works</p> */}
          {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:p-4 p-0 w-full">
            {nfts.map((item) => (
              <Card src={item}/>
            ))}
          </div> */}
        </div>
      </div>
      <div className="h-10"/>
    </div>
  </div>
}

export default Page
