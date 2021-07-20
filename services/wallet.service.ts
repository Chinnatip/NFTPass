import axios from 'axios'
import dayjs from 'dayjs'
import { ethers, utils } from 'ethers'
import { walletStore } from 'stores/wallet.store'

class WalletService {
  private provider!: ethers.providers.Web3Provider

  constructor() {}

  init = () => {
    this.provider = walletStore.defaultProvider
    const address = sessionStorage.getItem('address')
    const expires = sessionStorage.getItem('expires')
    if (expires === null || address === null) return
    const expireDate = dayjs(expires)
    const now = dayjs()
    if (expireDate.isBefore(now)) return
    walletStore.setAddress(address)
    walletStore.setVerified(true)
    walletStore.updateSigner()
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
    // TODO: read sessionStorage before connect ???
    // if (typeof window !== 'undefined') {
    //   window.sessionStorage.set('item', 'itemValue')
    //   console.log('this is store service >>')
    // }
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
    params.domain.chainId = networkStore.chainId
    const typedSignature = await provider.send('eth_signTypedData_v4', [
      addressToConnect,
      JSON.stringify(params),
    ])
    const { data } = await axios.post('/api/verifySignature', {
      chainId: networkStore.chainId,
      addressToVerify: addressToConnect,
      typedSignature,
    })
    if (data.verified) {
      walletStore.setAddress(addressToConnect)
      walletStore.setVerified(true)
      walletStore.updateSigner()
      sessionStorage.setItem('address', addressToConnect)
      sessionStorage.setItem('expires', dayjs().add(1, 'day').toISOString())
    }
  }

  disconnect = () => {
    walletStore.setProperties('', false, 0)
  }
}

export const walletService = new WalletService()
