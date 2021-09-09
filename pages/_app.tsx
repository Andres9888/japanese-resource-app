//@ts-nocheck
import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '~lib/apolloClient'
import '~styles/main.scss'
import { Viewer } from '~@types/globalTypes'

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

export default function App({ Component, pageProps }) {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} viewer={viewer} setViewer={setViewer} />
    </ApolloProvider>
  )
}
