import React, { useState, useEffect } from 'react'
import * as firebase from "../../method/firebase"
import ProfilePage from '@/ProfilePage'
import { Profile } from '../../method/rarible/interface'
import { Drop } from '../../method/nifty/interface'
import { creatorFetch, prepareURI } from '../../method/integrate'
import { Galleryst } from '../../interfaces/index'
import { observer } from 'mobx-react-lite'
import { ConnectBtn } from '@/Galleryst'
import { NextSeo } from 'next-seo'

const Page = observer(({ address, nifty_slug, seo, response }: {
  address: string,
  nifty_slug: string | false
  seo: {
    image: string,
    title: string,
    description: string
  }
  response?: any
}) => {
  const [profile, setProfile] = useState<Profile>(response != undefined ? response.profile : {
    pic: 'https://www.galleryst.co/favicon/ms-icon-310x310.png',
    address
  })
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
      } else {
        await creatorFetch(address, stateAction, nifty_slug)
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
    <div className="md:w-4/5 w-full m-auto flex justify-between items-center">
      <a className="focus:outline-none" href="/">
        <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
      </a>
      <ConnectBtn />
    </div>
    <ProfilePage profile={profile} action={stateAction} lists={stateLists} />
  </div>
})


export async function getServerSideProps(context: any) {
  const { address, nifty_slug } = context.query
  let seo = {
    image: '',
    title: '',
    description: ''
  }
  const document = await firebase.findbyAddress("creatorParcel", `${address.toLowerCase()}`)
  if (document.exists) {
    const response: any = document.data()
    const { profile: { pic, name } } = response
    const constructImage = `https://api.placid.app/u/9h6ycuatn?&profile_image[image]=${encodeURIComponent(pic)}&title-copy[text]=View+${prepareURI(name)}%27s+NFT`
    return {
      props: {
        address: address != undefined ? address : false,
        nifty_slug: nifty_slug != undefined ? nifty_slug : false,
        seo: {
          image: constructImage,
          title: `${name} - Galleryst`,
          description: response.profile?.description != undefined ? response.profile?.description : ''
        },
        response
      },
    }
  } else {
    return {
      props: {
        address: address != undefined ? address : false,
        nifty_slug: nifty_slug != undefined ? nifty_slug : false,
        seo
      },
    }
  }
}


export default Page
