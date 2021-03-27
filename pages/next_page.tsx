import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  useEffect(() => { }, [])
  const Router = useRouter()
  return <div className="flex flex-col items-center justify-center bg-gray-300">
    <div><img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/NFTpass.svg?alt=media&token=624e343b-d138-4253-893d-e0a8bb39a4f8" /></div>
    <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primaey rounded-none flex flex-col bg-pattern">
      <div className="flex flex-col mb-8">
        <a onClick={() => Router.push('/')} className="text-left mb-2"> ← Back </a>
        <img className="block w-full" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ce0cbc73949311.5c1adc41ccdcd.jpg" alt="" />
        <div className="py-8 flex flex-col text-left">
          <div className="mt-2">
            <span className="text-base	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-base	block">Market Place: Rarible</span>
            <span className="text-base	block">Edition: 22/100</span>
            <span className="text-base	block text-gray-500	">Contact Address: 09fwg4....</span>
            <span className="text-base	block text-gray-500	">Token ID: 400492hvr8</span>
            <span className="text-base	block text-gray-500	">Blockchain: Ethereum</span>
          </div>
        </div>
      </div>
      <span className="text-left">Exhibition</span>
      <div className="flex flex-col mb-8">
        <a onClick={() => Router.push('https://rarible.com/collection/0xd92e44ac213b9ebda0178e1523cc0ce177b7fa96')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2"><img width="50" height="50" className="inline" src="https://cryptomode.com/wp-content/uploads/2020/09/CryptoMode-Rarible-Crypto-Art.png" /> <span>Rarible</span></a>
      </div>
      <span className="text-left">Same Collection(4)</span>
      <div className="grid grid-cols-2 gap-4 my-4 mb-8">
        <a onClick={() => Router.push('/next_page')} className="style-box-primaey artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ce0cbc73949311.5c1adc41ccdcd.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Market Place: Rarible</span>
            <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
            <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
            <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
          </div>
        </a>
        <a className="style-box-primaey artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/cfe1cf73949311.5c1adc41c9b7b.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Market Place: Rarible</span>
            <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
            <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
            <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
          </div>
        </a>
        <a className="style-box-primaey artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/69caa773949311.5c1adc41c9f84.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Market Place: Rarible</span>
            <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
            <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
            <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
          </div>
        </a>
        <a className="style-box-primaey artwork-card flex-col text-left">
          <img className="m-auto block thumbnail-work" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/9660c273949311.5c1adc41cc287.jpg" alt="" />
          <div className="mt-2">
            <span className="text-sm	block text-blue-600">Current Owner: Thanon</span>
            <span className="text-sm	block">Market Place: Rarible</span>
            <span className="text-sm	block text-gray-500	">Contact Address: 09fwg4....</span>
            <span className="text-sm	block text-gray-500	">Token ID: 400492hvr8</span>
            <span className="text-sm	block text-gray-500	">Blockchain: Ethereum</span>
          </div>
        </a>
      </div>
    </div>
  </div>

}

export default Page
