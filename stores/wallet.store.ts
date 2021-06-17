import axios from 'axios'
import { ethers, utils } from 'ethers'
import { makeAutoObservable } from 'mobx'

class WalletStore {
  readonly provider!: ethers.providers.Web3Provider
  constructor() {
    makeAutoObservable(this)
    if (typeof window !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
    }
  }

  address: string = ''
  verified: boolean = false
  balance: number = 0

  get readableBalance() {
    return `${this.balance.toFixed(2)} ETH`
  }

  // ! => Direct setting should be avoided
  // setAddress = (address: string) => {
  //   this.address = address
  // }

  // setVerify = (verified: boolean) => {
  //   this.verified = verified
  // }

  checkVerify = async () => {
    // TODO: add GET verify status from BE
    // await axios.get('/verified', {})
  }

  connect = async () => {
    const accounts = await this.provider.send('eth_requestAccounts', [])
    const addressToVerify = accounts[0]
    const { data: params } = await axios.get('/api/verifySignature')
    const typedSignature = await this.provider.send('eth_signTypedData_v4', [
      addressToVerify,
      JSON.stringify(params),
    ])
    const { data } = await axios.post('/api/verifySignature', {
      addressToVerify,
      typedSignature,
    })
    if (data?.verified) {
      this.verified = true
      this.address = addressToVerify
      await this.getBalance()
    }
  }

  getBalance = async () => {
    if (!this.address) return
    const balance = await this.provider.getBalance(this.address)
    this.balance = +utils.formatEther(balance)
  }
}

export const walletStore = new WalletStore()
