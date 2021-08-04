export const useViewportDimensions = () => {
  const isBrowser = typeof window !== 'undefined'
  const viewportHeight = isBrowser ? window.innerHeight : 0
  const viewportWidth = isBrowser ? window.innerWidth : 0
  return { viewportHeight, viewportWidth }
}
