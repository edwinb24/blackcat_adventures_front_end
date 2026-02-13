import {gql, TypedDocumentNode, useQuery} from '@apollo/client'
import {
    GetPostListQuery,
    GetPostListQueryVariables,
} from './useGetPostListQuery.generated'

const getPostList: TypedDocumentNode<
    GetPostListQuery,
    GetPostListQueryVariables
> = gql`
    query GetPostList {
        posts {
            nodes {
                id
                title
                link
            }
        }
    }
`

export const useGetPostListQuery = () => useQuery(getPostList)
