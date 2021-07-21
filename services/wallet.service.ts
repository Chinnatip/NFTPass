import axios from 'axios'
import { ethers, utils } from 'ethers'
import { walletStore } from 'stores/wallet.store'

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

  connect = async (addressToConnect: string) => {
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
      walletStore.setAddress(addressToConnect)
      walletStore.setVerified(true)
      walletStore.updateSigner()
    }
  }

  disconnect = () => {
    walletStore.setProperties('', false, 0)
  }
}

export const walletService = new WalletService()
