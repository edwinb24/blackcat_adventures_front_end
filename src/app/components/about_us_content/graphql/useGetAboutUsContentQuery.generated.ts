import * as Types from '../../../../types/__generated__/graphql';

export type GetAboutUsContentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetAboutUsContentQuery = { post: { __typename: 'Post', id: string, title: string | null, content: string | null, featuredImage: { __typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename: 'MediaItem', sourceUrl: string | null } } | null } | null };
