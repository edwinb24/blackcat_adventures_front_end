import * as Types from '../../../../types/__generated__/graphql';

export type GetPostListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPostListQuery = { posts: { __typename: 'RootQueryToPostConnection', nodes: Array<{ __typename: 'Post', id: string, title: string | null }> } | null };
