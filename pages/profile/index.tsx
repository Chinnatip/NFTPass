import { useState, useEffect } from 'react'
import { Profile, RaribleNFTFull } from '../../method/rarible/interface'
import { raribleImg } from '../../method/rarible/method'
import * as rarible from '../../method/rarible/fetch'

// Group Component
const NFTGroup = ({ lists, nfts, text='', type='' } : { type?: string, text?: string, lists: string[], nfts: RaribleNFTFull[]}) => {
  return <>
  { lists.length > 0 && <>
    <h2 className="text-xl">{text}</h2>
    <div className=" w-full">
      { nfts.filter(item => lists.includes(item.id)).map(item => {
        return <a target="_blank" href={`/nft?address=${item.id}`} className=" relative inline-block rounded-md h-32 m-3 my-5">
          <img className={`inline-block h-32 ${ type == 'onsale' && 'border-4 border-yellow-500'} `} src={item.properties?.imagePreview} />
          <span className="text-black absolute bottom-0 rounded-tr-full left-0 text-xs bg-white p-1 pt-2 pr-2 bg-pink-400 text-pink-800" >
            {item?.item?.likes}
          </span>
          {  type == 'onsale' && item.item?.ownership?.priceEth && <span className="text-black rounded-xl shadow-lg absolute top-0 right-0 text-xs bg-white p-1 -mt-3 -mr-3 bg-yellow-500 text-yellow-800" >
            { item.item?.ownership?.priceEth } ETH
          </span> }
          <span className="text-black opacity-50 absolute bottom-0 left-0 -mb-5 text-xs w-full text-center">{item.properties?.name}</span>
        </a>
      })}
    </div>
    <br />
  </>}
  </>
}

const Page = ({ address }: {address: string}) => {
  const [profile, setProfile] = useState<Profile>({})
  const [NFTLists, setNFTLists] = useState<RaribleNFTFull[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  const [onsaleLists, setOnsaleLists] = useState<string[]>([])
  const [createdLists, setCreatedLists] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      // Creator profile
      const resp = await rarible.userInfo(address)
      const metaResp = await rarible.userMeta(address)
      setProfile({ ...resp.data, meta: metaResp.data})

      // Nfts
      const ownLists = await rarible.collectBy(address, 'ownership', setOwnLists)
      const onsaleLists = await rarible.collectBy(address, 'onsale', setOnsaleLists)
      const creates =  await rarible.collectBy(address, 'created', setCreatedLists)

      // Collect NFTS data
      const uniqueLists = [...new Set([...ownLists, ...onsaleLists, ...creates])]
      const nftResp = await rarible.collectNFTS(uniqueLists)
      setNFTLists(nftResp.data)
    })()
  }, []);

  return <div className="relative">
    <div className="w-1/2 m-auto my-12 border-2 p-4 ">
      <div className="text-3xl">{profile?.username}</div>
      <div className="text-gray-500 text-sm mb-2">{address}</div>
      <hr />
      <div className="flex py-3">
        <img src={raribleImg(profile?.pic)} className="h-32 rounded-full" />
        <div className="p-4 pt-0">
          <div>{profile?.description}</div>
          <a className="my-2 block text-blue-700" href={profile?.website}>{profile?.website}</a>
        </div>
      </div>
      <hr />
      <br />
      <ul className="flex">
        <li className="px-3" >{profile?.meta?.followers} followers</li>
        <li className="px-3" >{profile?.meta?.followings} followings</li>
        <li className="px-3" >{profile?.meta?.itemsCreated} created</li>
        <li className="px-3" >{profile?.meta?.ownerships} collects</li>
        <li className="px-3" >{profile?.meta?.ownershipsWithStock} Onsale</li>
      </ul>
      <br />
      <br />
      <NFTGroup type="onsale" text={`On sale (${onsaleLists.length} items)`} lists={onsaleLists} nfts={NFTLists} />
      <NFTGroup type="owned" text={`Own by ${profile?.username} (${ownLists.length} items)`} lists={ownLists} nfts={NFTLists} />
      <NFTGroup type="created" text={`Created (${createdLists.length} items)`} lists={createdLists} nfts={NFTLists} />
    </div>
  </div>
}


export async function getServerSideProps(context: any) {
  const { address } = context.query
  return {
    props: { address },
  }
}


export default Page
