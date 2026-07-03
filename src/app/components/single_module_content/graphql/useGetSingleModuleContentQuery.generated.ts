import * as Types from '../../../../types/__generated__/graphql';

export type GetSingleModuleQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type GetSingleModuleQuery = { modules: { __typename: 'RootQueryToModuleConnection', nodes: Array<{ __typename: 'Module', title: string | null, modules: { __typename: 'Modules', description: string | null, additionalImage: { __typename: 'AcfMediaItemConnectionEdge', node: { __typename: 'MediaItem', link: string | null } } | null } | null }> } | null };
