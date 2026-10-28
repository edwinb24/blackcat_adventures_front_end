import {gql, TypedDocumentNode} from '@apollo/client'

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
    }
`
