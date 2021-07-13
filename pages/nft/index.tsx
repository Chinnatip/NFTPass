import { useState, useEffect } from 'react'
import { User, NFTDetail } from '../../interfaces/index'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import dayjs from 'dayjs'
// import { hostname } from 'os'
// import { CreatorHeader } from '@/Galleryst'
// import { profile } from 'console'
// import { profile } from 'node:console'
// import { name } from 'dayjs/locale/*'

// const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')
const profilePic = (user: User | undefined) => {
  if(user != undefined ){
    return <a href={`/profile?address=${user.address}`} className="bg-gray-500 mx-2 w-8 h-8 rounded-full overflow-hidden inline-flex items-center justify-center">
      <img src={user.image} className="h-8 inline " />
    </a>
  }else{
    return <div className="w-8 h-8 inline bg-gray-600 rounded-full" />
  }
}
const profileAddress = (user: User | undefined) => {
  return user != undefined && user?.image != '' ?
    <a href={`/profile?address=${user.address}`} target="_blank" className="ml-2 bg-gray-500 w-10 h-10 rounded-full overflow-hidden inline-flex items-center justify-center">
      <img src={user?.image} className="h-10 inline" />
    </a> :
    <span className="inline-block w-10 h-10 rounded-full bg-purple-500 ml-2 flex items-center justify-center">{user?.name?.substr(0, 1)}</span>
}

const Page = ({ address }: { address: string }) => {
  const [nft, setNFT] = useState<NFTDetail>({ address })
  useEffect(() => {
    (async () => {
      // Rarible
      await rarible.nftDetail(address, setNFT)

      // Opensea
      // await opensea.nftDetail(address, setNFT)

    })()
  }, []);

  const {image, title, description, pricing, offer, creator, owner, activity } = nft
  const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')

  return <div className="w-screen h-screen z-20 bg-white fixed top-0 left-0 overflow-y-scroll overflow-x-hidden">
    <div className="flex flex-col">
      <div className="w-full relative flex items-center justify-center" style={{ background: 'rgba(92, 86, 86, 0.48)', height: '75vh' }}>
        <div className="p-4 flex items-center" style={{height: '100%'}}>
          <img src={image} className="shadow-nft-img rounded-lg fit-wh-img" style={{ height: '80%' }} />
        </div>
      </div>
      <div className="text-center mt-10 mb-12 hidden">
        <a href={`/profile?address=${address}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
      </div>

      <div className="mt-10 m-auto md:w-2/3 w-full md:px-0 px-3 flex lg:flex-row flex-col justify-between">
        <div className="lg:w-1/2 w-full lg:flex lg:flex-col contents">
          <div className="text-2xl order-1 font-black mb-4">{title != null ? title : 'Untitled'}</div>
          <div className="text-gray-500 mb-4 break-words order-2 hidden">{address}</div>
          <div className="order-5"><h3 >{description != null ? description : 'No description.'}</h3></div>
        </div>

        <div className="lg:w-1/2 w-full lg:pl-6 pr-0 lg:sticky lg:flex lg:flex-col contents">
          <div className="order-3 mb-4">
            {pricing?.eth != undefined && <div className="flex text-xl ">
              <span className="flex-grow text-gray-500 text-left">
                {pricing.status ? 'Current price' : pricing.status}
              </span>
              <span className="text-right">{pricing?.eth} ETH</span>

            </div>}
            { offer?.status && <div className="flex text-xl ">
              <span className="flex-grow text-gray-500 text-left">
                Best offer
              </span>
              <span className="text-right"> {offer?.best_offer?.toFixed(2)} ETH</span>

            </div>}
            <br />
            <div hidden>
              <div>Supply: {'supply'} / Selling: {'selling'}</div>
              <div>Like:  {'likes'} / Visit: {'visits'}</div>
            </div>
            <div className="shadow-nft p-4 rounded-24">
              <div className="flex h-auto items-center flex-col w-full ">
                <div className="flex w-full text-gray-700 mb-2">Created by</div>
                {/* <span>{JSON.stringify(creator)}</span> */}
                <a href={`/profile?address=${creator?.address}`} className="flex justify-between w-full mb-4 items-center	">
                  {profileAddress(creator)}
                  {creator?.name}
                </a>
              </div>

              {owner !== undefined && owner.length > 0 && <div className="flex h-auto items-center flex-col w-full content-start">
                <div className="flex w-full text-gray-700 mb-2">Collected by </div>
                <div className="flex content-start w-full flex-wrap">
                  {owner.map(owner => profileAddress(owner))}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="md:w-2/3 w-full m-auto">
      <div className="px-3 m-auto">
        <h2 className="mt-8 text-xl font-semibold">NFT History</h2>
        {activity?.map(({ type, current_owner, previous_owner, date, value, price }) => {
          switch (type) {
            case 'order': return <div className="flex items-center my-4">
              {profilePic(current_owner)} - {type} ({value}items | price {price}ETH) @ {getDate(date)}
            </div>
            case 'transfer': return <div className="flex items-center my-5">
              {profilePic(previous_owner)} - {type} to {profilePic(current_owner)} ({value}item) @ {getDate(date)}
            </div>
            case 'mint': return <div className="flex items-center my-5">
              {profilePic(current_owner)} - {type} @ {getDate(date)}
            </div>
          }
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



