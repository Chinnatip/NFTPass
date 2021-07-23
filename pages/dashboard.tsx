import Navbar from "../components/Navbar"
import { LinkButton, Button } from '../components/Button'
import { artistProfile } from '../static/Artist'

const Page = () => {
  return <div className="w-screen h-screen pt-0 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <div className="w-4/5 m-auto z-10">
      {/* Navbar */}
      <Navbar show={false} current={0} />

      {/* Content */}
      <div className="rounded-24 border border-white shadow-nft flex">
        <div className="p-6 px-8" style={{ width: '20rem', background: '#f3f3f352', borderRadius: '24px 0px 0px 24px' }}>
          <div className="mb-5"><LinkButton fit text="Discovery" icon="image/dashboard_icon.png" link="/index" /></div>
          <div className="mb-5"><LinkButton fit text="Get Early Access" icon={artistProfile.img} link="/profile" /></div>
          <div className="mb-5"><LinkButton fit active={true} text="Account" icon="image/edit_icon.png" link="/dashboard" /></div>
          <div className="mb-5"><LinkButton fit text="Logout" icon="image/logout_icon.png" link="/" /></div>
        </div>

        <div className="bg-white flex-grow p-8" style={{ borderRadius: '0 24px 24px 0px' }}>
          <img
            src={artistProfile.img}
            className="inline-block h-24 w-24 border-4 border-white shadow-nft rounded-24"
            alt="" />
          <p className="text-xl font-semibold mt-5 mb-5">Name</p>
          <input className="block w-full shadow-nft bg-white rounded-full h-12 px-5 font-thin appearance-none outline-none" placeholder="@Username" />
          <p className="text-xl font-semibold mt-8 mb-4">Social Media Verification</p>
          <div className="flex mt-6 mb-6 h-12 items-center">
            <img src="image/twitter_col_icon.png" className="h-6" />
            <span className="ml-3 text-lg font-semibold">Twitter</span>
            <div className="flex-grow" />
            <Button text="Connected" icon="image/correct_icon.png"></Button>
          </div>
          <div className="flex mb-6 h-12 items-center">
            <img src="image/instagram_col_icon.png" className="h-6" />
            <span className="ml-3 text-lg font-semibold">Instagram</span>
            <div className="flex-grow" />
            <Button text="Connected" icon="image/correct_icon.png"></Button>
          </div>

          <p className="text-xl font-semibold mt-10 mb-5">Your Address ID</p>
          <input className="block w-full shadow-nft bg-white rounded-full h-12 px-5 font-thin appearance-none outline-none" placeholder="wr426kjn2rng" />

          <p className="text-xl font-semibold mt-10 mb-5">Rarible URL</p>
          <input className="block w-full shadow-nft bg-white rounded-full h-12 px-5 font-thin appearance-none outline-none" placeholder="http://www.rarible.com/etonjohn" />

          <p className="text-xl font-semibold mt-10 mb-5">Opensea URL</p>
          <input className="block w-full shadow-nft bg-white rounded-full h-12 px-5 font-thin appearance-none outline-none" placeholder="wr426kjn2rng" />

          <p className="text-xl font-semibold mt-10 mb-5">Superare</p>
          <input className="block w-full shadow-nft bg-white rounded-full h-12 px-5 font-thin appearance-none outline-none" placeholder="wr426kjn2rng" />
          <div className="h-8" />
        </div>
      </div>
      <div className="h-24" />
    </div>
  </div>
}

export default Page
