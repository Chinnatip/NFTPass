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
    this.defaultProvider = new ethers.providers.Web3Provider(window.ethereum)
    this.signer = this.defaultProvider.getSigner()
    this.isMetaMaskInstalled = true
  }

  setAccounts = (accounts: string[]) => {
    this.accounts = accounts
  }

  setAddress = (address: string) => {
    this.address = address
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
}

export const walletStore = new WalletStore()
