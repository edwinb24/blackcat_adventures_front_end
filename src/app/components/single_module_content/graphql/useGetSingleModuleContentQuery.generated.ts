/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetSingleModuleQueryVariables = Exact<{
  name: string;
}>;


export type GetSingleModuleQuery = { modules: { __typename: 'RootQueryToModuleConnection', nodes: Array<{ __typename: 'Module', title: string | null, id: string, moduleFields: { __typename: 'ModuleFields', description: string | null, linkToPurchase: string | null, moduleStatus: string | null, additionalImage: { __typename: 'AcfMediaItemConnectionEdge', node: { __typename: 'MediaItem', link: string | null, altText: string | null } } | null } | null }> } | null };
