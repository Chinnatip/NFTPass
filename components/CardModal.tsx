import { rate_eth_usd } from '../static/NFTLists'
import { nfts } from '../static/NFTLists'
import Card from './Card'

type Props = {
  action?: any
  src: {
    title?: string
    price?: number
    provider?: string
    img?: string
    owner: string
    bid?: {
      change: number
      by: string
      lastest: string
    }
  }
};

const descText = 'Damien Hirst first came to public attention in London in 1988 when he conceived and curated "Freeze," an exhibition in a disused warehouse that showed his work and that of his friends and fellow students at Goldsmiths College. In the nearly quarter of a century since that pivotal show (which would come to define the Young British Artists), Hirst has become one of the most influential artists of his generation. His groundbreaking works include The Physical Impossibility of Death in the Mind of Someone Living (1991), a shark in formaldehyde; Mother and Child Divided (1993) a four-part sculpture of a bisected cow and calf; and For the Love of God (2007), a human skull studded with 8,601 diamonds. In addition to his installations and sculptures, Hirst’s Spot paintings and Butterfly paintings have become universally recognized.'

const Modal = ({ src , action}: Props) => {
  const {title , price, provider, img, bid, owner} = src
  const getPrice = price !== undefined ? price : 0
  return <div className="w-screen h-screen z-20 bg-white fixed top-0 left-0 overflow-y-scroll overflow-x-hidden">
    {/* Image content */}
    <div className="w-full relative flex items-center justify-center" style={{ background: '#5c56567a' , height: '75vh' }}>
      <button onClick={() => action(false)} className="focus:outline-none shadow-nft rounded-full absolute top-0 right-0 m-4">
        <img src="image/close_icon.png" className="h-10"/>
      </button>
      <div className="p-4" style={{ height: '85%' }} >
      <img src={img} className="shadow-nft-img rounded-lg fit-wh-img"  alt=""/>
      </div>
      <div className="absolute bottom-0 right-0 m-4">
      <button className="focus:outline-none shadow-nft rounded-full mr-4">
        <img src="image/ic_heart_line.png" className="h-10"/>
      </button>
      <button className="focus:outline-none shadow-nft rounded-full mr-4">
        <img src="image/expand_icon.png" className="h-10"/>
      </button>
      </div>
  </div>

    {/* Content */}
    <div className="p-16 px-2 md:px-24 pb-0 flex md:flex-row flex-col-reverse">
      {/* Description */}
      <div className="md:w-2/3 w-full">
        <div className="flex w-full mb-6">
          <div className="flex-grow">
            <p className="font-thin">Created by</p>
            <p className="text-lg font-semibold">
              {title}
              <img src="image/verify_logo.png" className="inline h-6 ml-1"/>
            </p>
            <div className="flex items-center text-gray-main mt-2">
              <img src="image/ic_heart_gray.png" className="w-5 inline mr-2"/> 3134
              <img src="image/ic_eye_gray.png" className="w-5 inline ml-4 mr-2"/> 3134
            </div>
          </div>
          <div className="text-right">
            <p className="font-thin">Edition of</p>
            <p className="font-bold text-lg">5</p>
          </div>
        </div>
        <div className="inline text-lg">{descText}</div>
        <div className="shadow-nft flex w-full rounded-24 h-24 items-center justify-center px-6 mt-8">
          <div className="flex-grow">View on Rarible</div>
          <a href="/">
            <img src="image/rarible_icon.png" className="h-12"/>
          </a>
        </div>
      </div>



      {/* Side content */}
      <div className="w-full md:w-1/4 md:ml-12 ml-0">
        <div className="shadow-nft rounded-24 p-5 flex w-full">
          <div className="flex-grow">
            <p className="font-thin">Owned by</p>
            <p className="font-bold text-lg">{owner}</p>
          </div>
          <div className="text-right">
            <img src={`image/${provider}_icon.png`} className="h-8 inline"/>
            <div className="text-2xl mt-2 font-bold">{price} ETH</div>
            <div className="text-gray-main">${getPrice * rate_eth_usd}</div>
          </div>
        </div>
        { bid && <>
          <p className="text-gray-500 text-sm mt-6 mb-4">history</p>
          <div className="shadow-nft rounded-24 p-5 flex w-full">
            <div className="flex-grow">
              <p className="font-thin">Bid place by</p>
              <p className="font-bold">{bid.by}</p>
              <p className="font-thin mt-4 text-xs">{bid.lastest}</p>

            </div>
            <div className="text-right">
              <img src={`image/${provider}_icon.png`} className="h-8 inline"/>
              <div className="text-xl font-bold">{bid.change} ETH</div>
              <div className="">${Math.floor( bid.change * rate_eth_usd)}</div>
            </div>
          </div>
        </>  }
      </div>
    </div>

    {/*  */}
    <div className="p-16 px-24">
      <h1 className="font-thin text-gray-600 text-2xl">More Like This</h1>

      <div className="masonry p-4">
        {nfts.map((item,index) => (
          <div className="rounded-16 shadow-nft mb-8" key={index}>
            <Card src={item}/>
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default Modal
