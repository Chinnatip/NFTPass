import { prepNum } from '../method/setNumber'
import { LinkButton } from '../components/Button'

type Artist = {
  img: string
  name: string
  address: string
  verfiy: boolean
  connection: {
    twitter?: {
      follower: number
      url: string
    },
    instagram?: {
      follower: number
      url: string
    },
    supporter?: {
      follower: number
    }
  }
}

export const ProfileCard = ({ profile }: { profile: Artist}) => {
  return <>
    <div className="text-center">
      <img
        src={profile?.img}
        className="inline-block h-32 w-32 border-4 border-white shadow-nft rounded-48 -mt-12"
        alt=""/>
    </div>
    <div className="m-auto text-center mt-3">
      <div className="mb-4 text-3xl font-semibold">
        {profile?.name}
        <img src="image/verify_logo.png" className="inline h-6 ml-2 -mt-1"/>
      </div>
      <div className="flex flex-row justify-center">
      <div className="text-sm shadow-nft rounded-full bg-white inline p-2 px-4 font-thin ">
        <span>
          #{profile?.address}
          <img src="image/copy_icon.png" className="inline ml-2 -mr-2 -mt-1 h-5" />
        </span>

      </div>
      <div className="ml-2">
      <LinkButton text="Edit" icon="image/edit_icon_dark.png" link="/dashboard" />
      </div>
      </div>
    </div>
  </>
}

export const ProfileStat = ({ profile }: { profile: Artist}) => {
  const { connection : { twitter , instagram, supporter } } = profile
  return <div className="flex m-auto justify-center mt-10">
    { twitter && <div className="px-6">
      <p className="text-sm font-thin">
        Twitter
        <img src="image/correct_icon.png" alt="" className="inline h-3 ml-1 -mt-1"/>
      </p>
      <p className=" text-xl font-semibold">{prepNum(twitter.follower)} Followers</p>
    </div>}
    { instagram && <div className="border-l-4 px-6">
      <p className="text-sm font-thin">
        Instagram
        <img src="image/correct_icon.png" alt="" className="inline h-3 ml-1 -mt-1"/>
      </p>
      <p className=" text-xl font-semibold">{prepNum(instagram.follower)} Followers</p>
    </div>}
    { supporter && <div className="border-l-4 px-6">
      <p className="text-sm font-thin">
        Supporters
      </p>
      <p className=" text-xl font-semibold">{prepNum(supporter.follower)} Collectiors</p>
    </div>}
  </div>
}
