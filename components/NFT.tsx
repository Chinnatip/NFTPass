import { rate_eth_usd } from '../static/NFTLists'

const NFT = ({ src }:{
  src: {
  title?: string
  price?: number
  provider?: string
  img?: string
  bid?: {
    change: number
    lastest: string
  }
  }}) => {
  const current_price = src?.price != undefined ? src.price : 0
  return <div className="m-auto rounded-16 mt-4 mb-6 bg-white shadow-nft p-4 flex flex-col md:flex-row h-52" style={{width: '84%'}}>
    <img src={src.img} className="h-40 md:w-40 w-full rounded-lg" alt=""/>
    <div className="flex flex-col md:flex-row w-full">
    <div className="ml-8 flex-grow">
      { src.bid != undefined && <p className="text-sm">
        <span className={`text-${src.bid.change > 0 ? 'green' : 'red'}-500 mr-2`}>
          { src.bid?.change > 0 ? '▲' : '▼' } {src.bid?.change}%
        </span>
        Bid placed at
      </p> }
      <p>{src.bid?.lastest}</p>
      <a href="/" className="inline-block mt-6 text-gray-500 underline">see current bidding</a>
    </div>
    <div className="text-right">
      <img src={`image/${src.provider}_icon.png`} className="inline h-8"/>
      <div className="text-xl font-semibold mt-1">{src.price} ETH</div>
      <div className="text-sm">$ {current_price * rate_eth_usd}</div>
    </div>
    </div>
  </div>
}

export default NFT
