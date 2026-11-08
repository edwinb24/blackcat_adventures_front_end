import {gql, TypedDocumentNode} from '@apollo/client'

import {
    GetPageContentQuery,
    GetPageContentQueryVariables,
} from './useGetPageContentQuery.generated'

export const getPageContent: TypedDocumentNode<
    GetPageContentQuery,
    GetPageContentQueryVariables
> = gql`
    query getPageContent($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }
`
