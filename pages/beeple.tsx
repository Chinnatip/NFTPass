import { useState, useEffect } from 'react'
import { OpenseaCollection, OpenseaThing,  NFTAsset, OpenSeaNFT } from '../interfaces/opensea'
import axios from 'axios'

const Page = () => {
  const [creator, setCreator] = useState<OpenseaCollection>({})
  const [creatorThings, setCreatorCurate] = useState<OpenseaThing[]>([])
  const [creatorNFT, setcreatorNFT] = useState<NFTAsset[]>([])
  useEffect(() => {
    let assets : NFTAsset[] = []
    axios.get('https://api.opensea.io/api/v1/asset_contract/0x12f28e2106ce8fd8464885b80ea865e98b465149').then(res => {
      const creatorData : OpenseaCollection = res.data
      setCreator(creatorData)
      axios.get('https://api.opensea.io/api/v1/collections?asset_owner=0xc6b0562605d35ee710138402b878ffe6f2e23807&offset=0&limit=300').then(res => {
        const thingsData : OpenseaThing[] = res.data
        setCreatorCurate(thingsData)
        axios.get('https://api.opensea.io/api/v1/assets?asset_contract_address=0x12f28e2106ce8fd8464885b80ea865e98b465149&order_direction=desc&offset=0&limit=50').then(res => {
          const nfts : OpenSeaNFT = res.data
          const nft = nfts.assets
          assets.push(...nft)
          axios.get('https://api.opensea.io/api/v1/assets?asset_contract_address=0x12f28e2106ce8fd8464885b80ea865e98b465149&order_direction=desc&offset=50&limit=50').then(res => {
            const nfts : OpenSeaNFT = res.data
            const nft = nfts.assets
            assets.push(...assets,...nft)
            setcreatorNFT(nft.filter(thing => thing?.last_sale != undefined).sort((a,b) => parseFloat(b.last_sale.payment_token?.usd_price) - parseFloat(a.last_sale.payment_token.usd_price)))
          })
        })
      })
    })
  },[])

  return <div>
    <h1 className="text-2xl">{creator?.address}</h1>
    <h1 className="text-2xl">{creator?.payout_address}</h1>
    <h2 className="text-green-400 text-xl">{creator?.collection?.safelist_request_status}</h2>
    <h3 className="text-sm">
      <p>Contract type: {creator?.asset_contract_type}</p>
      <p>Created: {creator?.created_date}</p>
      <p>Fullname: {creator?.name}</p>
      <p>Symbol: {creator?.symbol}</p>
      <p>Schema: {creator?.schema_name}</p>
      <p>External : {creator?.external_link}</p>
      <p>Medium : {creator?.collection?.medium_username}</p>
      <p>Twitter : {creator?.collection?.twitter_username}</p>
      <p>Telegram : {creator?.collection?.telegram_url}</p>
      <p>Wikipedia : {creator?.collection?.wiki_url}</p>
      <p>Slug : {creator?.collection?.slug}</p>
    </h3>

    <img src={creator?.image_url} alt=""/>
    <img className="w-1/3" src={creator?.collection?.banner_image_url} alt=""/>
    <span>{creator?.collection?.description}</span>
    <hr/>
    <h1 className="text-2xl m-auto text-center mt-12 mb-10">{creator?.name}'s arts</h1>
    {creatorNFT.map(thing => {
      return <div className="w-2/3 m-auto mb-6 flex  ">
        <img src={thing?.image_thumbnail_url} className="h-24" alt=""/>
        <div className="flex-grow ml-4">
          <p className="block">{thing?.name}</p>
          <p className="block">current owner: {thing?.owner?.user?.username}</p>
          <p className="block">
            Sale for {thing.last_sale.quantity} times | { Math.floor(parseFloat(thing.last_sale.payment_token.usd_price))} usd
          </p>
          <a href={thing?.permalink} className="inline-block border-2 border-black px-4 py-1 bg-white">Link</a>
        </div>
      </div>
    })}
    <hr/>
    <h1 className="text-2xl m-auto text-center mt-12 mb-10">{creator?.name}'s buys</h1>
    {creatorThings.map(thing => {
      return <span className="m-auto inline-flex flex-col mb-12 mx-6 items-center justify-center relative ">
        <img className="absolute top-0 left-0 h-8 inline rounded-full" src={thing.banner_image_url} alt=""/><br/>
        <img src={thing.image_url} className="h-24" alt=""/>
        <p className="inline">{thing.name}</p>
      </span>
    })}

  </div>
}

//
export default Page
