import {gql, TypedDocumentNode, useQuery} from '@apollo/client'

import {
    GetPostContentQuery,
    GetPostContentQueryVariables,
} from './useGetPostContentQuery.generated'

const getPostContent: TypedDocumentNode<
    GetPostContentQuery,
    GetPostContentQueryVariables
> = gql`
    query getPostContent($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
        }
        modules {
            nodes {
                id
                title
                link
                moduleFields {
                    moduleStatus
                }
            }
        }
    }
`

export const useGetPostContentQuery = (id: string) =>
    useQuery(getPostContent, {
        variables: {id},
    })
