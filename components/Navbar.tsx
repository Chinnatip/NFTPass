import { useRouter } from 'next/router'

const Navbar = ({ current , show=true }: {current: number, show?: boolean}) => {
  const Router = useRouter()
  return <div className="flex items-center mb-10">
    <button className="focus:outline-none" onClick={() => Router.push('/')}>
      <img className="h-10" src="image/nft_pass_logo.png" alt=""/>
    </button>
    <div className="flex-grow"/>
    { show && <div className="p-1 bg-white rounded-full shadow-nft" >
      <button onClick={() => Router.push('/discover')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 0 ?  'bg-black text-white': 'text-black' }`}>Discovery</button>
      <button onClick={() => Router.push('/profile')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 1 ?  'bg-black text-white': 'text-black' }`}>Your Page</button>
    </div>}
    <div className="flex-grow"/>
    <button className="focus:outline-none"  onClick={() => Router.push('/dashboard')}>
      <img className="h-12 w-12 rounded-full border-4 border-white shadow-nft" src="image/beeple_profile.png" alt=""/>
    </button>
  </div>
}

export const HomeNavbar = ({ current , show=true }: {current: number, show?: boolean}) => {
  const Router = useRouter()
  return <div className="flex items-center mb-10">
    <button className="focus:outline-none" onClick={() => Router.push('/')}>
      <img className="h-10" src="image/nft_pass_logo.png" alt=""/>
    </button>
    <div className="flex-grow"/>
    { show && <div className="p-1 bg-white rounded-full shadow-nft" >
      <button onClick={() => Router.push('/')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 0 ?  'bg-black text-white': 'text-black' }`}>Home</button>
      <button onClick={() => Router.push('/discover')} className={`focus:outline-none py-2 text-sm rounded-full px-5 ${current == 1 ?  'bg-black text-white': 'text-black' }`}>Discovery</button>
    </div>}
    <div className="flex-grow"/>
  </div>
}

export default Navbar
