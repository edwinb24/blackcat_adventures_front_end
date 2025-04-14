import {SERVER_URL} from '@/app/utils/constants'
import {HttpLink} from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs'

export const {getClient, query, PreloadQuery} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: SERVER_URL,
      fetchOptions: {},
    }),
  })
})
