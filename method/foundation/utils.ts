export const getFoundationAssetUrl = (
  assetIPFSPath: string,
  preview = false
) => {
  if (!assetIPFSPath) return ''
  const baseUrl = 'https://assets.foundation.app'
  const [IPFS, path] = assetIPFSPath.split('/')
  const prefix1 = IPFS.slice(-4, -2)
  const prefix2 = IPFS.slice(-2)
  const filename = preview ? path.replace('nft', 'nft_preview') : path
  return `${baseUrl}/${prefix1}/${prefix2}/${IPFS}/${filename}`
}