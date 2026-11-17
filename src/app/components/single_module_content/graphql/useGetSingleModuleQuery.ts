import {gql, type TypedDocumentNode} from '@apollo/client'

import type {
    GetSingleModuleQuery,
    GetSingleModuleQueryVariables,
} from './useGetSingleModuleQuery.generated'

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
