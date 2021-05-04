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
    <div onClick={() => setModal(!modal)} className="relative cursor-pointer bg-white rounded-16 mb-4 pb-6">
      <img src={`image/${provider}_icon.png`} className="absolute top-0 right-0 mt-4 mr-4 h-6"/>
      {/* <div className="relative"> */}
      <img className="rounded-16 border-8 border-white "  src={img} />
      <div className="absolute bottom-0 w-full mb-3 px-2 pt-6 mb-8" style={{}}>
        <div className="flex px-2 rounded-b-md pt-10" style={{ background: 'linear-gradient(360deg, #00000085 10%, rgba(196, 196, 196, 0) 50%)' }}>
          <div className="text-white text-sm flex-grow flex items-center">
            <img src="image/ic_heart.png" className="w-4 inline mr-2 " alt=""/>14
            <img src="image/ic_eye.png" className="w-4 inline mr-2 ml-2" alt=""/>145
          </div>
          <div className="text-white font-bold text-right ">{price} ETH</div>
        </div>
      </div>
      <div className="bottom-0 left-0 ml-2 absolute bo bg px-2 pt-0 pb-2 text-xs font-semibold" style={{borderRadius: '0px 0px 8px 8px'}}>Owned by Someone</div>
    </div>
  </>
}
