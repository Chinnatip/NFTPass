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
  const {title , price, provider, img} = src
  const [modal, setModal] = useState(false)
  return <>
    { modal && <Modal src={src} action={setModal} />}
    <div onClick={() => setModal(!modal)} className="relative cursor-pointer bg-white rounded-16">
    <div className="text-gray-400 text-sm bg px-2 pt-2 pb-0 flex flex-row items-center">
      <img src={`image/${provider}_icon.png`} className="h-6"/>
      <div className="text-sm ml-1 text-black">{title}</div>
      </div>
      <div className="relative">
      <img className="rounded-16 border-8 border-white "  src={img} />
      <img src={`image/${provider}_icon.png`} className="top-0 right-0 absolute h-6 mr-4 mt-4"/>
      <div className="overlay absolute bottom-0 w-full mb-3 px-4 pt-6 flex">
        <div className="text-white text-sm flex-grow flex items-center">
          <img src="image/ic_heart.png" className="w-4 inline mr-2 " alt=""/>14
          <img src="image/ic_eye.png" className="w-4 inline mr-2 ml-2" alt=""/>145

        </div>
        <div className="text-white font-bold text-right ">{price} ETH</div>
      </div>
      </div>
      <div className="bg px-2 pt-0 pb-2 text-sm font-semibold" style={{borderRadius: '0px 0px 8px 8px'}}>Owned by Someone</div>
    </div>
  </>
}
