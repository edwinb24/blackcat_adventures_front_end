import {gql, TypedDocumentNode, useQuery} from '@apollo/client'

import {
    GetSingleModuleQuery,
    GetSingleModuleQueryVariables,
} from './useGetSingleModuleContentQuery.generated'

const getSingleModule: TypedDocumentNode<
    GetSingleModuleQuery,
    GetSingleModuleQueryVariables
> = gql`
    query getSingleModule($name: String!) {
        modules(where: {title: $name}) {
            nodes {
                title
                modules {
                    description
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

export const useGetSingleModuleQuery = (name: string) =>
    useQuery(getSingleModule, {
        variables: {name},
    })
