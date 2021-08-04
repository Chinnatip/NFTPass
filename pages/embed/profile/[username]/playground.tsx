import { useRef, useState } from 'react'
import QueryString from 'querystring'
import { useClipboard } from 'use-clipboard-copy'
import ReactDOMServer from 'react-dom/server'
import { createPopper } from '@popperjs/core'
import { useRouter } from 'next/router'
import { useViewportDimensions } from 'hooks/useViewportDimensions'

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

  const [iWidth, setIWidth] = useState(viewportWidth * 0.5)
  const [iHeight, setIHeight] = useState(viewportHeight * 0.5)
  const [cols, setCols] = useState(4)
  const [scrolling, setScrolling] = useState(true)
  const [showAvatar, setShowAvatar] = useState(true)
  const [showUsername, setShowUsername] = useState(true)
  const [showAddress, setShowAddress] = useState(true)

  const checkboxes = [
    { label: 'Vertical Scroll', checked: scrolling, onChange: setScrolling },
    { label: 'Show avatar', checked: showAvatar, onChange: setShowAvatar },
    { label: 'Show username', checked: showUsername, onChange: setShowUsername },
    { label: 'Show address', checked: showAddress, onChange: setShowAddress },
  ]
  const username = router.query.username
  const renderOptions = {
    width: iWidth,
    height: iHeight,
    cols,
    scrolling,
  }
  const params = QueryString.stringify(renderOptions, '&')
  const iframePath = `/embed/profile/${username}?${params}`
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
      <h3 className="text-3xl">Showcase iframe playground</h3>
      <div
        id="showcase-pg-canvas"
        className="bg-white my-8 p-5 w-screen h-3/4 flex items-center justify-center"
        style={{ width: viewportWidth * 0.95, height: viewportHeight * 0.7 }}
      >
        <iframe
          src={iframePath}
          width={iWidth}
          height={iHeight}
          scrolling={scrolling ? 'yes' : 'no'}
          className="border border-black"
        ></iframe>
      </div>
      {/* Params config */}
      <div className="flex items-center">
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
      <div className="flex items-center my-4">
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
      <div className="flex items-center my-4">
        <div className="flex items-center mr-4">
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
        <div className="flex items-center px-2">
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
      <button
        className="w-1/4"
        ref={btnRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => {
          clipboard.copy(result)
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        }}
      >
        <div style={{ color: '#C9D1D9', backgroundColor: '#0D1117' }} className="p-4 rounded-2xl">
          <p className="font-mono text-xs break-words text-left">{result}</p>
        </div>
      </button>
      <div
        ref={popperRef}
        className={`p-2 bg-green-500 rounded-xl relative ${hovering ? 'block' : 'hidden'}`}
      >
        <div
          className="w-2 h-2 bg-green-500 absolute transform rotate-45"
          style={{ left: '-4px', top: 'calc(50% - 2.828px)' }}
        ></div>
        {copied ? 'Copied' : 'Copy'}
      </div>
    </div>
  )
}

export default Page
