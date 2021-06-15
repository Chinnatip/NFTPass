/**
 * @description wrap promise (async call), returns data and error
 * @example
 * const [data, error] = await withError(someAsyncFunction())
 * if (data) {
 *   // use data here...
 * } else {
 *   // use data here...
 * }
 * 
 */
export async function withError<T>(
  promise: Promise<T>
): Promise<[T, Error | null]> {
  try {
    const data = await promise
    return [data, null]
  } catch (err) {
    return [null!, err]
  }
}
