import React, { useState, useEffect } from 'react'
import axios from 'axios'

type NFTS = {
  ownLists: string[]
  nfts: NFTMetadata[]
}

type Attribute = {
  key: string
  value: string
}

type NFTMetadata = {
  name: string
  token: string
  token_address: string
  token_id: string
  description?: string
  attributes?: Attribute[],
  image: {
    url: {
      ORIGINAL: string
      BIG: string
      PREVIEW: string
    },
    meta: {
      PREVIEW: {
        type: string
        width: number
        height: number
      }
    }
  }
  animation?: {
    url: {
      ORIGINAL: string
    },
    meta: {
      ORIGINAL: {
          type: string
      }
    }
  }
}

const Page = ({address}: {
  address: string
}) => {
  const [load, setLoad] = useState(true)
  const [NFTLists, setNFTLists] = useState<NFTMetadata[]>([])
  const [ownLists, setOwnLists] = useState<string[]>([])
  useEffect(() => {
    (async () => {
      const resp = await axios(`/api/fetch?address=${address}`)
      if(resp.status == 200){
        const response : any  = resp.data
        const NFTdata: NFTS = response
        setNFTLists(NFTdata.nfts)
        setOwnLists(NFTdata.ownLists)
        setLoad(false)
      }
    })()
  }, []);
  return <div>
    <h1>{address}</h1>
    { !load ? <>
      { ownLists.map(o => <div>{o}</div>) }
      <br />
      { NFTLists.map(n => {
        console.log(n)
        return <div>
          <img src={n.image.url.PREVIEW} alt="" />
        </div>
      })}
    </>:
    <div>Loading ...</div>
    }
  </div>
}

export async function getServerSideProps(context: any) {
  const { address } = context.query
  return {
    props: {
      address
    },
  }
}


export default Page
