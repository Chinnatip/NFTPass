import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'
import UAParser from 'ua-parser-js'

class WalletStore {
  constructor() {
    makeAutoObservable(this)
    const uaParser = new UAParser()
    const os = uaParser.getOS()
    this.isMobileBrowser = os.name !== undefined && ['iOS', 'Android'].includes(os.name)
  }

  loading = false;
  stage = ''
  address: string = ''
  balance: number = 0
  verified: boolean = false
  dbVerified: boolean = false
  isMobileBrowser!: boolean
  isMetaMaskAvailable: boolean = typeof window !== 'undefined' && window.ethereum !== undefined

  get isConnected() {
    return !!this.address
  }

  get readableBalance() {
    return `${this.balance.toFixed(3)} ETH`
  }

  init = () => {
    if (this.isMetaMaskAvailable) {
      this.readStorage()
    }
  }

  setAddress = (address: string, saveToStorage = false) => {
    this.address = address
    if (saveToStorage) this.writeStorage()
  }

  setVerified = (verified: boolean) => {
    this.verified = verified
  }

  setDatabaseVerified = (dbVerified: boolean) => {
    this.dbVerified = dbVerified
    this.writeStorage()
  }

  setBalance = (balance: number) => {
    this.balance = balance
  }

  setProperties = (address: string, verified: boolean, balance: number) => {
    this.address = address
    this.verified = verified
    this.balance = balance
  }

  reset = () => {
    this.address = ''
    this.balance = 0
    this.verified = false
    this.clearStorage()
  }

  // use 'read/write' instead of 'get/set' to prevent ambiguity
  //    between properties getters/setters and localStorage interaction
  private writeStorage = () => {
    localStorage.setItem('address', this.address)
    localStorage.setItem('dbVerified', this.dbVerified ? 'true' : 'false')
    localStorage.setItem('expires', dayjs().add(1, 'day').toISOString())
  }

  private readStorage = () => {
    const address = localStorage.getItem('address')
    const expires = localStorage.getItem('expires')
    const dbVerified = localStorage.getItem('dbVerified')
    if (expires === null || address === null || dayjs().isAfter(dayjs(expires))) {
      this.clearStorage()
    } else {
      this.address = address
      this.dbVerified = dbVerified == 'true' ? true : false
      this.verified = true
    }
  }

  private clearStorage = () => {
    localStorage.removeItem('address')
    localStorage.removeItem('expires')
  }

  setLoading = (loading: boolean, stage: string) => {
    this.loading = loading
    this.stage = stage
  }
}

export const walletStore = new WalletStore()
