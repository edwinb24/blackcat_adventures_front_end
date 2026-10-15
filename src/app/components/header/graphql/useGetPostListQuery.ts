import {gql, TypedDocumentNode, useQuery} from '@apollo/client'
import {
    GetPostListQuery,
    GetPostListQueryVariables,
} from './useGetPostListQuery.generated'

export const getPostList: TypedDocumentNode<
    GetPostListQuery,
    GetPostListQueryVariables
> = gql`
    query GetPostList {
        posts {
            nodes {
                postFields {
                    addToMainMenu
                }
                id
                title
                link
            }
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

export const useGetPostListQuery = () => useQuery(getPostList)
