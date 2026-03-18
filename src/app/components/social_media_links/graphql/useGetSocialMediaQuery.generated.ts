import * as Types from '../../../../types/__generated__/graphql';

export type GetSocialMediaQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSocialMediaQuery = { socialMediaLinks: { __typename: 'RootQueryToSocialMediaLinkConnection', nodes: Array<{ __typename: 'SocialMediaLink', socialMedia: { __typename: 'SocialMedia', socialMediaPlatform: string, socialMediaLink: string } | null }> } | null };
