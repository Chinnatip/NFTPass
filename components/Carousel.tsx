import { useState } from 'react'
import { rate_eth_usd } from '../static/NFTLists'

type NFT = {
  title?: string
  price?: number
  provider?: string
  img?: string
  bid?: {
    change: number
    lastest: string
  }
}

const Carousel = ({ nfts }:{ nfts: NFT[] }) => {
  const [slide, setSlide] = useState(1)
  const bidding_nfts = nfts.filter(item => item.bid != undefined)

  const before = () => {
    if(slide == 1){
      setSlide(bidding_nfts.length)
    }else{
      setSlide(slide - 1)
    }
  }

  const previous = () => {
    setSlide(slide + 1)
    if(slide == bidding_nfts.length){
      setSlide(1)
    }else{
      setSlide(slide + 1)
    }
  }

  return <div className="carousel relative">
    <div className="carousel-inner relative overflow-hidden w-full">
      { bidding_nfts.map((src, index) => {
        const current_price = src?.price != undefined ? src.price : 0
        return <>
        <input className="carousel-open" type="radio" hidden={true} checked={ slide == (index+1) } />
        <div className="carousel-item absolute opacity-0 h-80 md:h-64">
        <div className="m-auto rounded-16 mt-4 mb-6 bg-white shadow-nft p-4 flex flex-col md:flex-row h-52" style={{width: '84%'}}>
          <img src={src.img} className="h-40 md:w-40 w-full rounded-lg" alt=""/>
          <div className="flex flex-col md:flex-row w-full">
          <div className="md:ml-8 ml-0 mt-2 flex-grow flex flex-col">
            { src.bid != undefined && <p className="text-sm">
              <span className={`text-${src.bid.change > 0 ? 'green' : 'red'}-500 mr-2`}>
                { src.bid?.change > 0 ? '▲' : '▼' } {src.bid?.change}%
              </span>
              Bid placed at
            </p> }
            <p>{src.bid?.lastest}</p>
            <div className="flex-grow"></div>
            <a href="/" className="text-gray-main uppercase text-xs inline-block mt-6 text-gray-500 underline">see current bidding</a>
          </div>
          <div className="text-right">
            <img src={`image/${src.provider}_icon.png`} className="inline h-8"/>
            <div className="text-xl font-semibold mt-1">{src.price} ETH</div>
            <div className="text-gray-main text-md">$ {current_price * rate_eth_usd}</div>
          </div>
          </div>
        </div>
        </div>
        </>
      }) }

      <label onClick={() => before()} className="prev control-1 w-10 h-10 absolute cursor-pointer bg-white text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-black leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
      <label onClick={() => previous()} className="next control-1 w-10 h-10 absolute cursor-pointer bg-white text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-black leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

      <ol className="carousel-indicators">
        { bidding_nfts.map((_, index) => {
          return <li className="inline-block mr-2">
            <label onClick={() => setSlide(index+1)} className={`${slide == index+1 ? 'text-black' : 'text-black opacity-25'} carousel-bullet cursor-pointer block text-4xl hover:text-black`}>•</label>
          </li>
        })}
      </ol>

    </div>
  </div>
}

export default Carousel
