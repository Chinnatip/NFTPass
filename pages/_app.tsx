import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import 'styles/index.css'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import * as ga from '../lib/ga'
import { useSetup } from 'hooks/useSetup'
import TagManager from 'react-gtm-module';

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  const Router = useRouter()
  useSetup()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes then log those page views
    Router.events.on('routeChangeComplete', handleRouteChange)

    // GTM
    TagManager.initialize({ gtmId: 'GTM-T47PMCH' });

    // If the component is unmounted, unsubscribe from the event with the `off` method
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [Router.events])

  return <Component {...pageProps} />
}
export default MyApp
