import { gallerystStore } from 'stores/galleryst.store'
import { walletStore } from 'stores/wallet.store'

class GallerystService {
  mint = async () => {
    if (!gallerystStore.isReady) return
    const uri = 'https://www.galleryst.co/image/ic_galleryst_logo.png'
    const response = await gallerystStore.nftContract.mint(uri)
    console.log('🚀 ~ response', response)
    return response
  }

  balance = async (): Promise<number> => {
    const balance = await gallerystStore.nftContract.balanceOf(walletStore.address)
    console.log(`balance: ${balance}`)
    return balance
  }

  allTokens = async () => {
    const balance = await this.balance()
    const tokens = await Promise.all(
      Array.from({ length: balance }).map(async (_, i) => {
        const tokenId = await gallerystStore.nftContract.tokenOfOwnerByIndex(walletStore.address, i)
        const tokenUri = await gallerystStore.nftContract.tokenURI(tokenId)
        return {
          owner: walletStore.address,
          tokenId: tokenId.toNumber(),
          tokenUri,
        }
      })
    )
    console.log(tokens)
    return tokens
  }
}

export const gallerystService = new GallerystService()
