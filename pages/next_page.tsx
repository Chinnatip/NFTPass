import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  useEffect(() => {}, [])
  const Router = useRouter()
  return <div className="flex flex-col items-center justify-center bg-gray-300">
  <div><img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/NFTpass.svg?alt=media&token=624e343b-d138-4253-893d-e0a8bb39a4f8" /></div>
  <div className=" w-full md:w-1/2 bg-white p-6 text-center text-2xl style-box-primaey rounded-none flex flex-col">
    <div className="flex flex-col mb-8">
      <a onClick={() => Router.push('index')} className=""> Back </a>
      <img className="block w-full" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ce0cbc73949311.5c1adc41ccdcd.jpg" alt="" />
      <div className="py-8 flex flex-col text-left">
      <div className="mt-2">
        <span className="text-base	block text-blue-600">Current Owner: Thanon</span>
        <span className="text-base	block">Market Place: Rarible</span>
        <span className="text-base	block text-gray-500	">Contact Address: 09fwg4....</span>
        <span className="text-base	block text-gray-500	">Token ID: 400492hvr8</span>
        <span className="text-base	block text-gray-500	">Blockchain: Ethereum</span>
        </div>
      </div>
    </div>
    <span className="text-left">Exhibition</span>
    <div className="flex flex-col mb-8">
      <a onClick={() => Router.push('https://rarible.com/collection/0xd92e44ac213b9ebda0178e1523cc0ce177b7fa96')} className="text-black bg-white rounded-none px-4 py-2 mt-4 border-gray-900 border-2">Rarible</a>
    </div>
  </div>
</div>

}

export default Page
