import dayjs from 'dayjs'
import * as firebase from "../method/firebase"
import { Profile, RaribleGetResponse } from './rarible/interface'
import { OpenseaGetResponse } from './opensea/interface'
import { NiftyGetResponse } from './nifty/interface'
import { FoundationGetResponse } from './foundation/interface'
import * as rarible from './rarible/fetch'
import * as opensea from './opensea/fetch'
import * as nifty from './nifty/fetch'
import * as foundation from './foundation/fetch'
import axios from 'axios'
import { withError } from 'utils/promise.util'
import { raribleImg } from './rarible/method'
import { NFTDetail, ResponseDetail, Galleryst, NFTS, NFTMetadata } from '../interfaces/index'
import { getAddress } from '@ethersproject/address'

const checkMarket = (action: any, profile: Profile, lists: any, market: string) => {
  if(lists.allID.length > 0) {
    let marketCheck: any = profile.marketCheck
    marketCheck[market] = true
    profile = {...profile, ...{
      marketCheck: marketCheck
    } }
    action(profile)
  }
}

export const sanitizeArray = (objs: Galleryst[]) => {
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

const getUserProfile = async (address: string): Promise<Profile> => {
  const [resp, errResp] = await withError(rarible.userInfo(address))
  if (errResp == null ) {
    if(resp.data != undefined && resp.data?.name != undefined && resp.data?.image != undefined){
      const { name, id, image , imageMedia } = resp.data
      let useImage = raribleImg(image)
      if(imageMedia.length > 0 && imageMedia[imageMedia.length - 1].url != undefined){
        useImage = imageMedia[imageMedia.length - 1].url
      }
      let restructureResp = {
        ...resp.data,
        username: name,
        address: id,
        pic: useImage,
        marketCheck: {},
        // meta: metaResp.data,
      }
      delete restructureResp.name;
      delete restructureResp.id;
      delete restructureResp.image;
      delete restructureResp.acceptedTerms;
      delete restructureResp.blacklisted;
      delete restructureResp.badges;
      // console.log(restructureResp)
      return restructureResp
    }
  }
  const [opsUser, errOps] = await withError(opensea.userInfo(address))
  if (!errOps && opsUser != undefined) {
    return { ...opsUser, marketCheck: {}}
  }
  const [fndUser, errFnd] = await withError(foundation.userInfo(address))
  if (!errFnd) {
    return {...fndUser, marketCheck: {}}
  }
  return { marketCheck: {}, pic: 'https://www.galleryst.co/favicon/ms-icon-310x310.png', address }
}

export const fetchNFT = async (address: string, action: any) => {
  const resp = await axios(`/api/fetch?address=${address}`)
  const {setOwnLists, setNFTLists, setCreatedLists} = action
  if(resp.status == 200){
    const response : any  = resp.data
    const NFTdata: NFTS = response

    setOwnLists(NFTdata.ownLists)

    let lists : NFTMetadata[] = []
    let parseCreatedList : string[] = []

    NFTdata.nfts.map(id => {
      if(id.split(':')[1] != ''){
        firebase.findbyAddress('metadata', id).then(doc => {
          if(doc.exists){
            const data: any = doc.data()
            const metadata : NFTMetadata = data
            lists = [...lists , metadata]
            setNFTLists(lists)
            const checkSumCreator = getAddress(metadata.creators)
            const checkSumAddress = getAddress(address)
            if(checkSumCreator == checkSumAddress){
              parseCreatedList = [...parseCreatedList, id]
            }
            setCreatedLists(parseCreatedList)
          }else{
            axios(`/api/metadata?address=${id}`).then(res => {
              if(res.status == 200){
                const data: any = res.data
                const metadata : NFTMetadata = { ...data ,
                  token: id,
                  token_address: id.split(':')[0],
                  token_id: id.split(':')[1],
                  collection: NFTdata.collection.find(col => col.address == id.split(':')[0])
                }
                lists = [...lists , metadata]
                const checkSumCreator = getAddress(metadata.creators)
                setNFTLists(lists)
                firebase.writeDocument('metadata', id, metadata)
                if(checkSumCreator == address){
                  parseCreatedList = [...parseCreatedList, id]
                }
                setCreatedLists(parseCreatedList)
              }
            })
          }
        })
       
      }
    })
  }
}

export const creatorFetch = async (address: string, action: any , nifty_slug: string | false, profile?: Profile, loginModal?: boolean, setClaimStage?: any) => {
  let rari : RaribleGetResponse  = { onsale: [], created: [], owned: [], allID: [], items: [] }
  let fnd : FoundationGetResponse = { onsale: [], created: [], owned: [], allID: [], items: [] }
  let os : OpenseaGetResponse = { onsale: [], created: [], owned: [], allID: [], items: [] }

  // Nifty gateway NFTs
  let nf : NiftyGetResponse = nifty.construct()
  if(nifty_slug != false){
    nf  = await nifty.fetchOwnBySlug(nifty_slug)
    action.setDropLists(nf.drops)
  }

  // Fetch and collect data
  let userProfile = await getUserProfile(address)
  userProfile['shortUrl'] = userProfile['shortUrl'] != undefined ? userProfile['shortUrl'] : makeid(5)
  userProfile['verified'] = false
  userProfile['name'] = userProfile['username'] != undefined ? userProfile['username'] : `Creator`
  let updateProfile = profile !== undefined ? profile : userProfile
  action.setProfile(updateProfile)

  checkMarket(action.setProfile, updateProfile, nf, 'nifty')

  // Auto popup ClaimModal after load creator information from anny platform
  if(loginModal){
    setClaimStage(true)
  }

  // Rarible NFTs
  rari = await rarible.ownByAddress(address, {
    setOwnLists: action.setOwnLists,
    setOnsaleLists: action.setOnsaleLists,
    setCreatedLists: action.setCreatedLists })
  checkMarket(action.setProfile, updateProfile, rari, 'rarible')

  // Opensea NFTs
  os = await opensea.ownByAddress(address)
  checkMarket(action.setProfile, updateProfile, os, 'opensea')

  // Foundation NFTs
  fnd = await foundation.ownByAddress(address)
  checkMarket(action.setProfile, updateProfile, fnd, 'foundation')

  // Collect 3 type of NFTs-ID own by owner
  // address format is ${address:token_id}
  const onsaleLists = [...new Set([...rari.onsale, ...os.onsale, ...nf.onsale, ...fnd.onsale])]
  const ownLists = [...new Set([...rari.owned, ...os.owned, ...nf.owned, ...fnd.owned])]
  const createdLists = [...new Set([...rari.created, ...os.created, ...fnd.created])]
  const dropLists = nf.drops
  action.setOwnLists(ownLists)
  action.setOnsaleLists(onsaleLists)
  action.setCreatedLists(createdLists)

  const total_ids = [...new Set([...rari.allID , ...os.allID, ...nf.allID, ...fnd.allID])]
  let constructNFTlists : Galleryst[] = []

  // Get All rarible items
  rari.items = await rarible.getAllNFTS(rari.allID)
  total_ids.map(id => {
    const findRari = rari.items?.find(item => item.id == id)
    const findNifty = nf.items?.find(item => item.id == id)
    const findOpensea = os.items?.find(item => item.id == id)
    const findFoundation = fnd.items?.find(item => item.id == id)
    const check = {
      rarible: findRari != undefined ,
      opensea: findOpensea != undefined ,
      nifty: findNifty != undefined,
      foundation: findFoundation != undefined
    }
    if (findRari != undefined) {
      constructNFTlists.push({...findRari, check})
    } else if (findNifty != undefined) {
      constructNFTlists.push({...findNifty, check})
    } else if (findOpensea != undefined) {
      constructNFTlists.push({...findOpensea, check})
    } else if (findFoundation != undefined) {
      constructNFTlists.push({...findFoundation, check})
    }
  })
  action.setNFTLists(constructNFTlists)
  const NFTLists = sanitizeArray(constructNFTlists)

  //Attach parcel to firebase
  await firebase.writeDocument("creatorParcel", address.toLowerCase(), {
    profile: updateProfile,
    NFTLists: sanitizeArray(NFTLists),
    onsaleLists,
    ownLists,
    createdLists,
    dropLists
  })

  // Config toggle
  if(onsaleLists.length == 0 && ownLists.length == 0 && createdLists.length > 0) {
    action.setToggle('creates')
  }

  return {
    profile: updateProfile,
    NFTLists,
    onsaleLists,
    ownLists,
    createdLists,
    dropLists
  }
}

export const makeotp = (length: number) => {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export const makeid = (length: number) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

// export const selectActivity = (nft: NFTDetail, openseas: NFTDetail) => {
export const selectActivity = (nft: NFTDetail) => {
  return nft.activity
  // if (openseas.activity != undefined) {
  //   return openseas.activity
  // } else {
  //   return nft.activity
  // }
}

export const nftSanitizer = (objs: ResponseDetail) => {
  const clean = (obj: any) => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  }
  const cleaning = clean({
    ...objs,
    data: clean({
      ...objs.data,
      creator: clean(objs.data?.creator),
      owner: objs.data?.owner?.map(ow => clean(ow)),
      offer: clean(objs.data?.offer),
      pricing: clean(objs.data?.pricing),
      activity: objs.data?.activity?.map(ac => {
        return clean({
          ...ac,
          current_owner: clean({ ...ac.current_owner, user: clean(ac.current_owner.user) }),
          previous_owner: clean({ ...ac.previous_owner, user: clean(ac.previous_owner?.user) })
        })
      })
    })
  })
  return cleaning
}

export const checkDiff = (current_update: number, diffAmount: number = 2) => {
  const today = dayjs()
  const updatedAt = dayjs.unix(current_update)
  const diff = diffAmount >= today.diff(updatedAt, 'days')
  return diff
}

export const prepareURI = (text: string) => {
  let rep = (text ?? '').split("#").join("@").split("&").join("-").split("?").join("-")
  return encodeURI(rep)
}
