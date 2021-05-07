
import Navbar from "@/Navbar"
import Carousel from '@/Carousel'
import { nfts } from '../static/NFTLists'
import { useState } from 'react'
import axios from "axios"

type Contact = {
  email?: string
  address?: string
  opensea_url?: string
  rarible_url?: string
  suggestion?: string
}

const Page = () => {
  const [ contact, setContact ] = useState<Contact>({})
  const [ modal, setLoadModal ] = useState(false)
  const [ loaded, setLoaded ] = useState(false)
  const submit = () => {
    if(contact.email == undefined || contact.address == undefined){
      alert('Email and Blockchain address cannot empty')
    }else{
      setLoadModal(true)
      axios.post('https://www.galleryst.co/api/claim' , contact).then(res => {
        if(res.data.status == 'success'){
          setLoaded(true)
        }
      })
    }
  }
  return  <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")'}}>
    { modal && <div className="w-screen h-screen top-0 left-0 fixed flex items-center justify-center z-10" style={{ background: '#000000a6'}}>
      { loaded ? <div className="bg-white rounded-xl shadow-nft text-center text-md relative flex flex-col items-center justify-center" style={{height: '240px',width: '320px'}}>
        <div className="w-full text-center">
          <img src="/image/ic_correct.png" className="h-20 inline mb-6"/>
          <p className="opacity-50 mb-2">Contact will send to you later</p>
          <button className="bg-blue-500 text-white rounded-full p-2 w-24" onClick={() => {setLoadModal(false);setLoaded(false)}}>Close</button>
        </div>
      </div> :
      <div className="bg-white rounded-xl shadow-nft text-center text-md relative" style={{height: '240px'}}>
        <img src="/image/loading.gif" className="rounded-full" style={{width: '320px'}}/>
        <p className="absolute w-full -mt-10 opacity-50">... loading ...</p>
      </div>
      }
    </div> }
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
                <span> #S4T05hi...N4kaM0tO </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-60 md:px-24 md:py-8 p-4">
          <div className="flex flex-col m-auto w-full">
            <div className="m-auto md:w-2/4 w-full">
              <label className="text-lg	text-white">Email</label>
              <input className="h-6 w-full mb-6 rounded-full p-6" onChange={e => setContact({ ...contact, email: e.target.value })} value={contact.email} type="email" placeholder="Your Email Address"></input>
              <label className="text-lg	text-white">ID Address</label>
              <input className="h-6 w-full mb-6 rounded-full p-6" onChange={e => setContact({ ...contact, address: e.target.value })} value={contact.address} placeholder="Your Opensea ID Address"></input>
              <label className="text-lg	text-white">Opensea Profile URL (optional)</label>
              <input className="h-6 w-full mb-6 rounded-full p-6" onChange={e => setContact({ ...contact, opensea_url: e.target.value })} value={contact.opensea_url} placeholder="Your Opensea ID Address"></input>
              <label className="text-lg	text-white">Rarible Profile URL (optional)</label>
              <input className="h-6 w-full mb-6 rounded-full p-6" onChange={e => setContact({ ...contact, rarible_url: e.target.value })} value={contact.rarible_url} placeholder="Your Opensea ID Address"></input>
              <label className="text-lg	text-white">What features should we add to Galleryst next? (optional)</label>
              <textarea rows={4} className="w-full mb-6 mt-2 rounded-xl p-6" onChange={e => setContact({ ...contact, suggestion: e.target.value })} value={contact.suggestion} placeholder="Drop your thoughts"/>
              <button className=" w-full bg-black text-white rounded-full p-4" onClick={() => submit()}>Get Early Access</button>
            </div>
          </div>
          <div className="flex flex-row justify-center mt-8">
            <div>
              Follow Us on
              <a href="https://twitter.com/gallerystco" target="_blank">
                <span className="font-semibold">Twitter</span>
              </a>
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
                <img src={`/image/${item}_icon.png`} className="h-8  inline mr-2"/> {item}
              </button>
            })}
          </div>
        </div>
      </div>
      {/* footer space */}
      <div className="h-10"/>
    </div>
  </div>
}

export default Page
