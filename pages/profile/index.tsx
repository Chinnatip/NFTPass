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

const Page = observer(({ address, nifty_slug }: {address: string , nifty_slug: string | false}) => {
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
