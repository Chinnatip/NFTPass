import axios from 'axios'
import { useState, useEffect } from 'react'

interface RaribleNFT {
  id: string
  token: string
  tokenId: string
  owner: string
  value: number
  date: string
  status: string
  selling: number
  sold: number
  stock: number
  pending: string[]
  blacklisted: boolean
  creator: string
  verified: true,
  categories: string[]
  likes: number
  hide: boolean
}

interface Royalty {
  recipient: string
  value: number
}

interface Ownership {
  id: string
  token: string
  tokenId: string
  owner: string
  value: number
  date: string
  price: number
  priceEth: number
  buyToken: string
  buyTokenId: string
  status: string
  selling: number
  sold:number
  stock: number
  signature: string
  pending: string[],
  blacklisted: boolean
  creator: string
  verified: boolean
  categories: string[]
  likes: number
  hide: boolean
}

interface RaribleNFTFull {
  item: {
    id: string
    token: string
    tokenId: string
    unlockable: boolean
    creator: string
    blacklisted: boolean
    supply: number
    royalties: Royalty[]
    likes: number
    categories: string[]
    verified: boolean
    owners: string[]
    sellers: number
    ownership: Ownership
    totalStock: number
    visits: number
  }
  properties: {
    name: string
    description: string
    image: string
    imagePreview: string
    imageBig: string
    attributes: string[]
  },
  meta: {
    imageMeta: {
      type: string
      width: number
      height: number
    }
  }
  id: string
}

interface Profile {
  address?: string
  username?: string
  shortUrl?: string
  pic?: string
  cover?: string
  followings?: number
  followers?: number
  acceptedTerms?: number
  description?: string
  website?: string
  twitterUsername?: string
  receiveEmailNotifications?: boolean
  version?: number
  emailConfirmed?: boolean
  meta?: {
    address?: string
    ownershipsWithStock?: number
    itemsCreated?: number
    ownerships?: number
    hides?: number
    followers?: number
    followings?: number
    likes?: number
  }
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
      const resp = await axios.get(`https://api-mainnet.rarible.com/marketplace/api/v1/users/${address}`)

      // Creator profile
      const metaResp = await axios.get(`https://api-mainnet.rarible.com/marketplace/api/v1/profiles/${address}/meta`)
      setProfile({ ...resp.data, meta: metaResp.data})

      // Ownership Nfts
      const ownershipResp = await axios.post(`https://api-mainnet.rarible.com/marketplace/api/v1/ownerships/simple`, {
        "size":1000,
        "filter":{
            "@type":"by_owner",
            "address": address,
            "incoming":true,
            "inStockOnly":false,
            "hideOnly":false
        }
      })
      const ownership : RaribleNFT[] = ownershipResp.data
      const ownLists =  [...new Set( ownership.map(item => `${item.token}:${item.tokenId}`))]
      setOwnLists(ownLists)

      // Onsle Nfts
      const onsaleResp = await axios.post(`https://api-mainnet.rarible.com/marketplace/api/v1/ownerships/simple`, {
        "size":1000,
        "filter":{
          "@type":"by_owner",
          "address": address,
          "incoming":true,
          "inStockOnly":true,
          "hideOnly":false
        }
      })
      const onsale : RaribleNFT[] = onsaleResp.data
      const onsaleLists =  [...new Set( onsale.map(item => `${item.token}:${item.tokenId}`))]
      setOnsaleLists(onsaleLists)

      // Created Nfts
      const createResp = await axios.post(`https://api-mainnet.rarible.com/marketplace/api/v1/items`, {
        "size":1000,
        "filter":{
          "@type":"by_creator",
          "creator": address
      }
      })
      const created : RaribleNFT[] = createResp.data
      const creates =  [...new Set( created.map(item => `${item.token}:${item.tokenId}`))]
      setCreatedLists(creates)

      // Collect NFTS data
      const uniqueLists = [...new Set([...ownLists, ...onsaleLists, ...creates])]
      const nftResp = await axios({
        method: 'post',
        url: 'https://api-mainnet.rarible.com/marketplace/api/v1/items/map',
        headers: { 'Content-Type': 'application/json'},
        data : JSON.stringify(uniqueLists)
      })
      setNFTLists(nftResp.data)
      console.log(nftResp.data)

    })()
  }, []);

  const raribleImg = (pic: string | undefined ) => {
    const parsePic = pic?.split('/ipfs/')
    if(parsePic != undefined){
      return `https://images.rarible.com/?fit=outsize&n=-1&url=https://ipfs.rarible.com/ipfs/${parsePic[1]}&w=240`
    }else{
      return ''
    }
  }

  return <div className="relative">
    {/* <img className="fixed top-0 left-0 w-full z-0" src={raribleImg(profile?.cover)} alt="" /> */}
    <div className="w-1/2 m-auto my-12 border-2 p-4 ">
      <div className="text-3xl">{profile?.username}</div>
      <div>Address: {address}</div>
      <hr />
      <div className="flex">
        <img src={raribleImg(profile?.pic)} alt="" />
        <div className="p-4">
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

      <h2 className="text-xl">On sale ({onsaleLists.length} items)</h2>
      <div className=" w-full">
        { NFTLists.filter(item => onsaleLists.includes(item.id)).map(item => {
          return <img className="inline-block h-32 m-3" src={item.properties?.imagePreview} />
        })}
      </div>
      <br />

      <h2 className="text-xl">Own by {profile?.username} ({ownLists.length} items)</h2>
      <div className=" w-full">
        { NFTLists.filter(item => ownLists.includes(item.id)).map(item => {
          return <img className="inline-block h-32 m-3" src={item.properties?.imagePreview} />
        })}
      </div>
      <br />

      <h2 className="text-xl">Created ({createdLists.length} items)</h2>
      <div className=" w-full">
        { NFTLists.filter(item => createdLists.includes(item.id)).map(item => {
          return <img className="inline-block h-32 m-3" src={item.properties?.imagePreview} />
        })}
      </div>
      <br />

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
