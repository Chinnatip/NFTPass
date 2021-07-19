import { useRouter } from 'next/router'
import { useState } from 'react'
import { LinkButton } from '../components/Button'
import { ConnectBtn } from '@/Galleryst'
// import { artistProfile } from '../static/Artist'

const ProfileModal = () => {
  return <div className="w-64 bg-white absolute top-5 right-0 z-20 mt-16 rounded-24 p-6 shadow-nft border border-white" style={{ background: '#fffffff7' }}>
    <div className="mb-4"><LinkButton fit text="Discovery" icon="" link="/" /></div>
    <div className=""><LinkButton fit text="Get Early Access" icon="" link="/claim" /></div>
    <div className="mb-4 hidden"><LinkButton fit active={true} text="Account" icon="image/edit_icon.png" link="/dashboard" /></div>
    <div className="hidden"><LinkButton fit text="Logout" icon="image/logout_icon.png" link="/" /></div>
  </div>
}

const Navbar = ({ current, show = true }: { current: number, show?: boolean }) => {
  const Router = useRouter()
  const [modal, setModal] = useState(false)
  return <div className="flex items-center mb-10">
    <button className="focus:outline-none" onClick={() => Router.push('/')}>
      <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
    </button>
    {show && <div className="absolute p-1 bg-white rounded-full shadow-nft text-center float-central hidden" >
      <button onClick={() => Router.push('/')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 0 ? 'bg-black text-white' : 'text-black'}`}>Discovery</button>
      <button onClick={() => Router.push('/claim')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 1 ? 'bg-black text-white' : 'text-black'}`}>Get Early Access</button>
    </div>}
    <div className="flex-grow" />
    <ConnectBtn />
    <button className="mt-3 mr-1 h-12 w-12 rounded-full border-4 bg-white border-white shadow-nft relative hidden" onClick={() => setModal(!modal)}>
      {modal && <ProfileModal />}
      <img className="rounded-full" src="/image/hamburger.svg" alt="hamburger menu" />
    </button>
  </div>
}

export const HomeNavbar = ({ current, show = true }: { current: number, show?: boolean }) => {
  const Router = useRouter()
  return <div className="flex items-center mb-5">
    <button className="focus:outline-none" onClick={() => Router.push('/')}>
      <img className="h-8" src="image/ic_galleryst_logo.png" alt="" />
    </button>
    {show && <div className="absolute p-1 bg-white rounded-full shadow-nft text-center float-central" >
      <button onClick={() => Router.push('/index')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 0 ? 'bg-black text-white' : 'text-black'}`}>Home</button>
      <button onClick={() => Router.push('/index')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 1 ? 'bg-black text-white' : 'text-black'}`}>Discovery</button>
    </div>}
    <div className="flex-grow" />
  </div>
}

export default Navbar
