import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  useEffect(() => { }, [])
  const Router = useRouter()
  return <div className="flex flex-col items-center justify-center bg-gray-300">
    <div><img className="logo-header my-4" src="https://firebasestorage.googleapis.com/v0/b/nftpass-6056c.appspot.com/o/NFTpass.svg?alt=media&token=624e343b-d138-4253-893d-e0a8bb39a4f8" /></div>
    <div className=" w-full md:w-3/4 bg-white p-6 text-center text-2xl style-box-primary rounded-none flex flex-col ">
      
      <span className="text-left">Choose Passport</span>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 my-4 mb-8">
        <a onClick={() => Router.push('/next_page')} className="style-box-primary bg-pattern flex-col flex items-stretch booklet-card ">
          
          <div className=" bg-white flex items-endtext-left p-4 w-full">
            <span className="text-sm	block text-black">Circular Grey</span>
          </div>
        </a>
        <a onClick={() => Router.push('/next_page')} className="style-box-primary bg-pattern-a flex-col flex items-stretch booklet-card ">
          
          <div className=" bg-white flex items-endtext-left p-4 w-full">
            <span className="text-sm	block text-black">Circular Grey</span>
          </div>
        </a>
        <a onClick={() => Router.push('/next_page')} className="style-box-primary bg-pattern-b flex-col flex items-stretch booklet-card ">
          
          <div className=" bg-white flex items-endtext-left p-4 w-full">
            <span className="text-sm	block text-black">Circular Grey</span>
          </div>
        </a>
        <a onClick={() => Router.push('/next_page')} className="style-box-primary bg-pattern-c flex-col flex items-stretch booklet-card ">
          
          <div className=" bg-white flex items-endtext-left p-4 w-full">
            <span className="text-sm	block  text-black">Circular Grey</span>
          </div>
        </a>
      </div>
    </div>
  </div>

}

export default Page
