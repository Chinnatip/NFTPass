import React from 'react'
// import Router from 'next/router';
import { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import 'styles/index.css'
import 'styles/video-react.css'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
// import { GTMPageView } from '../components/strategy/gtm';

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  // Initiate GTM
//   useEffect(() => {
//     const handleRouteChange = (url: string) => GTMPageView(url);
//     Router.events.on('routeChangeComplete', handleRouteChange);
//     return () => {
//         Router.events.off('routeChangeComplete', handleRouteChange);
//     };
// }, []);

  return <Component {...pageProps} />
}
export default MyApp
