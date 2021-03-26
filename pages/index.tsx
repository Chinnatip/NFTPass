import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  const [ title ] = useState('NFTPass')
  const Router = useRouter()
  useEffect(() => {}, []);
  return <div className="flex h-screen w-screen items-center justify-center bg-blue-500">
    <div className=" w-1/2 bg-yellow-400 p-6 text-center text-2xl rounded-xl">
      <p className="font-semibold text-yellow-700 mb-5">Hello, {title}</p>
      <img className="m-auto block" src="mask_face/mask-green.png" alt=""/>
      <button onClick={() => Router.push('/next_page')} className="text-white bg-blue-700 rounded-xl px-4 py-2 mt-4">Login</button>
    </div>
  </div>
}

export default Page
