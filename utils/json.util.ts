export const removeNullish = (data: any): any => {
  const replacer = (_: string, val: any) => val === null ? undefined : val
  return JSON.parse(JSON.stringify(data, replacer))
}