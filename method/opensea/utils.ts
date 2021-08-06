// import { OpenseaItem } from './interface'
import snakecaseKeys from 'snakecase-keys'

export const extractDataFromEdges = (edges: any[]): any[] => {
  return edges.map(edge => {
    return snakecaseKeys(edge.node.asset, { exclude: ['__typename'] })
  })
}
