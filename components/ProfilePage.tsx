import React, { useState, useEffect } from 'react'
import * as firebase from "../method/firebase"
import { Profile } from '../method/rarible/interface'
import { sanitizeArray } from '../method/integrate'
import { walletStore } from 'stores/wallet.store'
import { CreatorHeader, ShareAction, UpdateAction, Filter, Toggle, NFTDrop, NFTGroup } from '@/Galleryst'

type Section = {
  id: string
  name: string
  nftLists: string[]
}

const ProfilePage = ({ toggle, galleryst, setToggle, profile, action, lists, claimStage = false, setClaimStage }: {
  profile: Profile,
  action: any,
  lists: any,
  claimStage: boolean
  setClaimStage: any
  toggle: 'drops' | 'creates' | 'collection' | 'gallery'
  setToggle: any
  galleryst?: string[]
}) => {
  const [collections, setCollection] = useState<Section[]>([])
  const { onsaleLists, ownLists, createdLists, dropLists, NFTLists } = lists
  const parcel = {
    profile: { ...profile, verified: true },
    NFTLists: sanitizeArray(NFTLists),
    onsaleLists,
    ownLists,
    createdLists,
    dropLists
  }
  const wallet = walletStore
  const address = profile.address
  const claimCheck = address == wallet?.address //&& profile?.verified != true //true

  useEffect(() => {
    (async () => {
      if (galleryst != undefined && galleryst.length > 0) {
        let colls: Section[] = []
        console.log(galleryst)
        await Promise.all(galleryst.map(async (gallID) => {
          const collection = await firebase.findbyAddress('galleryst', gallID)
          if (collection.exists) {
            const colGet: any = collection.data()
            // console.log(colGet)
            colls.push(colGet)
          }
        }))
        setCollection(colls)
      }
    })()
  }, [galleryst]);

  return <div className="md:w-4/5 w-full m-auto z-10 relative">

    {profile.shortUrl && <ShareAction gallerystID={profile.shortUrl != undefined ? `${profile.shortUrl}` : `profile?address=${profile.address}`} />}
    <div className="rounded-24 border border-white shadow-nft mt-20 mb-20 pb-10" style={{ background: 'rgba(185, 184, 184, 0.32)', borderRadius: '24px' }}>
      <div className="bg-white" style={{ borderRadius: '24px 24px 0px 0px' }}>
        <div className="text-center">
          {/* Creator header */}
          <CreatorHeader claimStage={claimStage} setClaimStage={setClaimStage} profile={profile} parcel={parcel} claimable={claimCheck} />

          {/* Tabbar */}
          <div className="mb-8 inline-block" >
            <Toggle text="Owned" trigger="collection" action={setToggle} toggle={toggle} amount={ownLists.length} />
            <Toggle text="Created" trigger="creates" action={setToggle} toggle={toggle} amount={createdLists.length} />
            {dropLists.length > 0 && <Toggle text="Drops" trigger="drops" action={setToggle} toggle={toggle} amount={dropLists.length} />}
          </div>
        </div>
      </div>

      {/* NFT controller */}
      <div className="py-3 text-center flex justify-center items-center bg-gray-100">
        <span className="text-sm text-gray-500 mr-1 hidden">Filter by marletplace</span>
        <Filter platform="rarible" profile={profile} />
        <Filter platform="opensea" profile={profile} />
        <Filter platform="foundation" profile={profile} />
        <Filter platform="nifty" profile={profile} />
      </div>

      {/* Gallery */}
      <div className="h-4 relative" />
      <div className="flex w-full justify-end">
        { claimCheck && <a href={`/customize/${profile.shortUrl}`} className="rounded-full h-10 flex py-2 px-2 justify-self-end items-center justify-center button-red mr-3">
          <span className="md:block text-center text-sm">Edit Page</span>
        </a>}
        <UpdateAction profile={profile} action={action} />
      </div>
      {toggle == 'drops' && <NFTDrop text={`Nifty drops (${dropLists.length} items)`} lists={dropLists} />}

      {toggle == 'collection' && <>
        {collections.map(({ name, nftLists }) => <NFTGroup type="onsale" text={`${name} (${nftLists.length} items)`} lists={nftLists} nfts={NFTLists} />)}
        <NFTGroup type="onsale" text={`On sale (${onsaleLists.length} items)`} lists={onsaleLists} nfts={NFTLists} />
        <NFTGroup type="owned" text={`Owned by ${profile?.username} (${ownLists.length} items)`} lists={ownLists} nfts={NFTLists} /></>}
      {toggle == 'creates' && <NFTGroup type="created" text={`Created (${createdLists.length} items)`} lists={createdLists} nfts={NFTLists} />}

      {/* Footer */}
      <div className="text-white text-center text-sm mt-8">© 2021 Galleryst.co, All rights reserved.</div>
    </div>
    <a href={`https://galleryst.hellonext.co`} className="fixed right-0 bottom-0 z-20 my-2 mx-4 w-auto inline bg-white text-gray-700 focus:outline-none rounded-full p-2 items-center shadow-nft text-xs" target="_blank" ><img src="/image/feedback_icon.svg" style={{ height: '20px', opacity: '.6' }} className="inline-block mr-2 mb-0 " />Send us feedback</a>
  </div>

}

export default ProfilePage
