/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetAboutUsContentQueryVariables = Exact<{
  id: string | number;
}>;


export type GetAboutUsContentQuery = { post: { __typename: 'Post', id: string, title: string | null, content: string | null, featuredImage: { __typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge', node: { __typename: 'MediaItem', sourceUrl: string | null, altText: string | null } } | null } | null };
