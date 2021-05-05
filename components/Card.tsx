import { useState } from 'react'
import Modal from './CardModal'

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

export default ({ src }: Props) => {
  const {price, provider, img} = src
  const [modal, setModal] = useState(false)
  return <>
    { modal && <Modal src={src} action={setModal} />}
    <div onClick={() => setModal(!modal)} className=" cursor-pointer bg-white rounded-16 mb-2">
    <div className="bottom-0 left-0 bg px-2 pt-2 md:text-s text-xs font-sm" style={{borderRadius: '0px 0px 8px 8px'}}> <img className=" h-6 w-6 rounded-full border-1 border-white shadow-nft inline" src="image/beeple_profile.png" alt=""/><span className="ml-2">[CreatorName]</span></div>
     <div className="thumbnail-wrapper w-full">
      <img src={`image/${provider}_icon.png`} className="absolute z-10 top-0 right-0 mt-4 mr-4 h-6"/>
      {/* <div className="relative"> */}
      <img className="rounded-16 border-8 border-white thumbnail-height"  src={img} />
      <div className="absolute flex justify-end	z-10 bottom-0 w-full mb-2 px-2 pt-6" style={{}}>
        <div className="flex px-2 rounded-b-16 pt-10 justify-end w-full" style={{ background: 'linear-gradient(360deg, #00000085 10%, rgba(196, 196, 196, 0) 50%)' }}>
          <div className="text-white text-sm flex-grow flex items-center hidden">
            <img src="image/ic_heart.png" className="w-4 inline mr-2 hidden" alt=""/>14
            <img src="image/ic_eye.png" className="w-4 inline mr-2 ml-2 hidden" alt=""/>145
          </div>
          <div className="text-white font-bold text-right ">{price} ETH</div>
        </div>
      </div>
      </div>
      
      <div className="bottom-0 left-0  bg px-2 pt-2 text-xs font-sm" style={{borderRadius: '0px 0px 8px 8px'}}>Owned by Someone</div>
      <div className="bottom-0 left-0 bg px-2  pb-4 text-xs font-sm text-gray-main" style={{borderRadius: '0px 0px 8px 8px'}}>4 of 5 Edition</div>
    </div>
  </>
}
