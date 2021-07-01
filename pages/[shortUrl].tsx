import React, { useState, useEffect } from 'react'
import * as firebase from "../method/firebase"
import { Profile } from '../method/rarible/interface'
import { Drop} from '../method/nifty/interface'
import { Galleryst } from '../interfaces/index'
<<<<<<< HEAD
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
=======
import { ConnectBtn } from '@/Galleryst'
import ProfilePage from '@/ProfilePage'
>>>>>>> 215ffdbe8582132ed10e1aa8ffcebb101a43c2ea

const Page  = ({ shortUrl }: { shortUrl: string }) => {
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
      const document = await firebase.findDocument("creatorParcel", shortUrl, "profile.shortUrl")
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

  return <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <ConnectBtn />
    <ProfilePage profile={profile} action={stateAction} lists={stateLists} />
  </div>
}

export async function getServerSideProps(context: any) {

  const { shortUrl } = context.params
  return {
    props: { shortUrl },
  }
}


export default Page
