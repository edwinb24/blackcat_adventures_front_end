import {gql, TypedDocumentNode, useQuery} from '@apollo/client'
import {
    GetSocialMediaQuery,
    GetSocialMediaQueryVariables,
} from './useGetSocialMediaQuery.generated'

export const getSocialMedia: TypedDocumentNode<
    GetSocialMediaQuery,
    GetSocialMediaQueryVariables
> = gql`
    query getSocialMedia {
        socialMediaLinks {
            nodes {
                socialMedia {
                    socialMediaPlatform
                    socialMediaLink
                }
            }
        }
    }
`

export const useGetSocialMediaQuery = () => useQuery(getSocialMedia)
