import {gql, type TypedDocumentNode} from '@apollo/client'
import type {
    GetPostListQuery,
    GetPostListQueryVariables,
} from './useGetPostListQuery.generated'

export const getPostList: TypedDocumentNode<
    GetPostListQuery,
    GetPostListQueryVariables
> = gql`
    query getPostList {
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
