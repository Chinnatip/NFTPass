import React, { useState, useEffect } from 'react'
import * as firebase from "../../method/firebase"
import { Profile } from '../../method/rarible/interface'
import { Drop} from '../../method/nifty/interface'
import { creatorFetch } from '../../method/integrate'
import { Galleryst } from '../../interfaces/index'
import { walletStore } from 'stores/wallet.store'
import { observer } from 'mobx-react-lite'
import { ConnectBtn } from '@/Galleryst'
import ProfilePage from '@/ProfilePage'

<<<<<<< HEAD
const lockDigit = (price: number) => {
  return (Math.floor( price * 10000) )/ 10000
}

const getUserProfile = async (address: string): Promise<Profile> => {
  const [resp, errResp] = await withError(rarible.userInfo(address))
  const [metaResp, errMetaResp] = await withError(rarible.userMeta(address))
  if (!errResp && !errMetaResp) {
    return { ...resp.data, pic: raribleImg(resp.data?.pic), meta: metaResp.data, marketCheck: {} }
  }
  const [fndUser, errFnd] = await withError(foundation.userInfo(address))
  if (!errFnd) {
    return {...fndUser, marketCheck: {}}
  }
  return { marketCheck: {} }
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
        style={{ color: '#9A6B6B', backgroundColor: '#9A6B6B29' }}
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

const Page = observer(({ address, nifty_slug }: {address: string | false, nifty_slug: string | false}) => {
=======
const Page = observer(({ address, nifty_slug }: {address: string , nifty_slug: string | false}) => {
>>>>>>> 215ffdbe8582132ed10e1aa8ffcebb101a43c2ea
  const [profile, setProfile] = useState<Profile>({})
  const [NFTLists, setNFTLists] = useState<Galleryst[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  const [onsaleLists, setOnsaleLists] = useState<string[]>([])
  const [createdLists, setCreatedLists] = useState<string[]>([])
  const [dropLists, setDropLists] = useState<Drop[]>([])
  const stateLists = { NFTLists , ownLists, onsaleLists, createdLists , dropLists }
  const stateAction = { setProfile, setOwnLists, setOnsaleLists, setDropLists, setCreatedLists, setNFTLists }
  useEffect(() => {
    (async () => {
      const document = await firebase.findbyAddress("creatorParcel", `${address}`)
      if(document.exists){
        const response : any = document.data()
        const { profile, ownLists, onsaleLists, dropLists, createdLists, NFTLists } = response
        setProfile(profile)
        setOwnLists(ownLists)
        setOnsaleLists(onsaleLists)
        setDropLists(dropLists)
        setCreatedLists(createdLists)
        setNFTLists(NFTLists)
      }else{
        await creatorFetch(address, stateAction, nifty_slug)
      }
    })()
  }, []);
  return <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <ConnectBtn />
    <ProfilePage wallet={walletStore} profile={profile} action={stateAction} lists={stateLists} />
  </div>
})


export async function getServerSideProps(context: any) {
  const { address , nifty_slug } = context.query
  return {
    props: {
      address: address != undefined ? address : false,
      nifty_slug: nifty_slug != undefined ? nifty_slug : false
    },
  }
}


export default Page
