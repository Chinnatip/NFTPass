import { Contract } from 'ethers'
import { makeAutoObservable } from 'mobx'
import { walletStore } from './wallet.store'

const nftContractAddress = '0xaADe19345761E030Acc56bC683577184C259b41D'
const nftContractAbi: string[] = [
  'function getNextTokenId() public view returns (uint256)',
  'function mint(string memory tokenIPFSPath) public returns (uint256 tokenId)',
  'function creatorOf(uint256 tokenId) public view returns (address payable)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string)',
]

class GallerystStore {
  constructor() {
    makeAutoObservable(this)
    if (typeof window !== 'undefined' && !!walletStore.defaultProvider) {
      this.nftContract = new Contract(
        nftContractAddress,
        nftContractAbi,
        walletStore.defaultProvider
      )
    }
  }

  nftContract!: Contract
  isReady = false

  updateNftContract = () => {
    this.nftContract = this.nftContract.connect(walletStore.signer)
    this.isReady = true
  }
}

export const gallerystStore = new GallerystStore()
