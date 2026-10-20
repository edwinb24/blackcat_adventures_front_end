import {gql, TypedDocumentNode, useQuery} from '@apollo/client'
import {
    GetAllModulesContentQuery,
    GetAllModulesContentQueryVariables,
} from './useGetAllModulesContent.generated'

export const getAllModulesContent: TypedDocumentNode<
    GetAllModulesContentQuery,
    GetAllModulesContentQueryVariables
> = gql`
    query getAllModulesContent($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
        }
        modules {
            nodes {
                id
                link
                title
                moduleFields {
                    shortDescription
                    linkToPurchase
                    moduleStatus
                    additionalImage {
                        node {
                            link
                        }
                    }
                }
            }
        }
    }
`

export const useGetAllModulesContentQuery = (id: string) =>
    useQuery(getAllModulesContent, {
        variables: {id},
    })
