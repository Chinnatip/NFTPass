import { useState, useEffect } from 'react'
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import { getCreator, getNFTS, Creator, shuffle, randomNFT, profileNFT, NFT } from '../method/fetchJSON'
import { ConnectBtn } from '@/Galleryst'
import { NextSeo } from 'next-seo';

const Page = () => {
  const [current, setCurrent] = useState('all')
  const [creators, setCreators] = useState<Creator[]>([])
  const [nfts_lists, setNFTS] = useState<NFT[]>([])
  const seo = {
    image: 'https:// www.galleryst.co/image/OG_galleryst.png',
    title: 'Galleryst',
    description: 'Display All Your NFTs in One Place. Connect Your Wallet To See The Magic.'

  }
  useEffect(() => {
    getCreator(setCreators)
    getNFTS(setNFTS)
  }, [])
  return <div className="w-screen h-screen pt-0 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <NextSeo
      title={seo.title}
      description={seo.description}
      canonical="https://www.canonical.ie/"
      openGraph={{
        site_name: seo.title,
        url: `https://www.galleryst.co`,
        title: seo.title,
        description: seo.description,
        images: [{ url: seo.image, alt: seo.title, width: 1200, height: 600 }]
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <div className="md:w-4/5 w-full m-auto z-10">
      <Navbar current={0} />
      <div
        className="bg-transparent m-auto md:px-24 p-4 pt-8 pb-8 md:text-5xl text-3xl text-white text-center"
        style={{ letterSpacing: '0.04rem', textShadow: '0 0 40px #884d4d52', opacity: '90%' }}>
        Display All Your NFTs in One Click. Connect Your Wallet To See the Magic.
      </div>
      {/* search-box */}
      {/* <div className="text-center">
        <div className="bg-white h-12 rounded-full inline-flex items-center">
          <input type="text" style={{width: '24rem'}} className="px-2 bg-white ml-4 rounded-full" placeholder="paste address or nft to see info..." />
          <button style={{ background: '#9a6b6b' }} className=" flex items-center justify-center rounded-full p-4 ml-4 text-white h-12 " onClick={() => alert('searching >>>> ')}>Search</button>
        </div>
      </div> */}

      <div className=" m-auto centered-connectbtn p-2 rounded-full">
        <ConnectBtn />
      </div>
      {/* Steps Container */}
      <div className="md:grid-cols-3 grid-cols-1 md:gap-4 md:p-0 p-4 mt-8 gap-2 grid mb-8">
        <div className="bg-white rounded-16 flex md:flex-col flex-row justify-center active-shadow">
          <img src="/image/Connect.png" className="md:w-3/4 w-1/3 md:mx-auto mx-0 my-0 object-contain md:p-0 p-4 md:rounded-none rounded-16" />
          <div className="m-auto">
            <div className="text-center sm:text-lg text-sm w-2/3 m-auto p-4">
              Connect your wallet to claim your NFT portfolio
            </div>
          </div>

        </div>
        <div className="bg-white rounded-16 flex md:flex-col flex-row justify-center active-shadow">

          <div className="m-auto">
            <div className="text-center sm:text-lg text-sm w-2/3 m-auto p-4">
              Monitor Your NFTs
            </div>

          </div>
          <img src="/image/Monitor.png" className="md:w-3/4 w-1/3 md:mx-auto mx-0 my-0 object-contain md:p-0 p-4 md:rounded-none rounded-16" />
        </div>
        <div className="bg-white rounded-16 flex  md:flex-col flex-row justify-center active-shadow">
          <img src="/image/Share.png" className="md:w-3/4 w-1/3 md:mx-auto mx-0 my-0 object-contain md:p-0 p-4 md:rounded-none rounded-16" />
          <div className="m-auto">

            <div className="text-center sm:text-lg text-sm w-2/3 m-auto p-4">
              Put your Galleryst.co/ page URL to Instagram and Twitter bio!
            </div>
          </div>
        </div>
      </div>
      {/* container */}
      <div className="hidden rounded-24 mb-20 md:px-5 px-2 py-4 border border-white shadow-nft" style={{ background: 'rgba(185, 184, 184, 0.32)' }}>
        {/* search box */}
        <input className="hidden placeholder-gray block w-3/5 bg-white m-auto rounded-full h-10 px-5 font-thin appearance-none outline-none" placeholder="Press creator ID and see the magic!" />
        <div className="text-center p-4">
          {/* <div className="py-1 bg-white rounded-full text-center px-1 shadow-nft hidden" >
            {tagList.map((tag,index) =>
              <button onClick={() => { setCurrent(index)}} className={`py-2 px-3 font-semibold text-sm focus:outline-none appearance-none rounded-full px-2 ${current == index ?  'bg-black text-white': 'text-black' }`}>{tag}</button>
            )}
          </div> */}
          <div className="flex p-1 rounded-full" >
            <button onClick={() => setCurrent('all')} className={`h-10 w-auto py-2 md:px-6 mr-2 font-sm text-sm active-shadow focus:outline-none appearance-none rounded-full px-4  ${current == 'all' ? 'bg-black text-white' : 'bg-white text-black'}`}>All</button>
            <div className="overflow-x-auto overflow-y-hidden rounded-r-full w-5/6 " style={{ whiteSpace: 'nowrap' }}>
              {creators.map(creat => {
                return <button onClick={() => setCurrent(creat.creator_url)} className={`inline p-2 mr-2 font-sm active-shadow text-sm rounded-full items-center ${current == creat.creator_url ? 'bg-black text-white' : 'bg-white'}`}>
                  <img className=" h-6 rounded-full border-1 border-white shadow-nft inline" src={creat.creator_image} alt="" />
                  <span className="ml-2">{creat.creator_name?.substr(0, 4)}...</span>
                </button>
              })}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2">
          {current == 'all' ? shuffle(randomNFT(nfts_lists, creators)).slice(0, 28).map((item: NFT) => {
            const creator = creators.find(creat => creat.creator_url == item.nifty_creator_url)
            const parse: any = creator
            return <Card src={item} nfts_lists={nfts_lists} creator={parse} />
          }) : profileNFT(nfts_lists, creators.find(creat => creat.creator_url == current)).length > 0 ?
            profileNFT(nfts_lists, creators.find(creat => creat.creator_url == current)).map((item, index) => {
              const creator = creators.find(creat => creat.creator_url == current)
              return <div className="rounded-16 shadow-nft mb-8" key={index}>
                <Card src={item} nfts_lists={nfts_lists} creator={creator} />
              </div>
            }) :
            <div className="text-center opacity-50 col-span-4"> Not found NFTS in marketplace.</div>
          }
        </div>
      </div >
    </div>
    <a href={`https://galleryst.hellonext.co`} className="fixed right-0 bottom-0 z-20 my-2 mx-4 w-max inline bg-white text-gray-700 focus:outline-none rounded-full p-2 items-center shadow-nft text-xs" target="_blank" ><img src="/image/feedback_icon.svg" style={{ height: '20px', opacity: '.6' }} className="inline-block mr-2 mb-0 " />Send us feedback</a>
  </div>
}

export default Page
