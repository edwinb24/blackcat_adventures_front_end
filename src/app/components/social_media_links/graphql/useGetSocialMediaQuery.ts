import {gql, type TypedDocumentNode} from '@apollo/client'
import type {
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
