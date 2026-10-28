import {gql, TypedDocumentNode} from '@apollo/client'

import {
    GetDmingServicesContentQuery,
    GetDmingServicesContentQueryVariables,
} from './useGetDmingServicesContentQuery.generated'

export const getDmingServicesContent: TypedDocumentNode<
    GetDmingServicesContentQuery,
    GetDmingServicesContentQueryVariables
> = gql`
    query getDmingServicesContent($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
    }
`
