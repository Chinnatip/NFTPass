import axios from 'axios'
import { ethers } from 'ethers'
import { GallerystTokenMetadata } from 'interfaces/contract'
import { REQUIRED_ABIs } from 'static/Abi'

class ContractQuerierService {
  getMetadataUri = async (
    contractAddress: string,
    tokenId: number
  ): Promise<GallerystTokenMetadata | null> => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, REQUIRED_ABIs, provider)
      // get uri
      const genericMetaUri: string = await contract.uri(tokenId)
      // replace {id} with tokenId
      const filename = tokenId.toString(16).padStart(64, '0')
      const metadataUri = genericMetaUri.replace('{id}', filename)
      // get the JSON metadata
      const response = await axios.get(metadataUri)
      return response.data
    } catch {
      return null
    }
  }
}

export const contractQuerierService = new ContractQuerierService()
