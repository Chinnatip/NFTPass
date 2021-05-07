import { useState , useEffect } from 'react'
import { loadCreator, getNFTS, Creator, profileNFT, NFT } from 'method/fetchJSON'
import { useRouter } from 'next/router'
import { ProfileCard } from '@/Profile'
import Card from '@/Card'
import Navbar from "@/Navbar"
// import Carousel from '@/Carousel'
// import { nfts } from 'static/NFTLists'

const charactorList = ['Creations'] //,'Owned','Saved']

const Page = () => {
  const router = useRouter()
  const { slug } = router.query
  const [ current, setCurrent ] = useState(0)
  const [ creator, setCreator ] = useState<Creator>({
    creator_name: '',
    creator_url: '',
    creator_nifty_url: '',
    creator_image: '',
    collections: [],
    total_drops: 0,
    opensea_slug: []
  })

  const [nfts_lists, setNFTS] = useState<NFT[]>([])
  useEffect(()=>{
    const profileSlug : any = slug
    loadCreator(setCreator, profileSlug)
    getNFTS(setNFTS)
  },[])

  return <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("/image/bg_blur.jpg")'}}>
  <div className="md:w-4/5 w-full m-auto z-10">
    <Navbar current={1} />
    {/* container */}
    <div className="rounded-24 border border-white shadow-nft mt-20" style={{background: 'rgba(185, 184, 184, 0.32)'}}>
      <div className="bg-white" style={{borderRadius: '24px 24px 0px 0px'}}>
        <ProfileCard profile={creator} />
        {/* <ProfileStat profile={artistProfile} /> */}

        {/* Creator's Profile Tabs */}
        <div className="text-center">
          <div className="mt-8 mb-6 py-1 inline-block bg-white rounded-full text-center px-1 shadow-nft" >
            {charactorList.map((tag,index) =>
              <button
                onClick={() => { setCurrent(index)}}
                className={`py-2 px-3 font-semibold text-sm focus:outline-none appearance-none rounded-full px-2 ${current == index ?  'bg-black text-white': 'text-black' }`}>
                {tag} <span className="p-1 ml-1 w-8 rounded-full bg-gray-main text-white inline-block">{profileNFT(nfts_lists, creator).length}</span>
              </button>
            )}
          </div>
        </div>
    </div>

    {/* Tab Contents */}
    <div
      className="h-auto flex justify-end flex-col items-center md:px-10 px-2 pb-16"
      style={{borderRadius: '0 0 24px 24px ', background: '#d2cdcd26'}}>
      {/* <div className="flex justify-center flex-col w-full">
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
      </div> */}

      {/* Contents Section */}
      <div className="flex flex-row mt-12 mb-6">
        <button className={`bg-white shadow-nft rounded-full h-10 inline-flex px-1 pr-3 items-center`}>
          <img src={`/image/opensea_icon.png`} className="h-8  inline mr-2"/> Opensea
        </button>
      </div>
      <p className="text-lg mt-10 hidden">Works</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4 w-full">
        {profileNFT(nfts_lists, creator).map((item,index) => (
          <div className="rounded-16 shadow-nft mb-8" key={index}>
            <Card src={item} nfts_lists={nfts_lists} creator={creator}/>
          </div>
        ))}
      </div>
    </div>
  </div>
  <div className="h-10"/>
</div>
</div>
}

export default Page
