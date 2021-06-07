import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import 'styles/index.css'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import * as ga from '../lib/ga'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

config.autoAddCss = false

const foundationApolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GQL_FND,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  const Router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes then log those page views
    Router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe from the event with the `off` method
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [Router.events])

  return (
    <ApolloProvider client={foundationApolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
