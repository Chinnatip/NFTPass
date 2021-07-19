export const isValidHttpUrl = (url: string, secure = false): boolean => {
  const protocols = secure ? ['https:'] : ['http:', 'https:']
  try {
    return protocols.includes(new URL(url).protocol);
  } catch (_) {
    return false;  
  }
}