/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetAllModulesContentQueryVariables = Exact<{
  id: string | number;
}>;


export type GetAllModulesContentQuery = { post: { __typename: 'Post', id: string, title: string | null, content: string | null } | null, modules: { __typename: 'RootQueryToModuleConnection', nodes: Array<{ __typename: 'Module', id: string, link: string | null, title: string | null, moduleFields: { __typename: 'ModuleFields', shortDescription: string | null, linkToPurchase: string | null, moduleStatus: string | null, additionalImage: { __typename: 'AcfMediaItemConnectionEdge', node: { __typename: 'MediaItem', link: string | null } } | null } | null }> } | null };
