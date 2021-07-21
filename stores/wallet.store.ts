import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { makeAutoObservable } from 'mobx'

type JsonRpcSigner = ethers.providers.JsonRpcSigner

class WalletStore {
  constructor() {
    makeAutoObservable(this)
  }

  address: string = ''
  accounts: string[] = []
  balance: number = 0
  verified: boolean = false
  defaultProvider!: ethers.providers.Web3Provider
  signer!: JsonRpcSigner
  isMetaMaskInstalled: boolean = false

  get isConnected() {
    return !!this.address
  }

  get readableBalance() {
    return `${this.balance.toFixed(3)} ETH`
  }

  init = () => {
    this.defaultProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    this.defaultProvider.on('network', this.onNetworkChanged)
    this.signer = this.defaultProvider.getSigner()
    this.isMetaMaskInstalled = true
    this.readStorage()
  }

  private onNetworkChanged = (_newNetwork: any, oldNetwork: any) => {
    if (!!oldNetwork && typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  setAccounts = (accounts: string[]) => {
    this.accounts = accounts
  }

  setAddress = (address: string) => {
    this.address = address
    this.writeStorage()
  }

  setVerified = (verified: boolean) => {
    this.verified = verified
  }

  setBalance = (balance: number) => {
    this.balance = balance
  }

  setProperties = (address: string, verified: boolean, balance: number) => {
    this.address = address
    this.verified = verified
    this.balance = balance
  }

  updateSigner = () => {
    this.signer = this.defaultProvider.getSigner()
  }

  // use 'read/write' instead of 'get/set' to prevent ambiguity
  //    between properties getters/setters and localStorage interaction
  private writeStorage = () => {
    localStorage.setItem('address', this.address)
    localStorage.setItem('expires', dayjs().add(1, 'day').toISOString())
  }

  private readStorage = () => {
    const address = localStorage.getItem('address')
    const expires = localStorage.getItem('expires')
    if (expires === null || address === null || dayjs().isAfter(dayjs(expires))) {
      localStorage.removeItem('address')
      localStorage.removeItem('expires')
    } else {
      this.address = address
      this.verified = true
      this.updateSigner()
    }
  }
}

export const walletStore = new WalletStore()
