import {gql, type TypedDocumentNode} from '@apollo/client'
import type {
    GetAllModulesContentQuery,
    GetAllModulesContentQueryVariables,
} from './useGetAllModulesContentQuery.generated'

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
                            altText
                        }
                    }
                }
            }
        }
    }
`
