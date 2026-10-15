/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetSocialMediaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSocialMediaQuery = { socialMediaLinks: { __typename: 'RootQueryToSocialMediaLinkConnection', nodes: Array<{ __typename: 'SocialMediaLink', socialMedia: { __typename: 'SocialMedia', socialMediaPlatform: string, socialMediaLink: string } | null }> } | null };
