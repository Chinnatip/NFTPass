import { nfts } from '../static/NFTLists'
import Card from "../components/Card"
import Navbar from "../components/Navbar"

const NFT = ({ src }:{
  src: {
  title?: string
  price?: number
  provider?: string
  img?: string
  bid?: {
    change: number
    lastest: string
  }
  }}) => {
  return <div className="m-auto rounded-16 mt-4 mb-6 bg-white shadow-nft p-4 flex" style={{width: '84%'}}>
    <img src={src.img} className="h-24 w-24 rounded-lg" alt=""/>
    <div className="ml-8 flex-grow">
      { src.bid != undefined && <p className="text-sm">
        <span className={`text-${src.bid.change > 0 ? 'green' : 'red'}-500 mr-2`}>
          { src.bid?.change > 0 ? '▲' : '▼' } {src.bid?.change}%
        </span>
        Bid placed at
      </p> }
      <p>{src.bid?.lastest}</p>
      <a href="/" className="inline-block mt-6 text-gray-500 underline">see current bidding</a>
    </div>
    <div className="text-right">
      <img src={`image/${src.provider}_icon.png`} className="inline h-8"/>
      <div className="text-xl font-semibold mt-1">{src.price} ETH</div>
      <div className="text-sm">$2000</div>
    </div>
  </div>
}

const ProfileCard = () => {
  return <>
    <div className="text-center -mt-48">
      <img
        src="image/beeple_profile.png"
        className="inline-block h-40 w-40 border-8 border-white shadow-nft rounded-28"
        alt=""/>
    </div>
    <div className="m-auto text-center mt-3">
      <div className="mb-4 text-3xl font-semibold">
        Beeple
        <img src="image/verify_logo.png" className="inline h-6 ml-2 -mt-1"/>
      </div>
      <div className="text-sm shadow-nft rounded-full bg-white inline p-2 px-4 font-thin">
        <span>
          #9531985...nvfnv4
          <img src="image/copy_icon.png" className="inline ml-2 -mr-2 -mt-1 h-5" />
        </span>
      </div>
    </div>
  </>
}

const ProfileStat = () => {
  return <div className="flex m-auto justify-center mt-10">
    <div className="px-6">
      <p className="text-sm font-thin">
        Twitter
        <img src="image/correct_icon.png" alt="" className="inline h-3 ml-1 -mt-1"/>
      </p>
      <p className=" text-xl font-semibold">593k Followers</p>
    </div>
    <div className="border-l-4 px-6">
      <p className="text-sm font-thin">
        Instagram
        <img src="image/correct_icon.png" alt="" className="inline h-3 ml-1 -mt-1"/>
      </p>
      <p className=" text-xl font-semibold">2M Followers</p>
    </div>
    <div className="border-l-4 px-6">
      <p className="text-sm font-thin">
        Supporters
      </p>
      <p className=" text-xl font-semibold">40 Collectiors</p>
    </div>
  </div>
}

const Page = () => {
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    <div className="w-4/5 m-auto z-10">
      <Navbar current={0} />
      {/* container */}
      <div className="rounded-24 border border-white shadow-nft">
        <div
          className="h-32 flex justify-end items-center px-16"
          style={{borderRadius: '24px 24px 0 0', background: '#d2cdcd26'}}>
          <button className="bg-white rounded-full p-2 px-3 flex items-center shadow-nft">
            <img src="image/edit_icon.png" className="inline h-6" />
            <span className="ml-2 font-thin text-sm">Edit</span>
          </button>
        </div>

        <div className="bg-white pt-24" style={{borderRadius: '0px 0px 24px 24px'}}>
          <ProfileCard />
          <ProfileStat />
          <div className="text-center text-gray-500 text-xl mt-8 mb-6">
            Current Bidding
          </div>

          <div className="w-full">
            { nfts
                .filter(item => item.bid != undefined)
                .map(item => <NFT src={item} /> ) }
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
