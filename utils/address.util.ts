export const mask = (address: string) => {
  return address.length === 42
    ? `${address.slice(0,6)}...${address.slice(-4)}`
    : address
}