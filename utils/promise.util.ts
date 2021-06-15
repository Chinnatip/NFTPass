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
