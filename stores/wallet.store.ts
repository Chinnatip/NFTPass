import { makeAutoObservable } from 'mobx'

class WalletStore {
  constructor() {
    makeAutoObservable(this)
  }

  accounts: string[] = []
  address: string = ''
  verified: boolean = false
  balance: number = 0

  get isConnected() {
    return !!this.address
  }
  
  get readableBalance() {
    return `${this.balance.toFixed(2)} ETH`
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
}

export const walletStore = new WalletStore()
