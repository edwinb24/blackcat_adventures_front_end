import {gql, TypedDocumentNode, useQuery} from '@apollo/client'

import {
    GetAboutUsContentQuery,
    GetAboutUsContentQueryVariables,
} from './useGetAboutUsContentQuery.generated'

const getAboutUsContent: TypedDocumentNode<
    GetAboutUsContentQuery,
    GetAboutUsContentQueryVariables
> = gql`
    query getAboutUsContent($id: ID!) {
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

export const useGetAboutUsContentQuery = (id: string) =>
    useQuery(getAboutUsContent, {
        variables: {id},
    })
