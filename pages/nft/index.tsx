import { useState, useEffect } from 'react'
import { RaribleNFTFull, ProfileList } from '../../method/rarible/interface'
import { raribleImg } from '../../method/rarible/method'
import * as rarible from '../../method/rarible/fetch'

const Page = ({ address }: {address: string}) => {
  const [nft, setNFT] = useState<RaribleNFTFull>()
  const [creator, setCreator] = useState<ProfileList>()
  const [owners, setOwners] = useState<ProfileList[]>([])

  useEffect(() => {
    (async () => {
      // NFT detail
      const resp = await rarible.collectNFTS([address])
      const nft : RaribleNFTFull = resp.data[0]
      setNFT(nft)

      // Profiles
      const profileLists = [...new Set([nft.item.creator , ...nft.item.owners])]
      const profileResp = await rarible.collectPROFILE(profileLists)
      const profileGet = profileResp.data.map((profile:ProfileList) => {
        return {
          ...profile,
          image: raribleImg(profile?.image)
        }
      })
      setCreator(profileGet.find((profile: ProfileList) => profile.id == nft?.item?.creator))
      setOwners( profileGet.filter((profile: ProfileList) => nft?.item?.owners.includes(profile.id) ) )
    })()
  }, []);

  return <div className="p-20">
    <div className="w-2/3 flex m-auto">
      <div className="w-1/3" >
        <img src={nft?.properties.imageBig}  />
      </div>
      <div className="ml-8 w-2/3">
        <h1 className="text-xl">{nft?.properties?.name}</h1>
        <div className="text-gray-500 mb-4">{address}</div>
        <h3>{nft?.properties?.description}</h3>
        <br />
        <div className="flex text-2xl ">
          <span className="flex-grow">
            {nft?.item?.ownership?.status}
          </span>
          {nft?.item?.ownership?.priceEth} ETH
        </div>
        <br />
        <div>Supply: {nft?.item?.supply} / Selling: {nft?.item?.ownership?.selling}</div>
        <div>Like:  {nft?.item?.likes} / Visit: {nft?.item?.visits}</div>
        <div className="flex h-12 items-center">
          <span className="flex-grow">Creator:</span>
          <a href={`/profile?address=${creator?.id}`} target="_blank">
            { creator?.image != '' ?
              <img src={creator?.image} className="w-10 rounded-full" />:
              <span className="inline-block w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">{creator?.name?.substr(0,1)}</span>
            }
          </a>
        </div>
        { owners.length > 0 && <div className="flex h-12 items-center">
          <span className="flex-grow">Owner:</span>
          { owners.map(owner => <a href={`/profile?address=${owner.id}`} target="_blank" className="flex items-center">
            { owner?.image != '' ?
              <img src={owner?.image} className="w-10 rounded-full ml-2" />:
              <span className="inline-block w-10 h-10 rounded-full bg-purple-500 ml-2 flex items-center justify-center">{owner?.name?.substr(0,1)}</span>
            }
          </a> ) }
        </div> }
      </div>
    </div>
    <div className="w-2/3 m-auto">
      <div className="text-center mt-12 mb-12">
        <a href={`/profile?address=${nft?.item?.creator}`} className="bg-blue-500 p-3 text-white rounded-xl">See creator profile</a>
      </div>
      <hr />
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
