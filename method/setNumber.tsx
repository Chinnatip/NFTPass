export const prepNum = (val: number) => {
  if (val > 999999){
    return `${ Math.floor(val/1000000) }M`
  }else if (val > 999){
    return `${ Math.floor(val/1000) }K`
  }else{
    return val
  }
}
