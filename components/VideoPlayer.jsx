import { Player } from 'video-react'
import "node_modules/video-react/dist/video-react.css"

const Video = ({ poster_link, animate_link }) => {
  return <Player
    playsInline
    autoPlay
    poster={poster_link}
    src={animate_link}
  />
}

export default Video
