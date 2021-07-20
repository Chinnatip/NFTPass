import React, { useState, useEffect } from 'react'
import * as firebase from "../method/firebase"
import { Profile } from '../method/rarible/interface'
import { Drop } from '../method/nifty/interface'
import { Galleryst } from '../interfaces/index'
import { ConnectBtn } from '@/Galleryst'
import ProfilePage from '@/ProfilePage'

const Page = ({ shortUrl }: { shortUrl: string }) => {
  const [profile, setProfile] = useState<Profile>({})
  const [NFTLists, setNFTLists] = useState<Galleryst[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  const [onsaleLists, setOnsaleLists] = useState<string[]>([])
  const [createdLists, setCreatedLists] = useState<string[]>([])
  const [dropLists, setDropLists] = useState<Drop[]>([])
  const stateLists = { NFTLists, ownLists, onsaleLists, createdLists, dropLists }
  const stateAction = { setProfile, setOwnLists, setOnsaleLists, setDropLists, setCreatedLists, setNFTLists }
  useEffect(() => {
    (async () => {
      const document = await firebase.findDocument("creatorParcel", shortUrl, "profile.shortUrl")
      if (document.docs.length > 0) {
        const doc = document.docs[0]
        const response: any = doc.data()
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

    <div className="w-full">
      <div className="md:w-4/5 w-full m-auto flex justify-between  items-center">
        <a className="focus:outline-none" href="/">
          <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
        </a>
        <ConnectBtn />
      </div>
      <ProfilePage profile={profile} action={stateAction} lists={stateLists} />
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
