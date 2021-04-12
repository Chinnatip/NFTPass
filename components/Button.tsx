import { useRouter } from 'next/router'

export const LinkButton = ({ active=false, fit=false, link ,text, icon }:{
  active?: boolean,
  fit?:boolean,
  link: string ,
  text: string ,
  icon: string
}) => {
  const Router = useRouter()
  return <button onClick={() => Router.push(link) }  className={` ${fit && 'w-full inline-block'}  ${active ? 'bg-black text-white' : 'bg-white'} focus:outline-none rounded-full p-2 px-3 flex items-center shadow-nft`}>
    <img src={icon} className="rounded-full inline h-6" />
    <span className="ml-2 font-thin text-sm">{text}</span>
  </button>
}


export const Button = ({text, icon} : {
  text: string ,
  icon: string
}) => {
  return <button className={`focus:outline-none bg-white rounded-full p-2 px-3 flex items-center shadow-nft`}>
  <img src={icon} className="rounded-full inline h-6" />
  <span className="ml-2 font-thin text-sm">{text}</span>
</button>
}
