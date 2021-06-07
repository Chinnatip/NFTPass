import { useState, useEffect } from 'react'
import { Profile, RaribleNFTFull } from '../../method/rarible/interface'
import { raribleImg } from '../../method/rarible/method'
import * as rarible from '../../method/rarible/fetch'

// Group Component
const NFTGroup = ({ lists, nfts, text = '', type = '' }: { type?: string, text?: string, lists: string[], nfts: RaribleNFTFull[] }) => {
  return <>
    { lists.length > 0 && <><div className="mt-1 mb-6 py-1 inline-block bg-white rounded-full text-center px-1 shadow-nft">
      <h2 className="text-black ">{text}</h2>
    </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2 w-full">
        {nfts.filter(item => lists.includes(item.id)).map(item => {
          return <a target="_blank" href={`/nft?address=${item.id}`} className="cursor-pointer bg-white rounded-16 mb-2">

            <div className="thumbnail-wrapper w-full relative">
              {type == 'onsale' &&
                <div className="absolute z-10 top-0 px-2 rounded-full ml-4 mt-4 mr-4 h-6 w-auto bg-white backdrop-blur-2xl bg-opacity-25 flex items-center justify-center">

                  <div className="w-auto rounded-full text-xs text-white">On Sale</div>

                </div>
              }
              <img className="rounded-16 border-8 border-white thumbnail-height" src={item.properties?.imagePreview} />
              <div className="absolute flex justify-end	z-10 bottom-0  w-full mb-2 px-2 pt-6 ">
                <div className="flex px-2 rounded-b-16 pt-10 justify-end w-full" style={{ background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.52) 10%, rgba(196, 196, 196, 0) 50%)' }}>
                  {type == 'onsale' && item.item?.ownership?.priceEth &&
                    <span className="text-white font-bold text-right " >
                      {item.item?.ownership?.priceEth} ETH  </span>}</div>
              </div>
            </div>
            <span className="text-black absolute bottom-0 rounded-tr-full left-0 hidden text-xs bg-white p-1 pt-2 pr-2 bg-pink-400 text-pink-800" >
              {item?.item?.likes}
            </span>


            <span className="hidden text-black opacity-50 absolute bottom-0 left-0 -mb-5 text-xs w-full text-center">{item.properties?.name}</span>
          </a>
        })}
      </div>
      <br />
    </>}
  </>
}

const Page = ({ address }: { address: string }) => {
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
      setProfile({ ...resp.data, meta: metaResp.data })

      // Nfts
      const ownLists = await rarible.collectBy(address, 'ownership', setOwnLists)
      const onsaleLists = await rarible.collectBy(address, 'onsale', setOnsaleLists)
      const creates = await rarible.collectBy(address, 'created', setCreatedLists)

      // Collect NFTS data
      const uniqueLists = [...new Set([...ownLists, ...onsaleLists, ...creates])]
      const nftResp = await rarible.collectNFTS(uniqueLists)
      setNFTLists(nftResp.data)
    })()
  }, []);

  return <div className="w-screen h-screen pt-8 relative overflow-y-scroll overflow-x-hidden " style={{ background: 'url("image/bg_blur.jpg")' }}>
    <div className="md:w-4/5 w-full m-auto z-10 ">
      <div className="rounded-24 border border-white shadow-nft mt-20" style={{ background: 'rgba(185, 184, 184, 0.32)', borderRadius: '24px 24px 0px 0px' }}>
        <div className="bg-white" style={{ borderRadius: '24px 24px 0px 0px' }}>
          <div className="text-center">
            <img src={raribleImg(profile?.pic)} className="inline-block h-20 w-20 border-4 border-white shadow-nft rounded-full -mt-12 object-cover" />
            <div className="text-3xl">{profile?.username}</div>
            <div className="mt-1 mb-6 px-3 py-2 bg-white rounded-full shadow-nft flex align-middle justify-center w-min m-auto">
              <div className="text-gray-500 text-sm">{address}</div>
            </div>
            <div className="p-4 pt-0">
              <div className="md:px-8 px-1">{profile?.description}</div>
              <a className="my-2 block text-blue-700" href={profile?.website}>{profile?.website}</a>
            </div>
            <div className="mt-1 mb-6 py-1 inline-block bg-white rounded-full text-center px-1 shadow-nft" >

              <button
                className={`py-2 px-3 font-semibold text-sm focus:outline-none appearance-none rounded-full `}>Collections
                <span className="p-1 ml-1 w-8 rounded-full bg-gray-main text-white inline-block hidden">num</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto flex justify-end flex-col items-center md:px-10 px-2 pb-16"
        style={{ borderRadius: '0 0 24px 24px ', background: '#d2cdcd26' }}>
        <ul className="flex hidden">
          <li className="px-3" >{profile?.meta?.followers} followers</li>
          <li className="px-3" >{profile?.meta?.followings} followings</li>
          <li className="px-3" >{profile?.meta?.itemsCreated} created</li>
          <li className="px-3" >{profile?.meta?.ownerships} collects</li>
          <li className="px-3" >{profile?.meta?.ownershipsWithStock} Onsale</li>
        </ul>
        <br />
        <NFTGroup type="onsale" text={`On sale (${onsaleLists.length} items)`} lists={onsaleLists} nfts={NFTLists} />
        <NFTGroup type="owned" text={`Own by ${profile?.username} (${ownLists.length} items)`} lists={ownLists} nfts={NFTLists} />
        <NFTGroup type="created" text={`Created (${createdLists.length} items)`} lists={createdLists} nfts={NFTLists} />
      </div>
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
