import { RARIBLE_IMG_PREFIX } from './static'

export const raribleImg = (pic: string | undefined ) => {
  const parsePic = pic?.split('/ipfs/')
  if(parsePic != undefined){
    if(parsePic.length > 1){
      return `${RARIBLE_IMG_PREFIX}${parsePic[1]}&w=240`
    }else{
      return `${RARIBLE_IMG_PREFIX}${parsePic[0]}&w=240`
    }
  }else{
    return ''
  }
}

export const raribleCover = (pic: string | undefined ) => {
  const parsePic = pic?.split('/ipfs/')
  if(parsePic != undefined){
    if(parsePic.length > 1){
      return `${RARIBLE_IMG_PREFIX}${parsePic[1]}`
    }else{
      return `${RARIBLE_IMG_PREFIX}${parsePic[0]}`
    }
  }else{
    return ''
  }
}
