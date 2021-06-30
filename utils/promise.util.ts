/**
 * @description wrap promise (async call), returns both data and error
 * @example
 * const [data, error] = await withError(someAsyncFunction())
 * if (error) {
 *   // handle error
 * } else {
 *   // use data if not error
 * }
 */
export const withError = async <T extends {}>(
  promise: Promise<T>
): Promise<[T, Error | null]> => {
  try {
    const data = await promise
    return [data, null]
  } catch (err) {
    return [null!, err]
  }
}

/**
 * @description simulate sleep behavior
 * @param ms 
 * @example
 * await sleep(3000) // 3 seconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
