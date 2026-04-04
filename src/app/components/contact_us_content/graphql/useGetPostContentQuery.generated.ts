import * as Types from '../../../../types/__generated__/graphql';

export type GetPostContentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetPostContentQuery = { post: { __typename: 'Post', id: string, title: string | null, content: string | null } | null };
