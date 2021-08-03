import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useSWR from 'swr'
import axios from 'axios'

type Props = {
  name: string
  pic: string
  renderOptions: {
    width: number
    height: number
    cols: number
    scrolling: boolean
  }
}

type Queries = {
  width: string
  height: string
  cols: string
  scrolling: string
}

export const getServerSideProps: GetServerSideProps<Props, { username: string }> =
  async context => {
    const queries: Queries = context.query as Queries
    const width = +queries.width || 500
    const height = +queries.height || 500
    const cols = +queries.cols || 0 // 0 should be treated as 'auto' when render
    const scrolling = queries.scrolling === 'true'
    const props: Props = {
      name: context.params?.username ?? '',
      pic: '',
      renderOptions: {
        width,
        height,
        cols,
        scrolling,
      },
    }
    return { props }
  }

const fetcher = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url)
    return data.name
  } catch {
    return 'fallback_data_string'
  }
}

export const EmbedIframe = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { renderOptions } = props
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users/1', fetcher)
  const isLoading = !data
  const isError = !!error
  const graySrc =
    'https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png'

  const gridColsClass =
    renderOptions.cols === 0
      ? '' // responsive
      : `grid-cols-${renderOptions.cols}`

  if (isError) {
    return <h1 className="text-6xl">Error occur!!</h1>
  }
  if (isLoading) {
    return (
      <>
        <p>Loading</p>
        {/* prettier-ignore */}
        <svg className="animate-spin mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </>
    )
  }
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: renderOptions.width,
        height: renderOptions.height,
        background: 'url("/image/bg_blur.jpg")',
      }}
    >
      {/* <h2 className="text-sm bg-gray-200 rounded-full inline-block mb-2 px-3 py-1 shadow-nft text-gray-600 md:mx-4 w-20"></h2> */}
      {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-3 md:gap-4 md:p-4 p-0 gap-1 w-full"> */}
      <div className={`grid ${gridColsClass} md:gap-4 md:p-4 p-0 gap-3 w-full`}>
        {Array.from({ length: 15 }).map(() => {
          const imagePreview = graySrc
          const alternateUrl = ''
          // @ts-ignore
          const onImgError = event => {
            event.target.onerror = null
            event.target.src = alternateUrl
          }
          return (
            imagePreview != undefined && (
              <a
                target="_blank"
                href={``}
                className="relative cursor-pointer bg-white rounded-16 mb-0 active-shadow"
                key={``}
              >
                <div className="animate-pulse opacity-75 thumbnail-wrapper w-full relative">
                  <img
                    className="rounded-16 md:border-8 border-4 border-white thumbnail-height"
                    src={imagePreview}
                    onError={onImgError}
                  />
                </div>
              </a>
            )
          )
        })}
      </div>
      <br />
    </div>
  )
}

export default EmbedIframe
