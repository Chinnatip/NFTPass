import axios from 'axios'
import { ethers, utils } from 'ethers'
import { walletStore } from 'stores/wallet.store'
import * as firebase from "../method/firebase"

class WalletService {
  private provider!: ethers.providers.Web3Provider

  constructor() {}

  init = () => {
    this.provider = walletStore.defaultProvider
  }

  checkGallerystVerified = async (address: string): Promise<boolean> => {
    // TODO: add GET verify status from BE
    // await axios.get('/...')
    const verified = Number.isInteger(address) // always false
    return verified
  }

  getAccounts = async () => {
    const accounts = await this.provider.send('eth_requestAccounts', [])
    walletStore.setAccounts(accounts)
  }

  updateBalance = async () => {
    if (!walletStore.address) return
    const balance = await this.provider.getBalance(walletStore.address)
    walletStore.setBalance(+utils.formatEther(balance))
  }

  connect = async (addressToConnect: string, openModal: any) => {
    if (!addressToConnect || walletStore.accounts.length === 0) {
      await this.getAccounts()
    }
    if (!walletStore.accounts.includes(addressToConnect)) {
      return
    }
    // Check if verified by Galleryst
    const gallerystVerified = await this.checkGallerystVerified(addressToConnect)
    if (gallerystVerified) {
      walletStore.setAddress(addressToConnect)
      walletStore.setVerified(true)
      return
    }
    // Not verified, process signing
    // use separate provider instance
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { data: params } = await axios.get('/api/verifySignature')
    const chainId = walletStore.defaultProvider.network.chainId
    params.domain.chainId = chainId
    const typedSignature = await provider.send('eth_signTypedData_v4', [
      addressToConnect,
      JSON.stringify(params),
    ])

    const { data } = await axios.post('/api/verifySignature', {
      chainId,
      addressToVerify: addressToConnect,
      typedSignature,
    })
    if (data.verified) {
      console.log(1)
      walletStore.setAddress(addressToConnect)
      console.log(2)
      walletStore.setVerified(true)
      console.log(3)
      walletStore.updateSigner()

      // Galleryst database verification
      const document = await firebase.findbyAddress('creatorParcel', addressToConnect )
      let databaseVerification = false
      if (document.exists) {
        const response: any = document.data()
        const { profile: { verified } } = response
        if(verified){
          databaseVerification = true
        }
      }
      console.log(4)
      walletStore.setDatabaseVerified(databaseVerification)
      console.log('vrrrrrrrriiiiify >>>> ' + databaseVerification)
      if(!databaseVerification){
        openModal(true)
      }
    }
  }

  disconnect = () => {
    walletStore.reset()
  }
}

export const walletService = new WalletService()
