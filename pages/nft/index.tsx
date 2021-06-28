import { useState, useEffect } from 'react'
import { RaribleNFTFull, ProfileList, BestOffer, Activity } from '../../method/rarible/interface'
import { raribleImg } from '../../method/rarible/method'
import * as rarible from '../../method/rarible/fetch'
import dayjs from 'dayjs'
import { profile } from 'node:console'
import { name } from 'dayjs/locale/*'

const Page = ({ address }: { address: string }) => {
  const [nft, setNFT] = useState<RaribleNFTFull>()
  const [creator, setCreator] = useState<ProfileList>()
  const [owners, setOwners] = useState<ProfileList[]>([])
  const [users, setUsers] = useState<ProfileList[]>([])
  const [offer, setOffer] = useState<BestOffer>()
  const [activities, setActivity] = useState<Activity[]>([])

  useEffect(() => {
    (async () => {
      // NFT detail
      const resp = await rarible.collectNFTS([address])
      const nft: RaribleNFTFull = resp.data[0]
      setNFT(nft)

      // Profiles
      let profileLists = [...new Set([nft.item.creator, ...nft.item.owners])]
      const profileResp = await rarible.collectPROFILE(profileLists)
      let profileGet = profileResp.data.map((profile: ProfileList) => {
        return {
          ...profile,
          image: raribleImg(profile?.image)
        }
      })
      setCreator(profileGet.find((profile: ProfileList) => profile.id == nft?.item?.creator))
      setOwners(profileGet.filter((profile: ProfileList) => nft?.item?.owners.includes(profile.id)))

      const offerResponse = await rarible.getBestOffer([address])
      setOffer(offerResponse.data[0])

      const activityResponse = await rarible.getNFTactivity(nft.item?.token, nft.item?.tokenId)
      const activities: Activity[] = activityResponse.data
      setActivity(activities)

      // Collect all user from activity
      let otherProfile: string[] = []
      activities.map(activity => {
        otherProfile.push(activity.owner)
        if (activity.from != undefined) {
          otherProfile.push(activity.from)
        }
      })
      otherProfile = [...new Set(otherProfile)]
      otherProfile = otherProfile.filter(n => !profileLists.includes(n)) //Subtract profile lists
      if (otherProfile.length > 0) {
        const otherProfileResp = await rarible.collectPROFILE(otherProfile)
        const otherProfileGet = otherProfileResp.data.map((profile: ProfileList) => {
          return {
            ...profile,
            image: raribleImg(profile?.image)
          }
        })
        console.log(profileGet.length)
        profileGet = [...profileGet, ...otherProfileGet]
      }
      setUsers(profileGet)

    })()
  }, []);

  const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')

  const profilePic = (address: string | undefined, userLists: ProfileList[]) => {
    if (address != undefined) {
      const finder = userLists.find(user => user.id === address)
      return <a href={`/profile?address=${address}`} className="bg-gray-500 mx-2 w-8 h-8 rounded-full overflow-hidden inline-flex items-center justify-center">
        <img src={finder?.image} className="h-8 inline " />
      </a>
    } else {
      return <div className="w-8 h-8 inline bg-gray-600 rounded-full" />
    }
  }

  const profileAddress = (user: ProfileList | undefined) => {
    return user != undefined && user?.image != '' ?
      <a href={`/profile?address=${user.id}`} target="_blank" className="ml-2 bg-gray-500 w-10 h-10 rounded-full overflow-hidden inline-flex items-center justify-center">
        <img src={user?.image} className="h-10 inline" />
      </a> :
      <span className="inline-block w-10 h-10 rounded-full bg-purple-500 ml-2 flex items-center justify-center">{user?.name?.substr(0, 1)}</span>
  }

  return <div className="w-screen h-screen z-20 bg-white fixed top-0 left-0 overflow-y-scroll overflow-x-hidden">
    <div className="flex flex-col">
      <div className="w-full relative flex items-center justify-center" style={{ background: 'rgba(92, 86, 86, 0.48)', height: '75vh' }}>
        <div className="p-4 flex items-center">
          <img src={nft?.properties.imageBig} className="shadow-nft-img rounded-lg fit-wh-img" />
        </div>
      </div>
      <div className="text-center mt-10 mb-12">
        <a href={`/profile?address=${nft?.item?.creator}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
      </div>

      <div className="m-auto w-2/3 flex lg:flex-row-reverse flex-col justify-between">
        <div className="lg:w-1/2 w-full">
          <h1 className="text-xl">{nft?.properties?.name}</h1>
          <div className="text-gray-500 mb-4 break-words">{address}</div>
          <h3>{nft?.properties?.description}</h3>
        </div>
        <br />
        <div className="lg:w-1/2 w-full lg:pr-6 pr-0 lg:sticky">
          {nft?.item?.ownership?.priceEth != undefined && <div className="flex text-2xl ">
            <span className="flex-grow">
              {nft?.item?.ownership?.status}
            </span>
            {nft?.item?.ownership?.priceEth} ETH
        </div>}
          {offer != undefined && <div className="flex text-2xl ">
            <span className="flex-grow">
              Best offer
          </span>
            {offer?.buyPriceEth} ETH
        </div>}
          <br />
          <div hidden>
            <div>Supply: {nft?.item?.supply} / Selling: {nft?.item?.ownership?.selling}</div>
            <div>Like:  {nft?.item?.likes} / Visit: {nft?.item?.visits}</div>
          </div>
          <div className="shadow-nft p-6 rounded-24">
            <div className="flex h-12 items-center ">
              <span className="flex-grow">Creator:</span>
              {profileAddress(creator)}
            </div>
            {owners.length > 0 && <div className="flex h-12 items-center">
              <span className="flex-grow">Owner:</span>
              {owners.map(owner => profileAddress(owner))}
            </div>}
          </div>
        </div>
      </div>
    </div>
    <div className="w-2/3 m-auto">
      <div className="px-12 m-auto">
        <h2 className="mt-8 text-xl font-semibold">NFT History</h2>
        {/* Activity lists */}
        {activities.map(activity => {
          switch (activity['@type']) {
            case 'order':
              return <div className="flex items-center my-4">
                {profilePic(activity.owner, users)} - {activity['@type']} ({activity.value}items | price {activity.price}ETH) @ {getDate(activity.date)}
              </div>
            case 'transfer':
              return <div className="flex items-center my-5">
                {profilePic(activity.from, users)} - {activity['@type']} to {profilePic(activity.owner, users)} ({activity.value}item) @ {getDate(activity.date)}
              </div>
            case 'mint':
              return <div className="flex items-center my-5">
                {profilePic(activity.owner, users)} - {activity['@type']} @ {getDate(activity.date)}
              </div>
          }
        })}
      </div>

    </div>
  </div>
}

export async function getServerSideProps(context: any) {
  const { address } = context.query
  return {
    props: { address },
  }
}

export default Page
