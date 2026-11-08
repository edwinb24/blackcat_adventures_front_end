import {SERVER_URL} from '@/utils/constants'
import {
    type ApolloClient as BaseApolloClient,
    HttpLink,
    type OperationVariables,
    type TypedDocumentNode,
} from '@apollo/client'
import {
    ApolloClient,
    InMemoryCache,
    registerApolloClient,
} from '@apollo/client-integration-nextjs'

export const {getClient} = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: SERVER_URL,
        }),
        devtools: {
            enabled: process.env.NODE_ENV === 'development',
        },
    })
})

export const queryCms = async <
    TData,
    TVariables extends OperationVariables = OperationVariables,
>(
    query: TypedDocumentNode<TData, TVariables>,
    variables?: TVariables,
): Promise<TData> => {
    const {data, error} = await getClient().query({
        query,
        variables,
    } as BaseApolloClient.QueryOptions<TData, TVariables>)
    if (error) throw error
    if (!data) throw new Error('The CMS query returned no data.')
    return data as TData
}
