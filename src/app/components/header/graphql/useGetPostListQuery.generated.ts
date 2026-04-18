import * as Types from '../../../../types/__generated__/graphql';

export type GetPostListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPostListQuery = { posts: { __typename: 'RootQueryToPostConnection', nodes: Array<{ __typename: 'Post', id: string, title: string | null, link: string | null }> } | null, modules: { __typename: 'RootQueryToModuleConnection', nodes: Array<{ __typename: 'Module', id: string, title: string | null, link: string | null }> } | null };
