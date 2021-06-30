import { ConnectBtn } from '@/Galleryst'
import { gallerystService } from 'services/galleryst.service'

const Mint = () => {
  return (
    <div className="p-10">
      <ConnectBtn />
      <div className="flex flex-col items-end">
        <button
          onClick={gallerystService.mint}
          style={{ color: '#9A6B6B', backgroundColor: '#C7AAAA' }}
          className={`py-2 px-3 mx-5 font-semibold text-sm focus:outline-none appearance-none rounded-full mt-5`}
        >
          Mint
        </button>
        <button
          onClick={gallerystService.balance}
          style={{ color: '#9A6B6B', backgroundColor: '#C7AAAA' }}
          className={`py-2 px-3 mx-5 font-semibold text-sm focus:outline-none appearance-none rounded-full mt-5`}
        >
          Balance
        </button>
        <button
          onClick={gallerystService.allTokens}
          style={{ color: '#9A6B6B', backgroundColor: '#C7AAAA' }}
          className={`py-2 px-3 mx-5 font-semibold text-sm focus:outline-none appearance-none rounded-full mt-5`}
        >
          All Tokens
        </button>
      </div>
    </div>
  )
}

export default Mint
