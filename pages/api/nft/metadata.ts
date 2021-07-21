import axios from 'axios'
import { ethers } from 'ethers'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { REQUIRED_ABIs } from 'static/Abi'
import admin from 'firebase-admin'
import { Media } from 'interfaces'
import { GallerystTokenMetadata } from 'interfaces/contract'
import { isValidHttpUrl } from 'utils/url.util'
import dayjs from 'dayjs'
import { customAlphabet } from 'nanoid'
import { removeNullish } from 'utils/json.util'
import { ERC1155_INTERFACE_ID, ERC721_INTERFACE_ID } from 'static/InterfaceId'

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const nanoid = customAlphabet(alphabets, 5)

type Body = {
  contractAddress: string
  tokenId: number
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: 'galleryst-f7fe1.appspot.com',
  })
}
const firestore = admin.firestore()
const bucket = admin.storage().bucket()

const uploadMedia = async (mediaList: Media[]): Promise<Array<Media & { ipfsHash: string }>> => {
  return Promise.all(
    mediaList.map(async media => {
      const ipfsHash = media.src.split('/').pop()!
      const filepath = `ipfs-media/${ipfsHash}`
      const documentRef = firestore.collection('ipfsToContent').doc(ipfsHash)
      const document = await documentRef.get()
      let newUrl: string
      if (!document.exists) {
        const response = await axios.get<Buffer>(media.src, { responseType: 'arraybuffer' })
        console.log('saving', ipfsHash)
        await bucket.file(filepath).save(response.data)
      }
      newUrl = (
        await bucket.file(filepath).getSignedUrl({
          action: 'read',
          expires: dayjs().add(1, 'year').toDate(),
        })
      )[0]
      await documentRef.set({ type: media.type, src: newUrl })
      return { type: media.type, src: newUrl, ipfsHash }
    })
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // handlers
  try {
    switch (req.method) {
      case 'PATCH': {
        console.log('getting metadata')
        // First: get token metadata
        const { contractAddress, tokenId }: Body = req.body
        const address = `${contractAddress}:${tokenId}`
        const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL)
        const contract = new ethers.Contract(contractAddress, REQUIRED_ABIs, provider)

        // detect erc-721 or erc-1155 first
        const isErc721: boolean = await contract.supportsInterface(ERC721_INTERFACE_ID)
        const isErc1155: boolean = await contract.supportsInterface(ERC1155_INTERFACE_ID)
        // let metadataUri: string;
        let metadata: GallerystTokenMetadata
        if (isErc721) {
          // beta
          const tokenUri = await contract.tokenUri(tokenId)
          const response = await axios.get(tokenUri)
          const isMetadata = response.headers['content-type']?.includes('application/json')
          if (isMetadata) {
            metadata = response.data
          } else {
            metadata = {
              name: 'untitled',
              image: response.data,
            }
          }
        } else if (isErc1155) {
          const genericUri = await contract.uri(tokenId)
          const filename = tokenId.toString(16).padStart(64, '0')
          const metadataUri = genericUri.replace('{id}', filename)
          const response = await axios.get(metadataUri)
          metadata = response.data
        } else {
          throw new Error(`${contractAddress} is not an nft contract.`)
        }

        console.log('parsing media list')
        let gallerystCheck
        let mediaList: Media[] = [{ type: 'image', src: metadata.image }] // main image
        if (Array.isArray(metadata.media_list)) {
          mediaList.push(...metadata.media_list) // other media
        }
        if (!!metadata.animation_url) {
          mediaList.unshift({ type: 'video', src: metadata.animation_url }) // main video
        }
        mediaList = mediaList.filter(m => isValidHttpUrl(m.src)) // filter invalid src

        // upload ipfs media to firebase storage
        // * if exists, will update download url
        console.log('caching media')
        const cachedMediaList = await uploadMedia(mediaList)

        console.log('media cached')
        const mainCachedMedia = cachedMediaList.find(media => {
          const ipfsHash = metadata.image.split('/').pop()!
          return media.ipfsHash === ipfsHash
        })

        gallerystCheck = {
          status: true,
          data: {
            title: metadata.name,
            description: metadata.description,
            image: mainCachedMedia?.src,
            rawMetadata: metadata,
            mediaList: cachedMediaList,
            creator: {
              address: metadata.creator ?? '',
            },
          },
        }

        console.log('updating data')
        // lookup existing data in firebase
        const documentRef = firestore.collection('nft').doc(address)
        const document = await documentRef.get()

        let parcel

        if (document.exists) {
          const existingParcel = document.data()
          parcel = {
            ...existingParcel,
            platform: {
              ...existingParcel!.platform,
              current: 'galleryst',
            },
            galleryst: gallerystCheck,
            current_update: dayjs().unix(),
          }
        } else {
          parcel = {
            platform: {
              current: 'galleryst',
              check: {
                opensea: { status: false, data: {} },
                rarible: { status: false, data: {} },
              },
            },
            galleryst: gallerystCheck,
            current_update: dayjs().unix(),
            galleryst_id: nanoid(),
            address,
          }
        }

        const sanitizedParcel = removeNullish(parcel)
        await documentRef.set(sanitizedParcel)

        console.log('refreshing done')
        res.status(200).send(sanitizedParcel)
        break
      }
      default: {
        res.status(404).send('Not found')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal server error')
  }
}
