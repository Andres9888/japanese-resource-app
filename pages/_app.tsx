import { ApolloProvider } from '@apollo/react-hooks'

import { useApollo } from '~lib/apolloClient'
import '~styles/main.scss'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}


