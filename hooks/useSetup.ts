import { useEffect, useState } from "react"
import { walletService } from "services/wallet.service"

export const useSetup = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let pollingId: NodeJS.Timeout

    const setup = async () => {
      pollingId = setInterval(() => {
        walletService.updateBalance()
      }, 1000)
      setReady(true)
    }

    setup()

    return () => {
      if (pollingId) {
        clearInterval(pollingId)
      }
    }
  }, [])

  return ready
}