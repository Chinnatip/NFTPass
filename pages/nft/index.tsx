import { useState, useEffect } from 'react'
import { RaribleNFTFull, ProfileList, BestOffer, Activity } from '../../method/rarible/interface'
import { raribleImg } from '../../method/rarible/method'
import * as rarible from '../../method/rarible/fetch'
import dayjs from 'dayjs'

const Page = ({ address }: {address: string}) => {
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
      const nft : RaribleNFTFull = resp.data[0]
      setNFT(nft)

      // Profiles
      let profileLists = [...new Set([nft.item.creator , ...nft.item.owners])]
      const profileResp = await rarible.collectPROFILE(profileLists)
      let profileGet = profileResp.data.map((profile:ProfileList) => {
        return {
          ...profile,
          image: raribleImg(profile?.image)
        }
      })
      setCreator(profileGet.find((profile: ProfileList) => profile.id == nft?.item?.creator))
      setOwners( profileGet.filter((profile: ProfileList) => nft?.item?.owners.includes(profile.id) ) )

      const offerResponse = await rarible.getBestOffer([address])
      setOffer(offerResponse.data[0])

      const activityResponse = await rarible.getNFTactivity(nft.item?.token , nft.item?.tokenId)
      const activities : Activity[] = activityResponse.data
      setActivity(activities)

      // Collect all user from activity
      let otherProfile : string[] = []
      activities.map(activity => {
        otherProfile.push(activity.owner)
        if(activity.from != undefined){
          otherProfile.push(activity.from)
        }
      })
      otherProfile = [...new Set(otherProfile)]
      otherProfile = otherProfile.filter(n => !profileLists.includes(n)) //Subtract profile lists
      if(otherProfile.length > 0){
        const otherProfileResp = await rarible.collectPROFILE(otherProfile)
        const otherProfileGet = otherProfileResp.data.map((profile:ProfileList) => {
          return {
            ...profile,
            image: raribleImg(profile?.image)
          }
        })
        console.log(profileGet.length)
        profileGet = [ ...profileGet, ...otherProfileGet ]
      }
      setUsers(profileGet)

    })()
  }, []);

  const getDate = (dayFormat: string) => dayjs(dayFormat).format('DD MMM YYYY')

  const profilePic = (address: string | undefined, userLists: ProfileList[]) => {
    if(address != undefined){
      const finder = userLists.find(user => user.id === address)
      return <a href={`/profile?address=${address}`} className="bg-gray-500 mx-2 w-8 h-8 rounded-full overflow-hidden inline-flex items-center justify-center">
        <img src={finder?.image} className="h-8 inline " />
      </a>
    }else{
      return <div className="w-8 h-8 inline bg-gray-600 rounded-full" />
    }
  }

  const profileAddress = (user: ProfileList | undefined) => {
    return  user != undefined && user?.image != '' ?
      <a href={`/profile?address=${user.id}`} target="_blank" className="ml-2 bg-gray-500 w-10 h-10 rounded-full overflow-hidden inline-flex items-center justify-center">
        <img src={user?.image} className="h-10 inline" />
      </a>  :
      <span className="inline-block w-10 h-10 rounded-full bg-purple-500 ml-2 flex items-center justify-center">{user?.name?.substr(0,1)}</span>
  }

  return <div className="p-20">
    <div className="w-2/3 flex m-auto">
      <div className="w-1/3" >
        <img src={nft?.properties.imageBig}  />
        <div className="text-center mt-10 mb-12">
          <a href={`/profile?address=${nft?.item?.creator}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
        </div>
      </div>
      <div className="ml-8 w-2/3">
        <h1 className="text-xl">{nft?.properties?.name}</h1>
        <div className="text-gray-500 mb-4">{address}</div>
        <h3>{nft?.properties?.description}</h3>
        <br />
        { nft?.item?.ownership?.priceEth != undefined && <div className="flex text-2xl ">
          <span className="flex-grow">
            {nft?.item?.ownership?.status}
          </span>
          {nft?.item?.ownership?.priceEth} ETH
        </div> }
        { offer != undefined && <div className="flex text-2xl ">
          <span className="flex-grow">
            Best offer
          </span>
          {offer?.buyPriceEth} ETH
        </div> }
        <br />
        <div>Supply: {nft?.item?.supply} / Selling: {nft?.item?.ownership?.selling}</div>
        <div>Like:  {nft?.item?.likes} / Visit: {nft?.item?.visits}</div>
        <div className="flex h-12 items-center">
          <span className="flex-grow">Creator:</span>
          { profileAddress(creator) }
        </div>
        { owners.length > 0 && <div className="flex h-12 items-center">
          <span className="flex-grow">Owner:</span>
          { owners.map(owner =>  profileAddress(owner)) }
        </div> }
      </div>
    </div>
    <div className="w-2/3 m-auto">
      <br />
      <hr />
      <div className="px-12">
        <h2 className="mt-8 text-xl font-semibold">NFT History</h2>
        {/* Activity lists */}
        { activities.map(activity => {
          switch (activity['@type']){
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
        }) }
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
