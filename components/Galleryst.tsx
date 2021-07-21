import React, { useState, useRef } from 'react'
import * as firebase from "../method/firebase"
import { faCopy, faSync, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { mask } from 'utils/address.util'
import { walletStore } from 'stores/wallet.store'
import { observer } from 'mobx-react-lite'
import { walletService } from 'services/wallet.service'
import { createPopper } from '@popperjs/core'
import { Profile } from '../method/rarible/interface'
import { creatorFetch } from '../method/integrate'
import { Galleryst, User } from '../interfaces/index'
import { Drop } from '../method/nifty/interface'
import Icon from '@/Icon'

const lockDigit = (price: number) => {
  return (Math.floor(price * 10000)) / 10000
}

// HEADER
export const CreatorHeader = ({ profile, parcel, claimable = false }: { profile: Profile, parcel?: any, claimable?: boolean }) => {
  const [claimStage, setClaimStage] = useState(false)
  return <>
    {/* Creator profile image */}
    <span className="relative">
      <img src={profile?.pic} className="inline-block h-20 w-20 border-4 border-white shadow-nft rounded-full -mt-12 object-cover" />
      {profile?.verified && <span className="absolute -mr-2 -mb-2 bottom-0 right-0 h-6 w-6 inline-flex justify-center items-center bg-green-400 rounded-full text-white shadow-nft">
        <Icon fill={faCheck} noMargin></Icon>
      </span>}
    </span>

    {/* Creator name */}
    <div className="text-3xl">{profile?.username}</div>

    {/* Verify sign */}
    {profile?.verified && <div className="text-gray-500 text-xs mb-5">Verifed by Galleryst</div>}

    {/* Address and claim */}
    <div className="mt-1 mb-6  flex align-middle justify-center m-auto relative">
      <AddressBox address={profile?.address} />
      {claimable && <ClaimBox address={profile.address} profile={profile} action={setClaimStage} />}
      {claimStage && <ClaimModal profile={profile} address={profile.address} parcel={parcel} modalAction={setClaimStage} />}
    </div>

    {/* Contact url */}
    <div className="p-4 pt-0">
      <div className="md:px-8 px-1">{profile?.description}</div>
      <a target="_blank" className="my-2 inline-block text-blue-700" href={profile?.website}>{profile?.website}</a>
    </div>

    {/* Follower */}
    {profile?.meta?.followers != undefined && profile?.meta?.followers > 0 && <div className="p-4 pt-0 text-sm text-gray-500">
      <div className="md:px-8 px-1">
        {profile?.meta?.followers} followers | {profile?.meta?.followings} followings
      </div>
    </div>}
  </>
}

// TOGGLE TAB
export const Toggle = ({ trigger, text, action, toggle, amount }: { trigger: string, text: string, action: any, toggle: string, amount: number }) => {
  return <button
    onClick={() => action(trigger)}
    className={`${toggle == trigger ? 'bg-black text-white' : 'bg-white'} active-shadow shadow-nft mx-2 px-3 py-2 font-semibold text-sm focus:outline-none appearance-none rounded-full `}>
    {text}
    <span className="p-1 ml-1 w-8 rounded-full bg-gray-main text-white inline-block">
      {amount}
    </span>
  </button>
}

// ADDRESS BOX
export const AddressBox = ({ address }: { address: string | undefined }) => {
  const [show, setShow] = useState(false)
  const useCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setShow(true)
    setTimeout(() => { setShow(false) }, 1300);
  }
  return <div className="text-gray-500 text-sm px-3 py-2 bg-white rounded-full shadow-nft flex items-center relative">
    {show && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-8 -mr-2 text-sm rounded-full">Copied !</div>}
    <div className="address-text-wrapper">
      <span className="ellipsis">{address}</span>
      <span className="indent">{address}</span>
    </div>
    {address && <span
      className="text-black w-8 h-8 ml-2 inline-flex items-center justify-center inline-block bg-gray-200 hover:bg-gray-400 rounded-full cursor-pointer"
      onClick={() => { useCopyToClipboard(address != undefined ? address : '') }}>
      <Icon fill={faCopy} noMargin />
    </span>}
  </div>
}

const ClaimBox = ({ address, profile, action }: { address: string | undefined, profile: Profile, action: any }) => {
  return <button
    onClick={() => address != undefined && action(true)}
    className="bg-black text-sm text-white rounded-full inline-block px-3 py-2 ml-3 active-shadow">

    {/* TODO: set roles of viewer and profile owner */}
    <div>
      {profile.verified ? 'Edit profile' : 'Claim this address'}
    </div>
  </button>
}

const ClaimModal = ({ address, parcel, profile, modalAction }: { address: string | undefined, parcel: any, profile: Profile, modalAction: any }) => {
  const [username, setUsername] = useState(profile.username)
  const [shortUrl, setShorthand] = useState(profile.shortUrl)
  const [email, setEmail] = useState(profile.email)
  const [website, setWebsite] = useState(profile.website)
  const [description, setDescription] = useState(profile.description)
  const claimPage = async () => {
    console.log(username, shortUrl, email, website, description)
    // console.log(parcel)
    if (address) {
      await firebase.writeDocument("creatorParcel", address, {
        ...parcel,
        profile: {
          ...parcel.profile,
          username,
          shortUrl,
          email,
          website,
          description
        }
      })
    }
    setTimeout(() => { modalAction(false) }, 1300)
  }
  return <>
    <div className="top-0 left-0 fixed w-screen h-screen bg-black opacity-50" />
    <div className="fixed top-0 left-0 md:w-1/2 w-full px-8 py-8 bg-white z-30 rounded-3xl shadow-nft text-left overflow-scroll " style={{ height: '70vh', transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }}>
      <div className="relative w-full">
        <button onClick={() => modalAction(false)} className="absolute top-0 right-0 border rounded-full h-8 w-8 flex items-center justify-center">
          <Icon fill={faTimes} noMargin />
        </button>
      </div>
      <div className="text-center text-gray-600 text-sm hidden">Edit Profile</div>
      <div className="text-center">
        <img src={profile.pic} className="h-20 rounded-full m-auto border" />
      </div>
      <div className="mt-5 mb-4">
        <div className="text-black">Name</div>
        <input className="bg-white rounded-full shadow-nft w-full px-4 h-12 my-2 text-gray-700" placeholder="Galleryst" value={username} type="text" onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="mt-5 mb-4">
        <div className="text-black">URL</div>
        <span className="w-full flex items-center bg-white rounded-full h-12 my-2 shadow-nft ">
          <span className="ml-4"> galleryst.co/ </span>
          <input className="flex-grow pl-1 px-4 text-gray-700" placeholder="short-url" value={shortUrl} type="text" onChange={e => setShorthand(e.target.value)} />
        </span>
      </div>
      <div className="mt-5 mb-4">
        <div className="text-black">Received Notification via Email</div>
        <input className="bg-white rounded-full shadow-nft w-full px-4 h-12 my-2 text-gray-700" placeholder="Email" value={email} type="email" onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mt-5 mb-4">
        <div className="text-black">Your website</div>
        <input className="bg-white rounded-full shadow-nft w-full px-4 h-12 my-2 text-gray-700" placeholder="Your website" value={website} type="text" onChange={e => setWebsite(e.target.value)} />
      </div>
      <div className="mt-5 mb-4">
        <div className="text-black">Add a bio</div>
        <textarea rows={6} className="bg-white rounded-2xl shadow-nft w-full px-4 py-2 my-2 text-gray-700" placeholder="Enter your short bio" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button onClick={() => claimPage()} className="bg-black w-full h-12 rounded-full text-white">Save</button>
    </div>
  </>
}

// NFT DROPS
export const NFTDrop = ({ lists, text = '' }: { lists: Drop[], text: string }) => {
  return <>
    {lists.length > 0 && <>
      <h2 className="text-xl">{text}</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2 w-full">
        {lists.map(item => {
          const { address, title, image } = item
          return image != undefined && <a target="_blank" href={`/nft?address=${address}`} className="relative cursor-pointer bg-white rounded-16 mb-2 active-shadow" key={`${address}`}>
            <div className="thumbnail-wrapper w-full relative">
              {image.slice(image.length - 3, image.length) == 'mp4' ?
                <video className="rounded-16 border-8 border-white thumbnail-height" src={image} autoPlay loop muted /> :
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

// NFT GROUP
export const NFTGroup = ({ lists, nfts, text = '', type = '' }: { type?: string, text?: string, lists: string[], nfts: Galleryst[] }) => {
  return <>
    {lists.length > 0 && <div className="mx-3 mt-6">
      <h2 className="text-sm bg-gray-200 rounded-full inline-block mb-2 px-3 py-1 shadow-nft text-gray-600 md:mx-4">{text}</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2 w-full">
        {nfts.filter(item => lists.includes(item.id)).map(item => {
          const { imagePreview, check } = item
          return imagePreview != undefined && <a target="_blank" href={`/nft?address=${item.id}`} className="relative cursor-pointer bg-white rounded-16 mb-2 active-shadow" key={`${item.id}`}>
            <div className="thumbnail-wrapper w-full relative">
              {imagePreview.slice(imagePreview.length - 3, imagePreview.length) == 'mp4' ?
                <video className="rounded-16 border-8 border-white thumbnail-height" src={imagePreview} autoPlay loop muted /> :
                <img className="rounded-16 border-8 border-white thumbnail-height" src={imagePreview} />
              }
              <div className="absolute flex justify-end	z-10 bottom-0  w-full mb-2 px-2 pt-6 ">
                <div className="flex px-2 rounded-b-16 pt-10 justify-end w-full" style={{ background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.52) 10%, rgba(196, 196, 196, 0) 50%)' }}>
                  {type == 'onsale' && item.priceETH != undefined &&
                    <span className="text-white font-bold text-right " >
                      {lockDigit(item.priceETH)} ETH
                    </span>}</div>
              </div>
              <span className="absolute bottom-0 left-0 flex flex-col pl-3 pb-4 z-10" >
                {check?.rarible && <span className="bg-yellow-500 h-4 w-4 text-xs rounded-full flex items-center justify-center rarible-logo"></span>}
                {check?.opensea && <span className="bg-blue-500 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center opensea-logo"></span>}
                {check?.foundation && <span className="bg-black text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center foundation-logo"></span>}
                {check?.nifty && <span className="bg-blue-700 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center nifty-logo"></span>}
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

// CONNECT TO WALLET BUTTON
export const ConnectBtn = observer(() => {
  const [show, setShow] = useState(false)
  const btnRef = useRef(null)
  const popperRef = useRef(null)
  createPopper(btnRef.current!, popperRef.current!, { placement: 'bottom-start' })
  const handleClick = async () => {
    if (!show && walletStore.isMetaMaskInstalled) {
      await walletService.getAccounts()
    }
    setShow(!show)
  }
  const getBtnText = () => {
    if (!walletStore.isMetaMaskInstalled) {
      return 'Connect Wallet'
    } else if (walletStore.verified) {
      return `${mask(walletStore.address)} | ${walletStore.readableBalance}`
    } else {
      return 'Connect Wallet'
    }
  }
  return (
    <div className="flex justify-end relative">
      <button
        ref={btnRef}
        onClick={handleClick}
        //disabled={!}
        style={{ color: '#9a6b6b', backgroundColor: '#9a6b6b29' }}
        className={`py-3 px-4 mx-2 font-semibold md:text-sm text-xs focus:outline-none appearance-none my-4 rounded-full ${walletStore.isMetaMaskInstalled ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {getBtnText()}
      </button>
      <div ref={popperRef} className={`${show ? '' : 'hidden'} p-4 rounded-2xl bg-white text-gray-500 absolute mt-20 right-0 z-50 shadow-nft`}>
        {!walletStore.isMetaMaskInstalled && <div>
          To connect to Galleryst please install Metamask to your browser. <a href="https://metamask.io/download.html" target="_blank" className="underline text-black">Get Metamask</a>
        </div>}
        {walletStore.isMetaMaskInstalled && !walletStore.isConnected && walletStore.accounts.length > 0 && <div className="text-sm mb-3 text-center">
          we found {walletStore.accounts.length} account in your wallets <br />
          please select account to verify
        </div>}
        {walletStore.isMetaMaskInstalled && (!walletStore.isConnected && walletStore.accounts.length > 0) && walletStore.accounts.map((account, index) => {
          return (
            <React.Fragment key={account} >
              <button
                className='text-xs bg-white p-3 rounded-full text-black flex items-center shadow-nft'
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
          <>
            {walletStore.address != '' && <a href={`/profile?address=${walletStore.address}`} className=" w-full inline-block bg-white text-black focus:outline-none rounded-full p-2 px-3 flex items-center shadow-nft">
              View My Page
            </a>}
            <button className=" w-full inline-block mt-4 bg-white focus:outline-none rounded-full p-2 px-3 flex items-center shadow-nft text-black" onClick={() => {
              setShow(false)
              walletService.disconnect()
            }}>
              Disconnect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  )
})

// UPDATE ACTION
export const UpdateAction = ({ action, profile }: { action: any, profile: Profile }) => {
  const [show, setShow] = useState(false)
  const { address } = profile
  return <div
    onClick={async () => {
      setShow(true)
      if (address != undefined) {
        const parcel = await creatorFetch(address, action, false, profile)
        await firebase.writeDocument("creatorParcel", address, parcel)
      }
      setShow(false)
    }}
    className="absolute top-0 right-0 mt-5 mr-5 flex items-center button-red py-2 px-3 rounded-full cursor-pointer text-sm font-semibold">
    {show && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-10 text-sm rounded-full w-300">Updating...</div>}
    <Icon fill={faSync} noMargin /><span className="md:block hidden ml-3"> Refresh Address Info</span>
  </div>
}

// FILTER PLATFORM
export const Filter = ({ platform, profile }: { platform: 'rarible' | 'opensea' | 'foundation' | 'nifty', profile: Profile }) => {
  const market: {
    rarible?: boolean
    opensea?: boolean
    foundation?: boolean
    nifty?: boolean
  } = profile.marketCheck != undefined ? profile.marketCheck : {}
  const check = (platform: 'rarible' | 'opensea' | 'foundation' | 'nifty') => {
    switch (platform) {
      case 'rarible':
        return { style: 'text-black bg-yellow-500 rarible-logo ', text: '' }
      case 'opensea':
        return { style: 'text-white bg-blue-500 opensea-logo ', text: '' }
      case 'foundation':
        return { style: 'text-white bg-black foundation-logo ', text: 'F' }
      case 'nifty':
        return { style: 'text-white bg-blue-700 nifty-logo ', text: 'N' }
    }
  }
  const default_style = 'border text-gray-400 bg-gray-200'
  const { text, style } = check(platform)
  return <div className={`h-8 w-8 mx-2 flex items-center justify-center rounded-full shadow-nft text-lg ${market[platform] ? style : default_style}`}>
    {text}
  </div>
}


// export const FilterOnNFT = ({ current, platform, action, targetAction, target }: {
//   target?: NFTDetail,
//   targetAction?: any,
//   platform: any,
//   action: any,
//   current: 'rarible' | 'opensea' | 'foundation' | 'nifty',
// }) => {
//   const market: {
//     rarible?: { status: boolean }
//     opensea?: { status: boolean }
//     foundation?: { status: boolean }
//     nifty?: { status: boolean }
//   } = platform.check != undefined ? platform.check : {}
//   const check = (platform: 'rarible' | 'opensea' | 'foundation' | 'nifty') => {
//     switch (platform) {
//       case 'rarible':
//         return { style: 'text-black bg-yellow-500 rarible-logo logo-48', text: '' }
//       case 'opensea':
//         return { style: 'text-white bg-blue-500 opensea-logo logo-48', text: '' }
//       case 'foundation':
//         return { style: 'text-white bg-black foundation-logo logo-48', text: 'F' }
//       case 'nifty':
//         return { style: 'text-white bg-blue-700 nifty-logo logo-48', text: 'N' }
//     }
//   }
//   const default_style = 'border text-gray-400 bg-gray-200'
//   const { text, style } = check(current)
//   return <div
//     className={`
//       cursor-pointer h-8 w-8 mx-2 flex items-center
//       shadow-xl justify-center rounded-full shadow-nft text-lg
//       ${platform.current == current && 'border-1 border-green-400 shadow-greenery'}
//       ${market[current]?.status ? style : default_style}
//     `}
//     onClick={() => {
//       action({ ...platform, current: current })
//       if (targetAction != undefined) targetAction(target)
//     }}>
//     {text}
//   </div>
// }


export const profilePic = (user: User | undefined) => {
  if (user != undefined) {
    return <a href={`/profile?address=${user.address}`} className="bg-gray-500 mx-2 w-8 h-8 rounded-full inline-flex items-center justify-center">
      <img src={user.image} className="h-8 inline w-8 fix-w-h-xs rounded-full" />
    </a>
  } else {
    return <div className="w-8 h-8 inline bg-gray-600 rounded-full fix-w-h-xs" />
  }
}

export const profileAddress = (user: User | undefined, index: number) => {
  return user != undefined && user?.image != '' ?
    <a key={index} href={`/profile?address=${user.address}`} target="_blank" className="ml-2 mb-2 bg-gray-500 w-10 h-10 rounded-full overflow-hidden inline-flex items-center justify-center">
      <img src={user?.image} className="h-10 inline" />
    </a> :
    <span className="inline-block w-10 h-10 rounded-full bg-purple-500 ml-2 flex items-center justify-center">{user?.name?.substr(0, 1)}</span>
}
