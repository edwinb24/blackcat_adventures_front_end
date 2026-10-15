/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetPostContentQueryVariables = Exact<{
  id: string | number;
}>;


export type GetPostContentQuery = { post: { __typename: 'Post', id: string, title: string | null, content: string | null } | null };
