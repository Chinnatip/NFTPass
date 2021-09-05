import { useEffect, useRef, useState } from 'react'
import QueryString from 'querystring'
import { useClipboard } from 'use-clipboard-copy'
import ReactDOMServer from 'react-dom/server'
import { createPopper } from '@popperjs/core'
import { useRouter } from 'next/router'
import { useViewportDimensions } from 'hooks/useViewportDimensions'
import { ConnectBtn } from '@/Galleryst'

const Page = () => {
  const clipboard = useClipboard()
  const router = useRouter()
  const { viewportWidth, viewportHeight } = useViewportDimensions()

  const [hovering, setHovering] = useState(false)
  const [copied, setCopied] = useState(false)
  const btnRef = useRef(null)
  const popperRef = useRef(null)
  createPopper(btnRef.current!, popperRef.current!, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  const [iWidth, setIWidth] = useState(0)
  const [iHeight, setIHeight] = useState(0)
  const [cols, setCols] = useState(4)
  const [scrolling, setScrolling] = useState(true)
  const [showAvatar, setShowAvatar] = useState(true)
  const [showUsername, setShowUsername] = useState(true)
  const [showAddress, setShowAddress] = useState(true)

  useEffect(() => {
    setIWidth(viewportWidth / 2)
    setIHeight(viewportHeight / 2)
  }, [viewportWidth, viewportHeight])

  const checkboxes = [
    { label: 'Vertical Scroll', checked: scrolling, onChange: setScrolling },
    { label: 'Show avatar', checked: showAvatar, onChange: setShowAvatar },
    { label: 'Show username', checked: showUsername, onChange: setShowUsername },
    { label: 'Show address', checked: showAddress, onChange: setShowAddress },
  ]
  const address = router.query.address
  const renderOptions = {
    width: iWidth,
    height: iHeight,
    cols,
    scrolling,
  }
  const params = QueryString.stringify(renderOptions, '&')
  const iframePath = `/embed/${address}?${params}`
  const result =
    typeof window !== 'undefined'
      ? ReactDOMServer.renderToStaticMarkup(
        <iframe
          src={window.location.origin + iframePath}
          width={iWidth}
          height={iHeight}
          scrolling={scrolling ? 'yes' : 'no'}
        />
      )
      : ''
  return (
    <div className="min-h-screen w-screen p-5" style={{ background: 'url("/image/bg_blur.jpg")' }}>
      <div className="md:w-4/5 w-full m-auto flex justify-between items-center">
        <a className="focus:outline-none" href={`/`}>
          <img className="md:h-8 h-6 ml-2" src="/image/ic_galleryst_logo.png" alt="" />
        </a>
        <ConnectBtn />
      </div>

      <div
        id="showcase-pg-canvas"
        className="md:w-4/5 z-10 relative bg-white m-auto p-5 w-full flex flex-col items-center justify-center rounded-24 border border-white shadow-nft mt-20 mb-20 pb-10"
      >
        <h3 className="text-3xl mb-4">Showcase iframe playground</h3>
        <label className="text-m mb-4">Double Click to Copy Code</label>
        <button
          className="md:w-3/5 w-full m-auto mb-4"
          ref={btnRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => {
            clipboard.copy(result)
            setCopied(true)
            setTimeout(() => setCopied(false), 3000)
          }}
        >
          <div style={{ color: '#C9D1D9', backgroundColor: '#0D1117' }} className="p-4 rounded-16 w-full">
            <p className="font-mono text-xs break-words text-left">{result}</p>
          </div>
        </button>
        <div
          ref={popperRef}
          className={`p-2 bg-green-500 mb-4 rounded-16 relative ${hovering ? 'block' : 'hidden'}`}
        >
          <div
            className="w-2 h-2 bg-green-500 absolute transform rotate-45"
            style={{ left: '-4px', top: 'calc(50% - 2.828px)' }}
          ></div>
          {copied ? 'Copied' : 'Copy'}
        </div>
        <iframe
          src={iframePath}
          width={iWidth}
          height={iHeight}
          scrolling={scrolling ? 'yes' : 'no'}
          className="border border-black"
        ></iframe>
        <div className="flex items-center hidden">
          <div className="flex items-center mr-8">
            <label htmlFor="iframe-pg-cols" className="mr-8">
              # of columns
            </label>
            <input
              name="iframe-pg-cols"
              type="number"
              value={cols}
              min={1}
              max={4}
              onChange={e => {
                setCols(+e.target.value)
              }}
              className="appearance-none block w-16 h-10 bg-white text-gray-700 border border-pink-300 rounded p-3 leading-tight"
            />
          </div>
        </div>
        <div className="flex items-center flex-col my-4 hidden">
          {checkboxes.map(props => (
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                checked={props.checked}
                onChange={e => {
                  props.onChange(e.target.checked)
                }}
                className="h-6 w-6 mr-2"
              />
              <span>{props.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center flex-col my-4">
          <div className="flex items-center mr-4 flex-col">
            <label htmlFor="iframe-pg-width" className="mr-5">
              iframe width
            </label>
            <input
              type="range"
              className="w-64 mr-8"
              name="iframe-pg-width"
              value={iWidth}
              min={200}
              max={viewportWidth}
              onChange={e => {
                setIWidth(+e.target.value)
              }}
            />
            <input
              type="number"
              value={iWidth}
              onChange={e => {
                setIWidth(+e.target.value)
              }}
              className="appearance-none block w-20 h-10 bg-white text-gray-700 border border-pink-300 rounded p-3 leading-tight"
            />
          </div>
          <div className="flex items-center flex-col px-2 hidden">
            <label htmlFor="iframe-pg-height" className="mr-6">
              iframe height
            </label>
            <input
              type="range"
              className="w-64 mr-5"
              name="iframe-pg-height"
              value={iHeight}
              min={200}
              max={viewportHeight}
              onChange={e => {
                setIHeight(+e.target.value)
              }}
            />
            <input
              type="number"
              value={iHeight}
              onChange={e => {
                setIHeight(+e.target.value)
              }}
              className="appearance-none block w-20 h-10 bg-white text-gray-700 border border-pink-300 rounded p-3 leading-tight"
            />
          </div>
        </div>

      </div>
      {/* Params config */}

    </div>
  )
}

export default Page

