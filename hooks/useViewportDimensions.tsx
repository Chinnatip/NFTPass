import { useEffect, useState } from 'react'

export const useViewportDimensions = () => {
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }
  }, [typeof window])
  return { viewportHeight, viewportWidth }
}
