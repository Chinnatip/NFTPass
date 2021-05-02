import Card from "../components/Card"
import Navbar from "../components/Navbar"
import NFT from "../components/NFT"
import { nfts } from '../static/NFTLists'
import { artistProfile } from '../static/Artist'
import { ProfileCard, ProfileStat } from '../components/Profile'

const Page = () => {
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="md:w-4/5 w-full m-auto z-10">
      <Navbar current={1} />
      {/* container */}
      <div className="rounded-24 border border-white shadow-nft mt-20">
       
        <div className="bg-white" style={{borderRadius: '24px 24px 0px 0px'}}>
          <ProfileCard profile={artistProfile} />
          <ProfileStat profile={artistProfile} />
                {/* Creator's Profile Tabs */}
                <div className="flex justify-center">
    <div className="p-1 bg-white rounded-full shadow-nft flex justify-center w-min  my-10" >
      <button className={`focus:outline-none py-2 text-sm rounded-full px-5 `}>Creations</button>
      <button className={`focus:outline-none py-2 text-sm rounded-full px-5 `}>Owned</button>
      <button className={`focus:outline-none py-2 text-sm rounded-full px-5 `}>Saved</button>
    </div>
    </div>
          
    
       
        </div>
        {/* Tab Contents */}
        <div
          className="h-auto flex justify-end flex-col items-center md:px-16"
          style={{borderRadius: '0 0 24px 24px ', background: '#d2cdcd26'}}>
            <div className="flex justify-center flex-col w-full">
             <div className="text-center text-white text-xl mt-8 mb-6">
            Current Bidding
          </div>
          <div className="w-full">
            { nfts
              .filter(item => item.bid != undefined)
              .map(item => <NFT src={item} /> )
            }
          </div>
          <div className="text-center hidden">
            <a className="text-xl underline text-gray-400 font-thin" href="/">See more</a>
          </div>
          <div className="h-16"/>
          </div>
          {/* Contents Section */}
          <p className="text-lg mb-3 text-white">Collections</p>
          <div className="flex flex-row mb-4">
        { [...new Set(nfts.map(item => item.provider)) ].map((item, index) => {
          return <button className={`${index > 0 && 'ml-3'} bg-white shadow-nft rounded-full h-10 inline-flex px-1 pr-3 font-bold items-center`}>
            <img src={`image/${item}_icon.png`} className="h-8 inline mr-2"/> {item}
          </button>
        })}
        </div>
        <p className="text-lg mt-10 hidden">Works</p>

        <div className="masonry p-4">
          {nfts.map((item,index) => (
            <div className="rounded-16 shadow-nft mb-8" key={index}>
              <Card src={item}/>
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
