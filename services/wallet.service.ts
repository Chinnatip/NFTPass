import axios from 'axios'
import { ethers, utils } from 'ethers'
import { walletStore } from 'stores/wallet.store'
import QRCodeModal from '@walletconnect/qrcode-modal'
import WalletConnect from '@walletconnect/client'
import { WalletProviderName } from 'static/Enum'
import * as firebase from "../method/firebase"

class WalletService {
  private walletProviderName: WalletProviderName = walletStore.isMetaMaskAvailable
    ? WalletProviderName.MetaMask
    : WalletProviderName.WalletConnect
  private provider!: ethers.providers.Web3Provider
  private wcConnector!: WalletConnect

  constructor() {}

  init = () => {
    if (walletStore.isMetaMaskAvailable) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    }
    this.wcConnector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    })
  }

  resetListeners = () => {
    switch (this.walletProviderName) {
      case WalletProviderName.MetaMask: {
        this.provider.removeAllListeners()
        this.provider.on('network', this.onNetworkChanged)
        this.provider.on(walletStore.address, this.onBalanceChange)
        this.provider
          .getBalance(walletStore.address)
          .then(this.onBalanceChange)
          .catch(console.error)
        break
      }
      case WalletProviderName.WalletConnect: {
        this.wcConnector.on('session_update', (_err, _payload) => {})
        break
      }
    }
  }

  private onNetworkChanged = (_newNetwork: any, oldNetwork: any) => {
    if (!!oldNetwork && typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  private onBalanceChange = (balance: ethers.BigNumber) => {
    walletStore.setBalance(+utils.formatEther(balance))
  }

  checkGallerystVerified = async (address: string): Promise<boolean> => {
    // TODO: add GET verify status from BE
    // await axios.get('/...')
    const verified = Number.isInteger(address) // always false
    return verified
  }

  getAccounts = async (): Promise<string> => {
    switch (this.walletProviderName) {
      case WalletProviderName.MetaMask: {
        const accounts = await this.provider.send('eth_requestAccounts', [])
        return accounts[0]
      }
      case WalletProviderName.WalletConnect: {
        if (!this.wcConnector.connected) {
          await this.wcConnector.createSession()
          const address: string = await new Promise((resolve, reject) => {
            this.wcConnector.on('connect', (err, payload) => {
              if (err) reject(err)
              resolve(payload.params[0].accounts[0])
            })
          })
          return address
        } else {
          return this.wcConnector.accounts[0]
        }
      }
      default: {
        throw new Error('Invalid wallet provider')
      }
    }
  }

  signTypedData = async (address: string): Promise<{ chainId: number; typedSignature: string }> => {
    const { data: params } = await axios.get('/api/verifySignature')
    switch (this.walletProviderName) {
      case WalletProviderName.MetaMask: {
        const chainId = this.provider.network.chainId
        params.domain.chainId = chainId
        const typedSignature = await this.provider.send('eth_signTypedData_v4', [
          address,
          JSON.stringify(params),
        ])
        return { chainId, typedSignature }
      }
      case WalletProviderName.WalletConnect: {
        const chainId = this.wcConnector.chainId
        params.domain.chainId = this.wcConnector.chainId
        const typedSignature = await this.wcConnector.signTypedData([
          address,
          JSON.stringify(params),
        ])
        return { chainId, typedSignature }
      }
      default: {
        throw new Error('Invalid wallet provider')
      }
    }
  }

  connect = async (walletProviderName: WalletProviderName) => {
    this.walletProviderName = walletProviderName
    const saveToStorage = walletProviderName === WalletProviderName.MetaMask
    walletStore.setLoading(true, 'Waiting: Confirm connect')
    const addressToVerify = await this.getAccounts()
    const gallerystVerified = await this.checkGallerystVerified(addressToVerify)
    if (gallerystVerified) {
      walletStore.setAddress(addressToVerify, saveToStorage)
      walletStore.setVerified(true)
      walletStore.setLoading(false, '')
      return
    }
    walletStore.setLoading(true, 'Waiting: Signature request')
    const { chainId, typedSignature } = await this.signTypedData(addressToVerify)
    walletStore.setLoading(true, 'Waiting: Verify signature')
    const { data } = await axios.post('/api/verifySignature', {
      chainId,
      addressToVerify,
      typedSignature,
    })
    if (data.verified) {
      walletStore.setAddress(addressToVerify, saveToStorage) // only save MetaMask, for now
      walletStore.setLoading(false, '')
      walletStore.setVerified(true)
      this.resetListeners()

      // Galleryst database verification
      const document = await firebase.findbyAddress('creatorParcel', addressToVerify )
      let databaseVerification = false
      if (document.exists) {
        const response: any = document.data()
        const { profile: { verified } } = response
        if(verified){
          databaseVerification = true
        }
      }
      walletStore.setDatabaseVerified(databaseVerification)
      // console.log('vrrrrrrrriiiiify >>>> ' + databaseVerification)
      if(!databaseVerification){
        // openModal(true)
      }
    }
  }

  disconnect = async () => {
    switch(this.walletProviderName) {
      case WalletProviderName.MetaMask: {
        this.provider.removeAllListeners()
        break
      }
      case WalletProviderName.WalletConnect: {
        if (this.wcConnector.connected) {
          await this.wcConnector.killSession()
        }
      }
    }
    walletStore.reset()
  }
}

export const walletService = new WalletService()
