import { NFT, Creator, priceCal, usdPriceCal, profileNFT } from '../method/fetchJSON'
import { useRouter } from 'next/router'
import Card from './Card'

const Modal = ({ src , action, nfts_lists, creator }: { action?: any , src: NFT , nfts_lists: NFT[], creator: Creator | undefined}) => {
  const Router = useRouter()
  return <div className="w-screen h-screen z-20 bg-white fixed top-0 left-0 overflow-y-scroll overflow-x-hidden">
    {/* Image content */}
    <div className="w-full relative flex items-center justify-center" style={{ background: '#5c56567a' , height: '75vh' }}>
      <button onClick={() => action(false)} className="focus:outline-none shadow-nft rounded-full absolute top-0 right-0 m-4">
        <img src="/image/close_icon.png" className="h-10"/>
      </button>
      <div className="p-4 flex items-center" style={{ height: '85%' }} >
      <img src={src?.image?.original} className="shadow-nft-img rounded-lg fit-wh-img"  alt=""/>
      </div>
      <div className="absolute bottom-0 right-0 m-4">
      <button className="focus:outline-none shadow-nft rounded-full mr-4 hidden">
        <img src="/image/ic_heart_line.png" className="h-10"/>
      </button>
      <button className="focus:outline-none shadow-nft rounded-full mr-4 hidden">
        <img src="/image/expand_icon.png" className="h-10"/>
      </button>
      </div>
  </div>

    {/* Content */}
    <div className=" p-10 md:p-24 sm:p-16 pb-0 flex md:flex-row flex-col-reverse">
      {/* Description */}
      <div className="md:w-1/2 w-full md:mt-0 mt-4">
        <h1 className="text-2xl font-bold">{src?.name}</h1>
        <div className="flex w-full mb-6 mt-5">
          <div className="flex-grow">
            <p className="font-thin text-gray-main">Created by</p>
            <h2 className="text-2xl font-semibold cursor-pointer hover:text-blue-700 inline-block" onClick={() => Router.push(`/profile/${src?.nifty_creator_url}`)}>
              {src?.creator_name}
              <img src="/image/verify_logo.png" className="inline h-6 ml-1 hidden"/>
            </h2>
            {/* <div className="flex items-center text-gray-main mt-2 hidden">
              <img src="/image/ic_heart_gray.png" className="w-5 inline mr-2"/> 3134
              <img src="/image/ic_eye_gray.png" className="w-5 inline ml-4 mr-2"/> 3134
            </div> */}
          </div>
          {/* <div className="text-right">
            <p className="font-thin text-gray-main">Edition of</p>
            <p className="font-bold text-lg">5</p>
          </div> */}
        </div>
        <div className="inline text-lg">{src?.description}</div>
      
        <a href={src?.permalink} target="_blank" className="shadow-nft flex w-full rounded-24 h-24 items-center justify-center px-6 mt-8">
          <div className="flex-grow">View on Opensea</div>
          
            <img src="/image/opensea_icon.png" className="h-12"/>
          </a>
      </div>

      {/* Side content */}
      <div className="w-full md:w-1/2 md:ml-12 ml-0">
        <div className="shadow-nft rounded-24 p-5 flex w-full">
          <div className="flex-grow">
            <p className="font-thin">Owned by</p>
            <p className="font-bold text-lg">{src?.owner?.name}</p>
          </div>
          <div className="text-right">
            <img src={`/image/opensea_icon.png`} className="h-8 inline"/>
            <div className="text-2xl mt-2 font-bold">{priceCal(src?.last_sale)} {src?.last_sale?.symbol}</div>
            <div className="text-gray-main">${usdPriceCal(src?.last_sale)}</div>
          </div>
        </div>
        {/* <>
          <p className="text-gray-main text-sm mt-6 mb-4">history</p>
          <div className="shadow-nft rounded-24 p-5 flex w-full">
            <div className="flex-grow">
              <p className="font-thin">Bid place by</p>
              <p className="font-bold">{bid.by}</p>
              <p className="font-thin mt-4 text-xs">bid.lastest}</p>
            </div>
            <div className="text-right">
              <img src={`image/opensea_icon.png`} className="h-8 inline"/>
              <div className="text-xl font-bold">{bid.change} ETH</div>
              <div className="">${Math.floor( bid.change * rate_eth_usd)}</div>
            </div>
          </div>
        </> */}
      </div>
    </div>

    {/*  */}
    <div className="py-16 md:px-20 px-2">
      <h1 className="px-4 font-thin text-gray-600 text-2xl">More Like This</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 md:p-4 p-0 gap-2">
        { profileNFT(nfts_lists, creator).map((item,index) => (
          <div className="rounded-16 shadow-nft mb-8" key={index}>
            <Card src={item} nfts_lists={nfts_lists} creator={creator}/>
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default Modal
