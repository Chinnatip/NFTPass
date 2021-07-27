import { useEffect, useState } from 'react'
import { walletService } from 'services/wallet.service'
import { walletStore } from 'stores/wallet.store'

export const useSetup = () => {
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return // ignore on server-side
    let pollingId: NodeJS.Timeout

    const setup = async () => {
      walletStore.init()
      walletService.init()

      // pollingId = setInterval(() => {
      //   walletService.updateBalance()
      // }, 1000)
      setReady(true)
    }

    setup()

    return () => {
      if (pollingId) {
        clearInterval(pollingId)
      }
    }
  }, [])

  return { isReady }
}
