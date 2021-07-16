import axios from 'axios'
import { ethers } from 'ethers'
import { URI_ABI } from 'static/Abi'
import { GallerystTokenMetadata } from 'types/contract.type'

class ContractQuerierService {
  getMetadataUri = async (
    contractAddress: string,
    tokenId: number
  ): Promise<GallerystTokenMetadata> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, URI_ABI, provider)
    // get uri
    const genericMetaUri: string = await contract.uri(tokenId)
    // replace {id} with tokenId
    const filename = tokenId.toString(16).padStart(64, '0')
    const metadataUri = genericMetaUri.replace('{id}', filename)
    // get the JSON metadata
    const response = await axios.get(metadataUri)
    return response.data
  }
}

export const contractQuerierService = new ContractQuerierService()
