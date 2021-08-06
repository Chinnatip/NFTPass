import React, { useState, useRef } from 'react'
import * as firebase from "../method/firebase"
import { faCopy, faShareAlt, faSync, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { mask } from 'utils/address.util'
import { walletStore } from 'stores/wallet.store'
import { observer } from 'mobx-react-lite'
import { walletService } from 'services/wallet.service'
import { createPopper } from '@popperjs/core'
import UploadButton from '@/UploadButton'
import OtpInput from 'react-otp-input'
import { Profile } from '../method/rarible/interface'
import { creatorFetch, makeotp } from '../method/integrate'
import { Galleryst, User } from '../interfaces/index'
import { Drop } from '../method/nifty/interface'
// import { useRouter } from 'next/router'
import Icon from '@/Icon'
import { WalletProviderName } from 'static/Enum'
import axios from 'axios'

const lockDigit = (price: number) => {
  return (Math.floor(price * 10000)) / 10000
}

const fixPath = (path: string | undefined) => {
  if (path !== undefined) {
    const splitColon = path.split('://')
    if (splitColon.length > 1) {
      return `http://${splitColon[1]}`
    } else {
      return `http://${splitColon[0]}`
    }
  } else {
    return undefined
  }
}

// HEADER
export const CreatorHeader = ({ claimStage = false, setClaimStage, profile, parcel, claimable = false }: { claimStage: boolean, setClaimStage: any, profile: Profile, parcel?: any, claimable?: boolean }) => {
  // const [claimStage, setClaimStage] = useState(false)
  return <>
    {/* Creator profile image */}
    <span className="relative">
      <img src={profile?.pic} className="inline-block h-20 w-20 border-4 border-white shadow-nft rounded-full -mt-8 object-cover" />
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
      <a target="_blank" className="my-2 inline-block text-blue-700" href={fixPath(profile?.website)}>{profile?.website}</a>
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
      className="text-black w-8 h-8 ml-2 inline-flex items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-full cursor-pointer"
      onClick={() => { useCopyToClipboard(address != undefined ? address : '') }}>
      <Icon fill={faCopy} noMargin />
    </span>}
  </div>
}

const ClaimBox = ({ address, action, profile }: { address: string | undefined, profile: Profile, action: any }) => {
  return <button
    onClick={() => address != undefined && action(true)}
    className="relative button-red text-sm  rounded-full inline-block px-3 py-2 ml-3 active-shadow font-semibold">
    <div>
      <Icon fill={faEdit} />
      {profile.verified ? 'Edit Profile' : 'Claim Profile'}
    </div>
    {profile.verified && !profile.emailConfirmed && <div className="absolute top-0 right-0 bg-red-600 h-3 w-3 rounded-full " />}
  </button>
}

const ClaimModal = ({ address, parcel, profile, modalAction }: { address: string | undefined, parcel: any, profile: Profile, modalAction: any }) => {
  const [present, setPresent] = useState('profileEditor')
  const [username, setUsername] = useState(profile.username)
  const [shortUrl, setShorthand] = useState(profile.shortUrl)
  const [email, setEmail] = useState(profile.email)
  const [emailState, setEmailState] = useState(profile.email)
  const [emailConfirmed, setEmailConfirmed] = useState(profile.emailConfirmed ? profile.emailConfirmed : false)
  const [pic, setProfileImg] = useState(profile?.pic)
  const [website, setWebsite] = useState(profile.website)
  const [otp, setOtp] = useState('')
  const [otpErr, setOtpError] = useState(false)
  const [description, setDescription] = useState(profile.description)
  // const router = useRouter()
  const claimPage = async () => {
    let checkShortURL = true
    let checkAddress = address != undefined ? true : false
    // Check duplicate shortURL
    if (shortUrl != undefined && shortUrl != profile.shortUrl) {
      const document = await firebase.findDocument("creatorParcel", shortUrl, "profile.shortUrl")
      if (document.docs.length > 0) {
        checkShortURL = false
      }
    }
    // Check cirrect address
    if (checkAddress && address && checkShortURL) {
      await firebase.writeDocument("creatorParcel", address, {
        ...parcel,
        profile: {
          ...parcel.profile,
          username,
          pic,
          name: username,
          shortUrl,
          email: email && email.length > 4 && emailConfirmed ? email : undefined ,
          emailConfirmed,
          website,
          description
        }
      })
      // Reload page
      if (window != undefined) {
        walletStore.setDatabaseVerified(true)
        window.location.href = `/profile?address=${address}`
      }
    } else {
      alert('Oops! This URL is already taken. Please try again.')
    }
    // setTimeout(() => { modalAction(false) }, 1300)
  }
  const sendVerifyEmail = async (email: string) => {
    const otp = await makeotp(4)
    // Create OTP session on firebase
    await firebase.writeDocument("emailVerify", email, { otp: otp })
    // Send OTP code to email
    await axios.post('/api/verifyEmailer', { otp, email })
  }

  const otpInput = async (e: string, email: string | undefined) => {
    if (email == undefined) return undefined
    if (e.length == 1) {
      setOtpError(false)
      setOtp(e)
    } else if (e.length == 4) {
      const document = await firebase.findbyAddress('emailVerify', email)
      if (document.exists) {
        const { otp }: any = document.data()
        if (otp == e) {
          setEmailConfirmed(true)
          setEmailState(email)
          setPresent('profileEditor')
        } else {
          setOtp('')
          setOtpError(true)
        }
      } else {
        setOtp('')
        setOtpError(true)
      }
    } else {
      setOtp(e)
    }
  }
  return <>
    <div className="top-0 left-0 fixed w-screen h-screen bg-black opacity-50" />
    {present == 'otpValidator' && <div className="fixed top-0 left-0 px-10 py-10 bg-white z-30 rounded-3xl shadow-nft text-left overflow-scroll " style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }}>
      <div className="text-lg font-bold">{!otpErr ? 'Confirm your email' : 'Please input correct otp code'}</div>
      <OtpInput
        value={otp}
        onChange={(e: string) => otpInput(e, email)}
        numInputs={4}
        isInputNum={true}
        hasErrored={otpErr}
        errorStyle={{ border: '1px solid red' }}
        inputStyle={{ fontSize: '1.7rem', width: '80px', height: '72px', boxShadow: '0px 8px 20px 5px rgba(0, 0, 0, 0.08)', borderRadius: '15px', margin: '20px 7px' }}
      // separator={<span>-</span>}
      />
      <div className="text-gray-500 text-sm">
        We sent a verification code to '{email}'. <br />
        Haven't you got the code try <button onClick={() => otpInput('', email)} className="underline">resend</button>
      </div>
      <div className="text-gray-500 mt-4 text-sm">
        <button className="underline" onClick={() => {
          otpInput('', email)
          setPresent('profileEditor')
        }} >Wrong email? Let's start over</button>
      </div>
    </div>}
    {present == 'profileEditor' && <div className="fixed top-0 left-0 md:w-1/2 w-full px-8 py-8 bg-white z-30 rounded-3xl shadow-nft text-left overflow-scroll " style={{ height: '70vh', transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }}>
      <div className="relative w-full">
        <button onClick={() => modalAction(false)} className="absolute top-0 right-0 border rounded-full h-8 w-8 flex items-center justify-center">
          <Icon fill={faTimes} noMargin />
        </button>
      </div>
      <div className="text-center text-gray-600 text-sm hidden relative">
        Edit Profile
      </div>
      <div className="text-center">
        <img src={pic} className="rounded-full m-auto border border-white border-4 shadow-lg h-20 w-20 object-cover" />
        <UploadButton action={setProfileImg} />
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
        <div className="flex w-full items-center ">
          <input className="bg-white rounded-full shadow-nft flex-grow px-4 h-12 my-2 text-gray-700" placeholder="Email" value={email} type="email" onChange={e => setEmail(e.target.value)} />
          {(emailConfirmed && email == emailState) ?
            <span className=" flex items-center bg-white text-black border-gray-300 border-2 rounded-full ml-3 px-3 h-12"><span className="text-green-400"><Icon fill={faCheck} /></span> Verified</span> :
            <button onClick={() => {
              if (email != undefined && email.length > 4) {
                sendVerifyEmail(email)
                setPresent('otpValidator')
                setOtp('')
              }
            }} className={` ${(email != undefined && email.length > 4) ? 'bg-black text-white' : 'bg-gray-400 text-white'}  rounded-full ml-3 px-3 h-12`}>Verify Email</button>}
        </div>
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
    </div>}
  </>
}

// NFT DROPS
export const NFTDrop = ({ lists, text = '' }: { lists: Drop[], text: string }) => {
  return <>
    {lists.length > 0 && <>
      <h2 className="text-xl">{text}</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-3 md:gap-4 md:p-4 p-0 gap-1 w-full">
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
    {lists.length > 0 && <div className="mx-1 mt-6">
      <h2 className="text-sm bg-gray-200 rounded-full inline-block mb-2 px-3 py-1 shadow-nft text-gray-600 md:mx-4">{text}</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-3 md:gap-4 md:p-4 p-0 gap-1 w-full">
        {nfts.filter(item => lists.includes(item.id)).map(item => {
          const { imagePreview, check, alternateUrl } = item
          // @ts-ignore
          const onImgError = (event) => {
            event.target.onerror = null;
            event.target.src = alternateUrl;
          }
          return imagePreview != undefined && <a target="_blank" href={`/nft?address=${item.id}`} className="relative cursor-pointer bg-white rounded-16 mb-0 active-shadow" key={`${item.id}`}>
            <div className="thumbnail-wrapper w-full relative">
              {imagePreview.slice(imagePreview.length - 3, imagePreview.length) == 'mp4' ?
                <video className="rounded-16  md:border-8 border-4 border-white thumbnail-height" autoPlay loop muted>
                  <source src={imagePreview} />
                  <source src={alternateUrl} />
                </video> :
                <img className="rounded-16 md:border-8 border-4 border-white thumbnail-height" src={imagePreview} onError={onImgError} />
              }
              <div className="absolute flex justify-end	z-10 bottom-0  w-full md:mb-2 md:px-2 mb-1 px-1 pt-6 ">
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
    setShow(!show)
  }
  const getBtnText = () => {
    if (walletStore.loading) {
      return <>
        <svg className="animate-spin mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {walletStore.stage}
      </>
    }
    if (walletStore.verified) {
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
        disabled={walletStore.loading}
        style={{ color: '#9a6b6b', backgroundColor: '#9a6b6b29' }}
        className={`py-3 px-4 mx-2 font-semibold md:text-sm text-xs focus:outline-none appearance-none my-4 rounded-full ${walletStore.isMetaMaskAvailable ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {getBtnText()}
      </button>
      <div ref={popperRef} className={`${show ? '' : 'hidden'} p-4 rounded-2xl bg-white text-gray-500 absolute mt-20 right-0 z-50 shadow-nft`} style={{ width: '200px' }} >
        {/* MetaMask not available */}
        {!walletStore.isMobileBrowser && !walletStore.isMetaMaskAvailable && <div>
          <a href="https://metamask.io/download.html" target="_blank" className="underline text-black">Get Metamask</a>
        </div>}
        {/* Show only if MetaMask is available */}
        {walletStore.isMetaMaskAvailable && !walletStore.isConnected &&
          <button
            className='text-xs bg-white p-3 mb-3 w-full rounded-full text-black flex items-center shadow-nft'
            onClick={() => {
              setShow(false)
              walletService.connect(WalletProviderName.MetaMask)
            }}
          >

            <div className="flex flex-row "><img src={`/image/metamask_logo.png`} className="h-4 w-4 object-contain rounded-full" /> <span className="ml-1">MetaMask </span></div>
          </button>
        }
        {/* WalletConnect always available */}
        {!walletStore.isConnected &&
          <button
            className='text-xs bg-white p-3 mt-2 rounded-full w-full text-black flex items-center shadow-nft'
            onClick={() => {
              setShow(false)
              walletService.connect(WalletProviderName.WalletConnect)
            }}
          >
            <img src="/image/walletconnect_logo.png" className="h-4 w-4 object-contain rounded-full" />
            <span className="ml-1">WalletConnect</span>
          </button>
        }
        {walletStore.isConnected && (
          <>
            {walletStore.address != '' && !walletStore.dbVerified ?
              <a href={`/profile?address=${walletStore.address}&loginModal=true`} className=" w-full inline-block bg-black text-white focus:outline-none rounded-full p-2 px-3 flex items-center shadow-nft">Claim My Page</a> :
              <a href={`/profile?address=${walletStore.address}`} className=" w-full inline-block bg-black text-white focus:outline-none rounded-full p-2 px-3 flex items-center shadow-nft">View My Page</a>}
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


// SHARE ACTION
export const ShareAction = ({ gallerystID }: { gallerystID: string }) => {
  const [copied, setCopied] = useState(false)
  const useCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 1300);
  }
  return <div className="absolute top-0 right-0 mr-0 mt-0 flex items-center py-2 px-2 rounded-full cursor-pointer text-sm font-semibold">
    <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURI(`https://www.galleryst.co/${gallerystID}`)}`} data-size="large" className="shadow-nft mr-4 bg-white text-black w-auto rounded-full py-3 md:w-auto px-4  text-black active-shadow flex items-center justify-center">
      <img src="/image/twitter_logo.svg" style={{ height: '16px' }} className="" /> <span className="hidden">Tweet</span></a>
    <button
      className="shadow-nft  bg-white w-auto rounded-full py-3 md:w-auto px-4  text-black active-shadow flex items-center justify-center"
      onClick={() => useCopyToClipboard(`https://www.galleryst.co/${gallerystID}`)}>
      {copied && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-10 mr-0 text-sm rounded-full w-max">Copied Link!</div>}
      <Icon fill={faShareAlt} noMargin /> <span className="ml-2 md:block hidden">Share </span>
    </button>
  </div>
}

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
    className="absolute top-0 left-0 mt-2 ml-2 flex items-center button-red py-2 px-2 rounded-full cursor-pointer text-sm font-semibold">
    {show && <div className="absolute bg-black text-white top-0 right-0 p-1 px-2 -mt-10 text-sm rounded-full w-300">Updating...</div>}
    <Icon fill={faSync} noMargin /><span className="md:block hidden ml-3"> Refresh Info</span>
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
        return { style: 'text-black bg-yellow-500 rarible-logo ', text: '', ref: 'Rarible' }
      case 'opensea':
        return { style: 'text-white bg-blue-500 opensea-logo ', text: '', ref: 'Opensea' }
      case 'foundation':
        return { style: 'text-white bg-black foundation-logo ', text: '', ref: 'Foundation' }
      case 'nifty':
        return { style: 'text-white bg-blue-700 nifty-logo ', text: '', ref: 'Nifty Gateway' }
    }
  }
  const default_style = 'border text-gray-400 bg-gray-200 hidden'
  const { text, style } = check(platform)
  return <div className={`h-8 w-8 mx-2 flex items-center justify-center rounded-full shadow-nft text-lg ${market[platform] ? style : default_style}`}>
    {!market[platform] && text}
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
