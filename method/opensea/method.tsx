import { RARIBLE_IMG_PREFIX } from './static'

export const raribleImg = (pic: string | undefined ) => {
  const parsePic = pic?.split('/ipfs/')
  if(parsePic != undefined){
    return `${RARIBLE_IMG_PREFIX}${parsePic[1]}&w=240`
  }else{
    return ''
  }
}
