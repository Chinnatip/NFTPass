import { useState, useEffect } from 'react'
import { User, NFTDetail } from '../../interfaces/index'
import * as rarible from '../../method/rarible/fetch'
import * as opensea from '../../method/opensea/fetch'
import dayjs from 'dayjs'

const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')
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
      // await rarible.nftDetail(address, setNFT)

      // Opensea
      await opensea.nftDetail(address, setNFT)

    })()
  }, []);

  const {image, title, description, pricing, offer, creator, owner, activity } = nft
  return <div className="w-screen h-screen z-20 bg-white fixed top-0 left-0 overflow-y-scroll overflow-x-hidden">
    <div className="flex flex-col">
      <div className="w-full relative flex items-center justify-center" style={{ background: 'rgba(92, 86, 86, 0.48)', height: '75vh' }}>
        <div className="p-4 flex items-center" style={{height: '100%'}}>
          <img src={image} className="shadow-nft-img rounded-lg fit-wh-img" style={{ height: '80%' }} />
        </div>
      </div>
      <div className="text-center mt-10 mb-12">
        <a href={`/profile?address=${'creatpr_address'}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
      </div>
      <div className="m-auto w-2/3 flex lg:flex-row-reverse flex-col justify-between">
        <div className="lg:w-1/2 w-full">
          <h1 className="text-xl">{title}</h1>
          <div className="text-gray-500 mb-4 break-words">{address}</div>
          <h3>{description}</h3>
        </div>
        <br />
        <div className="lg:w-1/2 w-full lg:pr-6 pr-0 lg:sticky">
          { pricing?.eth != undefined &&
            <div className="flex text-2xl ">
              <span className="flex-grow">Current price</span>
              <div className="text-right">
                <div>{pricing.eth} ETH</div>
                <div className="text-sm opacity-50">{pricing.usd} USD</div>
              </div>
            </div>}
          { offer?.status &&
            <div className="flex text-2xl ">
              <span className="flex-grow"> Best offer </span>
              {offer?.best_offer?.toFixed(2)} ETH
            </div>}
          <br />
          <div className="shadow-nft p-6 rounded-24">
            <div className="flex h-12 items-center ">
              <span className="flex-grow">Creator:</span>
              {profileAddress(creator)}
            </div>
            {owner != undefined && owner.length > 0 && <div className="flex h-12 items-center">
              <span className="flex-grow">Owner:</span>
              {owner.map(owner => profileAddress(owner))}
            </div>}
          </div>
        </div>
      </div>
    </div>
    <div className="w-2/3 m-auto">
      <div className="px-12 m-auto">
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



