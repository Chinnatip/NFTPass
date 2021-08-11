import React, { useState, useEffect } from 'react'
import ProfilePage from '@/ProfilePage'
import * as firebase from "../method/firebase"
import { Profile } from '../method/rarible/interface'
import { Drop } from '../method/nifty/interface'
import { Galleryst } from '../interfaces/index'
import { ConnectBtn } from '@/Galleryst'
import { NextSeo } from 'next-seo';
import { prepareURI } from '../method/integrate'

const Page = ({ seo, response }: {
  response?: any
  seo: {
    image: string,
    title: string,
    description: string
  }
}) => {
  const [profile, setProfile] = useState<Profile>(response != undefined ? response.profile : {})
  const [claimStage, setClaimStage] = useState(false)
  const [gallery, setGalleryst] = useState<string[]>([])
  const [NFTLists, setNFTLists] = useState<Galleryst[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  const [onsaleLists, setOnsaleLists] = useState<string[]>([])
  const [createdLists, setCreatedLists] = useState<string[]>([])
  const [dropLists, setDropLists] = useState<Drop[]>([])
  const [toggle, setToggle] = useState<'drops'|'creates'|'collection'>('collection')
  const stateLists = { NFTLists, ownLists, onsaleLists, createdLists, dropLists }
  const stateAction = { setProfile, setOwnLists, setOnsaleLists, setDropLists, setCreatedLists, setNFTLists }
  useEffect(() => {
    (async () => {
      if (response != undefined) {
        const { profile, galleryst, ownLists, onsaleLists, dropLists, createdLists, NFTLists } = response
        setProfile(profile)
        setOwnLists(ownLists)
        setOnsaleLists(onsaleLists)
        setDropLists(dropLists)
        setCreatedLists(createdLists)
        setNFTLists(NFTLists)
        setGalleryst(galleryst)

        // Config toggle
        if(onsaleLists.length == 0 && ownLists.length == 0 && createdLists.length > 0) setToggle('creates')
      }
    })()
  }, []);

  return <div className="w-screen h-screen pt-0 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <NextSeo
      title={seo.title}
      description={seo.description}
      canonical="https://www.canonical.ie/"
      openGraph={{
        site_name: 'Galleryst',
        url: `https://www.galleryst.co/profile?address=${profile.address}`,
        title: seo.title,
        description: seo.description,
        images: [{ url: seo.image, alt: seo.title, width: 1200, height: 600 }]
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <div className="w-full">
      <div className="md:w-4/5 w-full m-auto flex justify-between  items-center">
        <a className="focus:outline-none" href="/">
          <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
        </a>
        <ConnectBtn />
      </div>
      <ProfilePage toggle={toggle} galleryst={gallery} setToggle={setToggle}  claimStage={claimStage} setClaimStage={setClaimStage}  profile={profile} action={stateAction} lists={stateLists} />
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
    const { profile: { pic, name } } = response
    const prepareText = name ? `View%20${prepareURI(name)}%27s%20NFT%20portfolio%20on%20Galleryst` : 'View%20My%20NFT%20portfolio%20on%20Galleryst'
    const constructImage = `https://api.placid.app/u/9h6ycuatn?&profile_image[image]=${encodeURIComponent(pic)}&title-copy[text]=${prepareText}`
    return {
      props: {
        response,
        seo: {
          image: constructImage,
          title: `${name} - Galleryst`,
          description: response.profile?.description != undefined ? response.profile?.description : ''
        }
      }
    }
  } else {
    return {
      props: { seo },
    }
  }
}


export default Page
