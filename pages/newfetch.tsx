import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as firebase from "../method/firebase"

type NFTS = {
  nfts: string[]
  ownLists: string[]
  collection: {
    name: string
    symbol: string
    address: string
    token_uri: string
    collection: boolean
    tokenType: string
  }[]
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
  creators: {
    account: string
    value: number
  }[]
  collection: {
    address: string
    collection: boolean
    name: string
    symbol: string
    tokenType: string
    token_url: string
  }
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
  supply: number
  syncDate: string
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
  const [createdLists, setCreatedLists] = useState<string[]>([])
  
  useEffect(() => {
    (async () => {
      const resp = await axios(`/api/fetch?address=${address}`)
      if(resp.status == 200){
        const response : any  = resp.data
        const NFTdata: NFTS = response

        setOwnLists(NFTdata.ownLists)
        setLoad(false)

        let lists : NFTMetadata[] = []
        let parseCreatedList : string[] = []

        NFTdata.nfts.map(id => {
          if(id.split(':')[1] != ''){
            firebase.findbyAddress('metadata', id).then(doc => {
              if(doc.exists){
                const data: any = doc.data()
                const metadata : NFTMetadata = data
                lists = [...lists , metadata]
                setNFTLists(lists)
                if(metadata.creators.map(c => c.account).includes(address)){
                  parseCreatedList = [...parseCreatedList, id]
                }
                setCreatedLists(parseCreatedList)
              }else{
                axios(`/api/metadata?address=${id}`).then(res => {
                  if(res.status == 200){
                    const data: any = res.data
                    const metadata : NFTMetadata = { ...data ,
                      token: id,
                      token_address: id.split(':')[0],
                      token_id: id.split(':')[1],
                      collection: NFTdata.collection.find(col => col.address == id.split(':')[0])
                    }
                    lists = [...lists , metadata]
                    setNFTLists(lists)
                    if(metadata.creators.map(c => c.account).includes(address)){
                      parseCreatedList = [...parseCreatedList, id]
                    }
                    setCreatedLists(parseCreatedList)
                    firebase.writeDocument('metadata', id, metadata)
                  }
                })
              }
            })
          }
        })
      }
    })()
  }, []);
  return <div>
    <h1>{address}</h1>
    { !load ? <>
      <div className="w-screen flex ">
        <div className="w-1/2">
          <div>ownedLists</div>
          { ownLists.map(l => {
            const findItem = NFTLists.find(nft => nft.token == l)
            return <img className="inline" src={findItem?.image?.url?.PREVIEW} alt="" />
          }) }
          
        </div>
        <div className="w-1/2">
          <div>createdLists</div>
          { createdLists.map(l => {
            const findItem = NFTLists.find(nft => nft.token == l)
            return <img className="inline" src={findItem?.image?.url?.PREVIEW} alt="" />
          }) }
        </div>
      </div>
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