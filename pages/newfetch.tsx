import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as firebase from "../method/firebase"

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

const fetchNFTfromETH = async (address: string, setLoad: any ,setNFTLists: any ) => {
  const resp = await axios(`/api/own-nft?address=${address}&chain=polygon`)
  if(resp.status == 200){
    const response : any  = resp.data
    const NFTdata: NFTS = response
    setLoad(false)

    let lists : NFTMetadata[] = []

    console.log(NFTdata.nfts)

    NFTdata.ownLists.map(id => {
      if(id.split(':')[1] != ''){
        firebase.findbyAddress('metadata', id).then(doc => {
          if(doc.exists){
            const data: any = doc.data()
            const metadata : NFTMetadata = data
            lists = [...lists , metadata]
            setNFTLists(lists)
          }else{
            axios(`/api/metadata?address=${id}`).then(res => {
              if(res.status == 200){
                const metadata = { ...res.data ,
                  token: id,
                  token_address: id.split(':')[0],
                  token_id: id.split(':')[1]
                }
                lists = [...lists , metadata]
                setNFTLists(lists)
                firebase.writeDocument('metadata', id, metadata)
              }
            })
          }
        })
      }
    })
  }

}

const Page = ({address}: {
  address: string
}) => {
  const [load, setLoad] = useState(true)
  const [NFTLists, setNFTLists] = useState<NFTMetadata[]>([])
  useEffect(() => {
    (async () => {
      await fetchNFTfromETH(address, setLoad, setNFTLists)

    })()
  }, []);
  return <div>
    <h1>{address}</h1>
    { !load ? <>
      { NFTLists.map(n => {
        return <div>
          <img src={n.image?.url?.PREVIEW} alt="" />
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
