/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetPostListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostListQuery = { posts: { __typename: 'RootQueryToPostConnection', nodes: Array<{ __typename: 'Post', id: string, title: string | null, link: string | null, postFields: { __typename: 'PostFields', addToMainMenu: boolean | null } | null }> } | null, modules: { __typename: 'RootQueryToModuleConnection', nodes: Array<{ __typename: 'Module', id: string, title: string | null, link: string | null, moduleFields: { __typename: 'ModuleFields', moduleStatus: string | null } | null }> } | null };
