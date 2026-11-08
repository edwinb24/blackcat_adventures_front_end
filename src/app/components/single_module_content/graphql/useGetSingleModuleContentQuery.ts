import {gql, TypedDocumentNode} from '@apollo/client'

import {
    GetSingleModuleQuery,
    GetSingleModuleQueryVariables,
} from './useGetSingleModuleContentQuery.generated'

export const getSingleModule: TypedDocumentNode<
    GetSingleModuleQuery,
    GetSingleModuleQueryVariables
> = gql`
    query getSingleModule($slug: ID!) {
        module(id: $slug, idType: SLUG) {
            title
            id
            moduleFields {
                description
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
`
