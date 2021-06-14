import { useState, useEffect } from 'react'
import { Profile, RaribleGetResponse } from '../../method/rarible/interface'
import { OpenseaGetResponse } from '../../method/opensea/interface'
import { NiftyGetResponse , Drop} from '../../method/nifty/interface'
import { raribleImg } from '../../method/rarible/method'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import * as nifty from '../../method/nifty/fetch'
import * as foundation from '../../method/foundation/fetch'
import { Galleryst } from '../../interfaces/index'
import { FoundationGetResponse } from 'method/foundation/interface'

const lockDigit = (price: number) => {
  return (Math.floor( price * 10000) )/ 10000
}

const NFTDrop = ({ lists,text='' } : {lists : Drop[],text: string}) => {
  return <>
  { lists.length > 0 && <>
    <h2 className="text-xl">{text}</h2>
    <div className=" w-full">
      { lists.map(item => {
        const { address, title, image} = item
        return image != undefined && <a target="_blank" href={`/nft?address=${address}`} className=" relative inline-block rounded-md m-3 my-5 mt-6">
          {image.slice( image.length - 3, image.length) == 'mp4' ?
            <video className={`inline-block h-32 `} src={image} autoPlay loop muted/>:
            <img className={`inline-block h-32 `} src={image} />}
          <span className="absolute bottom-0 left-0 flex flex-col p-1" >
            <span className="bg-blue-700 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">N</span>
          </span>
          <span className="text-black opacity-50 absolute bottom-0 left-0 -mb-8 h-8 flex justify-center items-center text-xs w-full text-center" style={{ lineHeight: 1.2 }}>
            {title.length > 20 ? `${title.substr(0,20)}...` : title}
          </span>
        </a>
      })}
    </div>
    <br />
  </>}
  </>

}

// Group Component
const NFTGroup = ({ lists, nfts, text='', type='' } : { type?: string, text?: string, lists: string[], nfts: Galleryst[]}) => {
  let sortNfts = nfts
  switch(type){
    case 'onsale':
      sortNfts = nfts.sort((a,b) => (b.priceETH != undefined && a.priceETH != undefined) ? b.priceETH - a.priceETH : 0 )
      break
    default:
      sortNfts = nfts
  }
  return <>
  { lists.length > 0 && <>
    <h2 className="text-xl">{text}</h2>
    <div className=" w-full">
      { sortNfts.filter(item => lists.includes(item.id)).map(item => {
        const {id, imagePreview, priceETH, name , check} = item
        return imagePreview != undefined && <a target="_blank" href={`/nft?address=${id}`} className=" relative inline-block rounded-md m-3 my-5 mt-6" key={`${item.id}`}>
          {imagePreview.slice( imagePreview.length - 3, imagePreview.length) == 'mp4' ?
            <video className={`inline-block h-32 ${ type == 'onsale' && 'border-4 border-yellow-500'} `} src={imagePreview} autoPlay loop muted/>:
            <img className={`inline-block h-32 ${ type == 'onsale' && 'border-4 border-yellow-500'} `} src={imagePreview} />}

          {type == 'onsale' && priceETH && <span className="text-black shadow-lg absolute top-0 right-0 text-xs bg-white px-1 bg-yellow-500 text-yellow-800" >
            { lockDigit(priceETH) } ETH
          </span> }
          <span className="absolute bottom-0 left-0 flex flex-col p-1" >
            { check?.rarible && <span className="bg-yellow-500 h-4 w-4 text-xs rounded-full flex items-center justify-center">r</span> }
            { check?.opensea && <span className="bg-blue-500 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">O</span> }
            { check?.foundation && <span className="bg-black text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">F</span> }
            { check?.nifty && <span className="bg-blue-700 text-white mt-1 h-4 w-4 text-xs rounded-full flex items-center justify-center">N</span> }
          </span>
          <span className="text-black opacity-50 absolute bottom-0 left-0 -mb-8 h-8 flex justify-center items-center text-xs w-full text-center" style={{ lineHeight: 1.2 }}>
            {name.length > 20 ? `${name.substr(0,20)}...` : name}
          </span>
        </a>
      })}
    </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2 w-full">
        {nfts.filter(item => lists.includes(item.id)).map((item, index) => {
          const { imagePreview } = item
          return <a target="_blank" href={`/nft?address=${item.id}`} className="cursor-pointer bg-white rounded-16 mb-2" key={`${item.id}`}>

            <div className="thumbnail-wrapper w-full relative">
              {type == 'onsale' &&
                <div className="absolute z-10 top-0 px-2 rounded-full ml-4 mt-4 mr-4 h-6 w-auto bg-white backdrop-blur-2xl bg-opacity-25 flex items-center justify-center">
                  <div className="w-auto rounded-full text-xs text-white">On Sale</div>
                </div>
              }
              <img className="rounded-16 border-8 border-white thumbnail-height" src={imagePreview} />
              <div className="absolute flex justify-end	z-10 bottom-0  w-full mb-2 px-2 pt-6 ">
                <div className="flex px-2 rounded-b-16 pt-10 justify-end w-full" style={{ background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.52) 10%, rgba(196, 196, 196, 0) 50%)' }}>
                  {type == 'onsale' && item.priceETH != undefined &&
                    <span className="text-white font-bold text-right " >
                      {item.priceETH} ETH  </span>}</div>
              </div>
            </div>
            <span className="text-black absolute bottom-0 rounded-tr-full left-0 hidden text-xs bg-white p-1 pt-2 pr-2 bg-pink-400 text-pink-800" >
              {item?.likes}
            </span>


            <span className="hidden text-black opacity-50 absolute bottom-0 left-0 -mb-5 text-xs w-full text-center">{item?.name}</span>
          </a>
        })}
      </div>
      <br />
    </>}
  </>
}

const Page = ({ address, nifty_slug }: {address: string, nifty_slug: string | false}) => {
  const [profile, setProfile] = useState<Profile>({})
  const [NFTLists, setNFTLists] = useState<Galleryst[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  const [onsaleLists, setOnsaleLists] = useState<string[]>([])
  const [createdLists, setCreatedLists] = useState<string[]>([])
  const [dropLists, setDropLists] = useState<Drop[]>([])

  useEffect(() => {
    (async () => {
      // Creator profile
      const resp = await rarible.userInfo(address)
      const metaResp = await rarible.userMeta(address)
      setProfile({ ...resp.data, meta: metaResp.data })

      // Rarible NFTs
      let rari : RaribleGetResponse = await rarible.ownByAddress(address, { setOwnLists, setOnsaleLists, setCreatedLists })

      // Opensea NFTs
      const os : OpenseaGetResponse = await opensea.ownByAddress(address)

      // Nifty gateway NFTs
      let nf : NiftyGetResponse = nifty.construct()
      if(nifty_slug != false){
        nf  = await nifty.fetchOwnBySlug(nifty_slug)
        setDropLists(nf.drops)
      }

      // Foundation NFTs
      const fnd : FoundationGetResponse = await foundation.ownByAddress(address)

      // Collect 3 type of NFTs-ID own by owner
      // address format is ${address:token_id}
      setOwnLists([...new Set([...rari.owned, ...os.owned, ...nf.owned, ...fnd.owned])])
      setOnsaleLists([...new Set([...rari.onsale, ...os.onsale, ...nf.onsale, ...fnd.onsale])])
      setCreatedLists([...new Set([...rari.created, ...os.created, ...fnd.created])])

      const total_ids = [...new Set([...rari.allID , ...os.allID, ...nf.allID, ...fnd.allID])]
      let constructNFTlists : Galleryst[] = []

      // Get All rarible items
      rari.items = await rarible.getAllNFTS(rari.allID)

      //
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
      setNFTLists(constructNFTlists)
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
      <hr />
      <br />
      <ul className="flex">
        <li className="px-3" >{profile?.meta?.followers} followers</li>
        <li className="px-3" >{profile?.meta?.followings} followings</li>
        {/*  */}
        <li className="px-3" >{onsaleLists.length} on-sale</li>
        <li className="px-3" >{ownLists.length} collects</li>
        <li className="px-3" >{createdLists.length} creates</li>
        <li className="px-3" >{dropLists.length} drops</li>
      </ul>
      <br />
      <br />
      {/* {JSON.stringify(openseaLists[2])} */}

      <NFTGroup type="onsale" text={`On sale (${onsaleLists.length} items)`} lists={onsaleLists} nfts={NFTLists} />
      <NFTGroup type="owned" text={`Own by ${profile?.username} (${ownLists.length} items)`} lists={ownLists} nfts={NFTLists} />
      <NFTGroup type="created" text={`Created (${createdLists.length} items)`} lists={createdLists} nfts={NFTLists} />
      <NFTDrop text={`Nifty drops (${dropLists.length} items)`} lists={dropLists} />
    </div>
  </div>
}


export async function getServerSideProps(context: any) {
  const { address , nifty_slug } = context.query

  return {
    props: { address, nifty_slug: nifty_slug != undefined ? nifty_slug : false },
  }
}


export default Page
