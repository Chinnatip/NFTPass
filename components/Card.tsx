import { useState } from 'react'
import { NFT, Creator, priceCal } from '../method/fetchJSON'
import { useRouter } from 'next/router'
import Modal from './CardModal'

const Card = ({ src, nfts_lists, creator }: {
  src: NFT,
  nfts_lists: NFT[],
  creator: Creator | undefined
}) => {
  const [modal, setModal] = useState(false)
  const Router = useRouter()
  return <>
    { modal && <Modal src={src}
        action={setModal}
        nfts_lists={nfts_lists}
        creator={creator} />}
    <div onClick={() => setModal(!modal)} className=" cursor-pointer bg-white rounded-16 mb-2">
      <button onClick={() => Router.push(`/profile/${src?.nifty_creator_url}`)}className="bottom-0 left-0 bg px-2 pt-2 md:text-s text-sm font-semibold" style={{borderRadius: '0px 0px 8px 8px'}}>
        <img className="h-6 w-6 rounded-full border-1 border-white inline" src={src?.creator_image} alt=""/>
        <span className="ml-2">{src?.creator_name}</span>
      </button>
      <div className="thumbnail-wrapper w-full">
        <img src={`/image/opensea_icon.png`} className="absolute z-10 top-0 right-0 mt-4 mr-4 h-6"/>
        <img className="rounded-16 border-8 border-white thumbnail-height"  src={src?.image?.preview} />
        <div className="absolute flex justify-end	z-10 bottom-0 w-full mb-2 px-2 pt-6" style={{}}>
          <div className="flex px-2 rounded-b-16 pt-10 justify-end w-full" style={{ background: 'linear-gradient(360deg, #00000085 10%, rgba(196, 196, 196, 0) 50%)' }}>
            <div className="text-white text-sm flex-grow flex items-center hidden">
              <img src="/image/ic_heart.png" className="w-4 inline mr-2 hidden" alt=""/>14
              <img src="/image/ic_eye.png" className="w-4 inline mr-2 ml-2 hidden" alt=""/>145
            </div>
            <div className="text-white font-bold text-right ">{priceCal(src?.last_sale)} {src?.last_sale?.symbol}</div>
          </div>
        </div>
      </div>
      <div className="bottom-0 left-0 bg px-3 pb-2 text-xs font-sm" style={{borderRadius: '0px 0px 8px 8px'}}>
        Owned by
        <span className="font-semibold ml-1">{src?.owner?.name}</span>
      </div>
      {/* <div className="bottom-0 left-0 bg px-3 pb-4 text-xs font-sm text-gray-main" style={{borderRadius: '0px 0px 8px 8px'}}>4 of 5 Edition</div> */}
    </div>
  </>
}

export default Card
