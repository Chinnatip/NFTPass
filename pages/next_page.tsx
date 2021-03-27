import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  useEffect(() => {}, [])
  const Router = useRouter()
  return <div className="flex h-screen w-screen items-center justify-center bg-blue-500">
    <div className=" w-1/2 bg-yellow-400 p-6 text-center text-2xl rounded-xl">
      <p className="font-semibold text-yellow-700 mb-5">This is next page</p>
      <img className="m-auto block" src="mask_face/mask-red.png" alt=""/>
      <button onClick={() => Router.push('/')} className="text-white bg-blue-700 rounded-xl px-4 py-2 mt-4">Login</button>
    </div>
  </div>

}

export default Page
