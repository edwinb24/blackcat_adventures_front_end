import * as Types from '../../types/__generated__/graphql';

export type PostListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PostListQuery = { posts: { __typename: 'RootQueryToPostConnection', nodes: Array<{ __typename: 'Post', id: string, title: string | null }> } | null };
