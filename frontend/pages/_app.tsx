import withApollo from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { getDataFromTree } from '@apollo/react-ssr'
import getConfig from 'next/config'

import './global.css'

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Component {...pageProps} />
  </ApolloProvider>
)

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: getConfig().publicRuntimeConfig.BACKEND_URI + '/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
    })
  },
  { getDataFromTree }
)(App)
