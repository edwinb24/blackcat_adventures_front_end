'use client'
import {SERVER_URL} from '@/app/utils/constants'
// ^ this file needs the "use client" pragma

import {HttpLink} from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'

function makeClient() {
  const httpLink = new HttpLink({
    uri: SERVER_URL,
    fetchOptions: {},
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function ApolloWrapper({children}: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
