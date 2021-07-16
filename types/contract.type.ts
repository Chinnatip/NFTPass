export interface ERC1155Metadata {
  name: string
  description?: string
  image: string
  decimals?: number
  properties?: object
}

export type OpenSeaPropertyAttribute = {
  trait_type: string
  value: string
}

export type OpenSeaLevelAttribute = {
  trait_type: string
  value: number
}

export type OpenSeaStatAttribute = {
  display_type: 'number'
  trait_type: string
  value: number
}

export type OpenSeaBoostAttribute = {
  display_type: 'boost_number' | 'boost_percentage'
  trait_type: string
  value: number
  max_value?: number
}

export type OpenSeaDateAttribute = {
  display_type: 'date'
  trait_type: string
  value: number // unix
}

export interface OpenSeaTokenMetadata extends ERC1155Metadata {
  external_url?: string
  attributes?: Array<
    | OpenSeaPropertyAttribute
    | OpenSeaLevelAttribute
    | OpenSeaStatAttribute
    | OpenSeaBoostAttribute
    | OpenSeaDateAttribute
  >
  animation_url?: string
  youtube_url?: string
  background_color?: string // hex string without #
}

export interface GallerystTokenMetadata extends OpenSeaTokenMetadata {
  media_list?: Array<{ type: string; src: string }>
}
