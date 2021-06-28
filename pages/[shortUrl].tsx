import React, { useState, useEffect, useRef } from 'react'
import firebase from "../method/firebase"
import { faCheck , faCopy, faSync } from '@fortawesome/free-solid-svg-icons'
import { Profile } from '../method/rarible/interface'
import { Drop} from '../method/nifty/interface'
import { Galleryst } from '../interfaces/index'
import { mask } from 'utils/address.util'
import { walletStore } from 'stores/wallet.store'
import { observer } from 'mobx-react-lite'
import { walletService } from 'services/wallet.service'
import { createPopper } from '@popperjs/core'
import Icon from '@/Icon'

const lockDigit = (price: number) => {
  return (Math.floor( price * 10000) )/ 10000
}

const sanitizeArray = (objs: Galleryst[]) => {
  const clean = (obj: any) => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }
  return objs.map(obj => clean(obj))
}

const NFTDrop = ({ lists,text='' } : {lists : Drop[],text: string}) => {
  return <>
  { lists.length > 0 && <>
    <h2 className="text-xl">{text}</h2>
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2 w-full">
      { lists.map(item => {
        const { address, title, image} = item
        return image != undefined &&  <a target="_blank" href={`/nft?address=${address}`} className="relative cursor-pointer bg-white rounded-16 mb-2" key={`${address}`}>
          <div className="thumbnail-wrapper w-full relative">
            { image.slice( image.length - 3, image.length) == 'mp4' ?
              <video className="rounded-16 border-8 border-white thumbnail-height" src={image} autoPlay loop muted/> :
              <img className="rounded-16 border-8 border-white thumbnail-height" src={image} />
            }
          </div>
          <span className="absolute bottom-0 left-0 flex flex-col pl-3 pb-4 z-10" >
            <span className="bg-blue-700 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">N</span>
          </span>
          <span className="hidden text-black opacity-50 absolute bottom-0 left-0 -mb-5 text-xs w-full text-center">{title}</span>
        </a>
      })}
    </div>
    <br />
  </>}
  </>
}

// Group Component
const NFTGroup = ({ lists, nfts, text='', type='' } : { type?: string, text?: string, lists: string[], nfts: Galleryst[]}) => {
  // let sortNfts = nfts
  // switch(type){
  //   case 'onsale':
  //     sortNfts = nfts.sort((a,b) => (b.priceETH != undefined && a.priceETH != undefined) ? b.priceETH - a.priceETH : 0 )
  //     break
  //   default:
  //     sortNfts = nfts
  // }
  return <>
  { lists.length > 0 && <div className="mx-10 mt-6">
    <h2 className="text-sm bg-gray-200 rounded-full inline-block mb-2 px-3 py-1 shadow-nft text-gray-600">{text}</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2 w-full">
        {nfts.filter(item => lists.includes(item.id)).map(item => {
          const { imagePreview, check } = item
          return imagePreview !=  undefined && <a target="_blank" href={`/nft?address=${item.id}`} className="relative cursor-pointer bg-white rounded-16 mb-2" key={`${item.id}`}>
            <div className="thumbnail-wrapper w-full relative">
              { imagePreview.slice( imagePreview.length - 3, imagePreview.length) == 'mp4' ?
                <video className="rounded-16 border-8 border-white thumbnail-height" src={imagePreview} autoPlay loop muted/> :
                <img className="rounded-16 border-8 border-white thumbnail-height" src={imagePreview} />
              }
              <div className="absolute flex justify-end	z-10 bottom-0  w-full mb-2 px-2 pt-6 ">
                <div className="flex px-2 rounded-b-16 pt-10 justify-end w-full" style={{ background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.52) 10%, rgba(196, 196, 196, 0) 50%)' }}>
                  {type == 'onsale' && item.priceETH != undefined &&
                    <span className="text-white font-bold text-right " >
                      { lockDigit(item.priceETH) } ETH
                    </span>}</div>
              </div>
              <span className="absolute bottom-0 left-0 flex flex-col pl-3 pb-4 z-10" >
                { check?.rarible && <span className="bg-yellow-500 h-4 w-4 text-xs rounded-full flex items-center justify-center">r</span> }
                { check?.opensea && <span className="bg-blue-500 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">O</span> }
                { check?.foundation && <span className="bg-black text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">F</span> }
                { check?.nifty && <span className="bg-blue-700 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">N</span> }
              </span>
            </div>
            <span className="text-black absolute bottom-0 rounded-tr-full left-0 hidden text-xs bg-white p-1 pt-2 pr-2 bg-pink-400 text-pink-800" >
              {item?.likes}
            </span>
            <span className="hidden text-black opacity-50 absolute bottom-0 left-0 -mb-5 text-xs w-full text-center">{item?.name}</span>
          </a>
        })}
      </div>
      <br />
    </div>}
  </>
}

const ConnectBtn = observer(() => {
  const [show, setShow] = useState(false)
  const btnRef = useRef(null)
  const popperRef = useRef(null)
  createPopper(btnRef.current!, popperRef.current!, { placement: 'bottom-start' })
  const handleClick = async () => {
    if (!show) {
      await walletService.getAccounts()
    }
    setShow(!show)
  }
  return (
    <div className="flex justify-end">
      <button
        ref={btnRef}
        onClick={handleClick}
        style={{ color: '#9A6B6B', backgroundColor: '#C7AAAA' }}
        className={`py-2 px-3 mx-5 font-semibold text-sm focus:outline-none appearance-none rounded-full `}
      >
        {walletStore.verified ? `${mask(walletStore.address)} | ${walletStore.readableBalance}` : 'Connect' }
      </button>
      <div ref={popperRef} className={`${show ? '' : 'hidden'} p-2 rounded-2xl bg-white`}>
        {(!walletStore.isConnected && walletStore.accounts.length > 0) && walletStore.accounts.map((account, index) => {
          return (
            <React.Fragment key={account} >
              <button
                className='text-xs'
                onClick={() => {
                  setShow(false)
                  walletService.connect(account)
                }}
              >
                {account}
              </button>
              {index !== walletStore.accounts.length - 1 && <hr />}
            </React.Fragment>
          )
        })}
        {walletStore.isConnected && (
          <button
            className='text-md'
            onClick={() => {
              setShow(false)
              walletService.disconnect()
            }}
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  )
})

const AddressBox = ({ address }:{ address: string | undefined}) => {
  const [ show, setShow ] = useState(false)
  const useCopyToClipboard = ( text: string ) => {
    navigator.clipboard.writeText(text)
    setShow(true)
    setTimeout(() => { setShow(false)}, 1300);
  }
  return <div className="text-gray-500 text-sm px-3 py-2 bg-white rounded-full shadow-nft flex items-center relative">
    { show && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-8 -mr-2 text-sm rounded-full">Copied !</div>}
    <span className="inline-block ml-2">{address}</span>
    { address && <span
      className="text-black w-8 h-8 ml-2 inline-flex items-center justify-center inline-block bg-gray-200 hover:bg-gray-400 rounded-full cursor-pointer"
      onClick={() => { useCopyToClipboard(address != undefined ? address : '')}}>
      <Icon fill={faCopy} noMargin />
    </span>}
  </div>
}

const UpdateAction = ({ action }:{action: any}) => {
  const [ show, setShow ] = useState(false)
  return <div
    onClick={() => {
      setShow(true);
      setTimeout(() => { setShow(false)}, 4000);
    }}
    className="absolute top-0 right-0 mt-5 mr-5 flex items-center button-red py-2 px-3 rounded-full cursor-pointer text-sm font-semibold">
    { show && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-10 text-sm rounded-full">Processing please wait ...</div>}
    <Icon fill={faSync} /> Update address Info
  </div>
}

const Page  = ({ shortUrl }: { shortUrl: string }) => {
  const [profile, setProfile] = useState<Profile>({})
  const [show, setShow] = useState('collection')
  const [NFTLists, setNFTLists] = useState<Galleryst[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  const [onsaleLists, setOnsaleLists] = useState<string[]>([])
  const [createdLists, setCreatedLists] = useState<string[]>([])
  const [dropLists, setDropLists] = useState<Drop[]>([])

  useEffect(() => {
    (async () => {
      const db = firebase.firestore().collection("creatorParcel").where('profile.shortUrl','==',shortUrl)
      const document = await db.get()
      if(document.docs.length > 0){
        const doc = document.docs[0]
        const response : any = doc.data()
        const { profile, ownLists, onsaleLists, dropLists, createdLists, NFTLists } = response
        setProfile(profile)
        setOwnLists(ownLists)
        setOnsaleLists(onsaleLists)
        setDropLists(dropLists)
        setCreatedLists(createdLists)
        setNFTLists(NFTLists)
      }
    })()
  }, []);

  const claimPage = async (address : string | undefined, userParcel: any) => {
    if(address != undefined){
      alert(`claiming >>> ${address}` )
      const db = firebase.firestore().collection("creatorParcel").doc(address)
      console.log(userParcel)
      await db.set(userParcel)
      alert(`${address} >>> updated!` )
    }
  }

  const load_style = 'border text-gray-400 bg-gray-200'
  const rarible_style = 'text-black bg-yellow-500'
  const opensea_style = 'text-white bg-blue-500'
  const nifty_style = 'text-white bg-blue-700'
  const foundation_style = 'text-white bg-black'

  return <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <ConnectBtn />
    <div className="md:w-4/5 w-full m-auto z-10 relative">
      <UpdateAction action={{ setProfile,setOwnLists,setOnsaleLists,setDropLists,setCreatedLists,setNFTLists }} />
      <div className="rounded-24 border border-white shadow-nft mt-20 mb-20 pb-10" style={{ background: 'rgba(185, 184, 184, 0.32)', borderRadius: '24px' }}>
        <div className="bg-white pb-6" style={{ borderRadius: '24px 24px 0px 0px' }}>
          <div className="text-center">
            <span className="relative">
              <img src={profile?.pic} className="inline-block h-20 w-20 border-4 border-white shadow-nft rounded-full -mt-12 object-cover" />
              { profile?.verified && <span className="absolute -mr-2 -mb-2 bottom-0 right-0 h-6 w-6 inline-flex justify-center items-center bg-green-400 rounded-full text-white shadow-nft">
                <Icon fill={faCheck} noMargin></Icon>
              </span> }
            </span>
            <div className="text-3xl">{profile?.username}</div>
            { profile?.verified && <div className="text-gray-500 text-xs mb-5">Verifed by Galleryst</div> }
            <div className="mt-1 mb-6  flex align-middle justify-center m-auto">

              <AddressBox address={profile?.address} />

              {profile?.address == walletStore.address && profile?.verified != true && <button onClick={() => claimPage(profile?.address, {
              // { <button onClick={() => claimPage(address, {
                profile: {...profile ,verified: true },
                NFTLists: sanitizeArray(NFTLists),
                onsaleLists,
                ownLists,
                createdLists,
                dropLists })} className="bg-black text-sm text-white rounded-full inline-block px-3 py-2 ml-3">
                Claim this address
              </button> }
            </div>
            {/* Contact url */}
            <div className="p-4 pt-0">
              <div className="md:px-8 px-1">{profile?.description}</div>
              <a className="my-2 block text-blue-700" href={profile?.website}>{profile?.website}</a>
            </div>

            {/* Follower */}
            { profile?.meta?.followers != undefined && profile?.meta?.followers > 0 && <div className="p-4 pt-0 text-sm text-gray-500">
              <div className="md:px-8 px-1">
                {profile?.meta?.followers} followers | {profile?.meta?.followings} followings
              </div>
            </div>}


            {/* Tabbar */}
            <div className="mb-8 inline-block" >
              <button
                onClick={() => setShow('collection')}
                className={`${show == 'collection' ? 'bg-black text-white' : 'bg-white'} shadow-nft mx-2 px-3 py-2 font-semibold text-sm focus:outline-none appearance-none rounded-full `}>Collections
                <span className="p-1 ml-1 w-8 rounded-full bg-gray-main text-white inline-block">{ownLists.length}</span>
              </button>
              <button
                onClick={() => setShow('creates')}
                className={`${show == 'creates' ? 'bg-black text-white' : 'bg-white'}  shadow-nft mx-2 px-3 py-2 font-semibold text-sm focus:outline-none appearance-none rounded-full `}>Creates
                <span className="p-1 ml-1 w-8 rounded-full bg-gray-main text-white inline-block">{createdLists.length}</span>
              </button>
              { dropLists.length > 0 && <button
                onClick={() => setShow('drops')}
                className={`${show == 'drops' ? 'bg-black text-white' : 'bg-white'}  shadow-nft mx-2 px-3 py-2 font-semibold text-sm focus:outline-none appearance-none rounded-full `}>Drops
                <span className="p-1 ml-1 w-8 rounded-full bg-gray-main text-white inline-block">{dropLists.length}</span>
              </button>}
            </div>
          </div>
        </div>

        {/* NFT controller */}
         <div className="py-3 text-center flex justify-center items-center bg-gray-100">
          <span className="text-sm text-gray-500 mr-2">Filter by marletplace</span>
          <div className={`h-12 w-12 mx-2 flex items-center justify-center rounded-full shadow-nft text-lg ${profile.marketCheck?.rarible == true ? rarible_style : load_style}`}>R</div>
          <div className={`h-12 w-12 mx-2 flex items-center justify-center rounded-full shadow-nft text-lg ${profile.marketCheck?.opensea == true ? opensea_style : load_style}`}>O</div>
          <div className={`h-12 w-12 mx-2 flex items-center justify-center rounded-full shadow-nft text-lg ${profile.marketCheck?.foundation == true ? foundation_style : load_style}`}>F</div>
          <div className={`h-12 w-12 mx-2 flex items-center justify-center rounded-full shadow-nft text-lg ${profile.marketCheck?.nifty == true ? nifty_style : load_style}`}>N</div>
        </div>

        {/* Gallery */}
        <div className="h-4"/>
        {show == 'drops' &&<NFTDrop text={`Nifty drops (${dropLists.length} items)`} lists={dropLists} />}
        {show == 'collection' &&<>
          <NFTGroup type="onsale" text={`On sale (${onsaleLists.length} items)`} lists={onsaleLists} nfts={NFTLists} />
          <NFTGroup type="owned" text={`Own by ${profile?.username} (${ownLists.length} items)`} lists={ownLists} nfts={NFTLists} /></>}
        {show == 'creates' && <NFTGroup type="created" text={`Created (${createdLists.length} items)`} lists={createdLists} nfts={NFTLists} />}

        {/* Footer */}
        <div className="text-white text-center text-sm mt-8">© 2021 Galleryst.com, All rights reserved.</div>

      </div>
    </div>
  </div>
}

export async function getServerSideProps(context: any) {

  const { shortUrl } = context.params
  return {
    props: { shortUrl },
  }
}


export default Page
