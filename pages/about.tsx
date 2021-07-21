import { HomeNavbar } from "../components/Navbar"
import { useRouter } from 'next/router'
import { artistProfile } from '../static/Artist'
import { prepNum } from '../method/setNumber'

const bookmarkLists = [artistProfile, artistProfile, artistProfile]

const Page = () => {
  const Router = useRouter()
  return <div className="w-screen h-screen pt-0 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <div className="w-4/5 m-auto z-10">
      {/* Navbar */}
      <HomeNavbar current={0} />

      {/* Content */}
      <div className="rounded-24 mt-16 border border-white shadow-nft flex" style={{ height: "70vh" }}>
        <div className="px-20 py-12 w-1/2 flex" style={{ background: 'rgb(185 184 184 / 32%)', borderRadius: '24px 0px 0px 24px' }}>
          <h1 className="text-6xl font-semibold w-full opacity-75 text-white" style={{ lineHeight: '4.8rem' }}>NFT Pass<br /> An Only Passport, Creator <br /> Will Ever <br /> Need</h1>
        </div>

        <div className="bg-white flex-grow p-8 flex items-center justify-center flex-col" style={{ borderRadius: '0 24px 24px 0px' }}>
          <img src="image/ic_glob_black.png" className="h-10 mt-10" />
          <p className="mt-6 text-center text-black font-semibold">Connect to NFTPass <br /> with</p>
          <button className="text-white text-lg bg-black rounded-full p-2 px-5 mt-20 focus:outline-none" onClick={() => Router.push('/dashboard')}>Connect to MetaMask Wallet</button>
          <div className="flex-grow" />
          <p className="font-semibold text-lg">New to NFTPass?</p>
          <a href="/" className="text-gray-main text-xl mb-4 font-thin">Sign up with Metamask</a>
        </div>
      </div>

      <div className="h-24" />

      {/* Bookmark */}
      <div className="text-center text-black opacity-50 font-thin text-4xl mt-8 mb-6">
        Top Bookmarked
      </div>
      {bookmarkLists.map(item => {
        return <div className="bg-white mb-8 shadow-nft flex p-4 rounded-24 flex items-center justify-center">
          <img className="h-24 shadow-nft w-24 rounded-24 border-4 border-white" src={item.img} />
          <h1 className="text-xl ml-10 font-semibold">{item.name}</h1>
          <div className="flex-grow" />
          <button className="text-xl font-semibold">{prepNum(item?.connection?.supporter?.follower)} bookmarks</button>
        </div>
      })}
      <div className="h-24" />
    </div>
  </div>
}

export default Page
