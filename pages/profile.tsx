import Card from "../components/Card"
import Navbar from "../components/Navbar"
import NFT from "../components/NFT"
import { nfts } from '../static/NFTLists'
import { artistProfile } from '../static/Artist'
import { ProfileCard, ProfileStat } from '../components/Profile'
import { LinkButton } from '../components/Button'

const Page = () => {
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="w-4/5 m-auto z-10">
      <Navbar current={1} />
      {/* container */}
      <div className="rounded-24 border border-white shadow-nft">
        <div
          className="h-32 flex justify-end items-center px-16"
          style={{borderRadius: '24px 24px 0 0', background: '#d2cdcd26'}}>
          <LinkButton text="Edit" icon="image/edit_icon_dark.png" link="/dashboard" />
        </div>
        <div className="bg-white pt-24" style={{borderRadius: '0px 0px 24px 24px'}}>
          <ProfileCard profile={artistProfile} />
          <ProfileStat profile={artistProfile} />
          <div className="text-center text-gray-500 text-xl mt-8 mb-6">
            Current Bidding
          </div>
          <div className="w-full">
            { nfts
              .filter(item => item.bid != undefined)
              .map(item => <NFT src={item} /> )
            }
          </div>
          <div className="text-center">
            <a className="text-xl underline text-gray-400 font-thin" href="/">See more</a>
          </div>
          <div className="h-16"/>
        </div>
      </div>
      <div className="h-10"/>
      <div className="rounded-24 mb-20 px-12 py-16 border border-white shadow-nft" style={{background: '#ffffff8c'}}>
        <p className="text-lg mb-3">Collections</p>
        { [...new Set(nfts.map(item => item.provider)) ].map((item, index) => {
          return <span className={`${index > 0 && 'ml-3'} bg-white shadow-nft rounded-full h-10 inline-flex px-1 pr-3 font-bold items-center`}>
            <img src={`image/${item}_icon.png`} className="h-8 inline mr-2"/> {item}
          </span>
        })}
        <p className="text-lg mt-10">Works</p>

        <div className="masonry py-4">
          {nfts.map((item,index) => (
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
