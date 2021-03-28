import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { NFTAsset, OpenSeaNFT } from '../interfaces/opensea'
// import VideoPlayer from '../components/VideoPlayer'
import axios from 'axios'

const Page = ({ address }: {address: string}) => {
  
  const [creatorNFT, setcreatorNFT] = useState<NFTAsset[]>([])
  useEffect(() => {
    let assets : NFTAsset[] = []
    axios.get(`https://api.opensea.io/api/v1/assets?asset_contract_address=${address}&order_direction=desc&offset=0&limit=50`).then(res => {
      const nfts : OpenSeaNFT = res.data
      const nft = nfts.assets
      assets.push(...nft)
      axios.get(`https://api.opensea.io/api/v1/assets?asset_contract_address=${address}&order_direction=desc&offset=50&limit=50`).then(res => {
        const nfts : OpenSeaNFT = res.data
        const nft = nfts.assets
        assets.push(...assets,...nft)
        setcreatorNFT(nft.filter(thing => thing?.last_sale != undefined).sort((a,b) => parseFloat(b.last_sale.payment_token?.usd_price) - parseFloat(a.last_sale.payment_token.usd_price)))
      })
    })
  },[])
  const Router = useRouter()
  return <div className="flex flex-col items-center bg-gray-300 h-screen overflow-y-scroll pb-24">
    <div>
      <img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/Suez-Logo.svg?alt=media&token=d60cddd7-cbd4-4520-a05d-2b5c4e57b0cf" />
    </div>
    <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col bg-patter">
      <div className="flex flex-col">
        <a onClick={() => Router.push('/')} className="text-left mb-2"> ← Back </a>
        <img className="block w-full" src={creatorNFT[2]?.image_original_url} alt="" />
        {/* { creatorNFT[2]?.animation_original_url != undefined ?
          <VideoPlayer poster_link={creatorNFT[2]?.image_original_url} animate_link={creatorNFT[2]?.animation_original_url}></VideoPlayer>:
          <img className="block w-full" src={creatorNFT[2]?.image_original_url} alt="" />
        } */}
        <div className="mt-4 style-box-primary">Ξ {Math.floor(parseFloat((creatorNFT[2]?.last_sale?.payment_token?.eth_price)))} | ${Math.floor(parseFloat((creatorNFT[2]?.last_sale?.payment_token?.usd_price)))} </div>
        <div className="pt-4 flex flex-col text-left">
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Name: {creatorNFT[0]?.name}</span>
            <span className="text-sm	block">Current Owner: {creatorNFT[0]?.owner?.user?.username}</span>
            <span className="text-sm	block">Token ID: {creatorNFT[0]?.token_id}</span>
            <span className="text-sm	block text-gray-700	">Creator: {creatorNFT[0]?.creator?.user?.username} </span>
            <span className="text-sm	block text-gray-700	">Description: {creatorNFT[0]?.description}</span>
          </div>
        </div>
      </div>
    <span className="text-left">Exhibition</span>
    <div className="flex flex-col mb-8">
    <a href={creatorNFT[2]?.permalink} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2 flex justify-between">
          <div><img width="25" height="25" className="inline" src="https://res.cloudinary.com/nifty-gateway/image/upload/q_auto:good,w_500/v1576344316/nifty-builder-images/kyhclu5quebqm4sit0he.png" /> <span>Niftygateway</span></div><div>→</div></a>
    </div>
    <span className="text-left">Same Collection(4)</span>
    <div className="">
    {creatorNFT.map(thing => {
      return <div className="m-auto mb-6 flex  bg-white w-full border-2 border-black">
        <img src={thing?.image_thumbnail_url} className="h-full" alt=""/>
        <div className="flex-grow ml-4 text-left text-base	p-2 ">
          <p className="block">{thing?.name}</p>
          <p className="block">Current Owner: {thing?.owner?.user?.username}</p>
          <p className="block">
            Sale for {thing.last_sale.quantity} times | { Math.floor(parseFloat(thing.last_sale.payment_token.usd_price))} usd
          </p>
          <a href={thing?.permalink} className="inline-block border-2 border-black px-4 py-1 bg-white">Link</a>
        </div>

      </div>
    })}
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
