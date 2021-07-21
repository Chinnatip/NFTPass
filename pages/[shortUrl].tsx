import React, { useState, useEffect } from 'react'
import ProfilePage from '@/ProfilePage'
import * as firebase from "../method/firebase"
import { Profile } from '../method/rarible/interface'
import { Drop } from '../method/nifty/interface'
import { Galleryst } from '../interfaces/index'
import { ConnectBtn } from '@/Galleryst'
// import { prepareURI } from '../method/integrate'

const Page = ({ seo, response }: {
  response?: any
  seo: {
    image: string,
    title: string,
    description: string
  }
}) => {
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
      if (response != undefined) {
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
      <div className="md:w-4/5 w-full m-auto flex justify-between">
        <a className="focus:outline-none" href="/">
          <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
        </a>
        <ConnectBtn />
      </div>
      <ProfilePage seo={seo} profile={profile} action={stateAction} lists={stateLists} />
    </div>
  </div>
}

export async function getServerSideProps(context: any) {
  const { shortUrl } = context.params
  let seo = {
    image: '',
    title: '',
    description: ''
  }
  const document = await firebase.findDocument("creatorParcel", shortUrl, "profile.shortUrl")
  if (document.docs.length > 0) {
    const doc = document.docs[0]
    const response: any = doc.data()
    const { profile: {  name , description} } = response
    const constructImage =  'https://api.placid.app/u/9h6ycuatn?&profile_image[image]=https%3A%2F%2Fimages.rarible.com%2F%3Ffit%3Doutsize%26n%3D-1%26url%3Dhttps%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmQs6Ana1AtCyDHwCtmsbUQ2CtA8LsgdL1JUTyRSvPpneC%26w%3D240&title-copy[text]=Explore+PSSYPL%27s'
    //'https://api.placid.app/u/9h6ycuatn?&profile_image[image]=https://images.rarible.com/-fit=outsize-n=-1-url=https://ipfs.rarible.com/ipfs/QmQs6Ana1AtCyDHwCtmsbUQ2CtA8LsgdL1JUTyRSvPpneC-w=240&title-copy[text]=Explore%20Thanonvon%27s' ///`https://api.placid.app/u/9h6ycuatn?&profile_image[image]=${prepareURI(pic)}&title-copy[text]=${prepareURI(`Explore ${name}'s`)}`
    return {
      props: {
        response,
        seo: {
          image: constructImage,
          title: name,
          description: description
        }
      }
    }
  }else{
    return {
      props: { seo },
    }
  }
}


export default Page
