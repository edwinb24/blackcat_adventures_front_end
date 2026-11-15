import {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema:
        process.env.GRAPHQL_URL || 'https://cms.blackcat-adventures.com/graphql',
    documents: ['src/**/*.{ts,tsx}'],
    ignoreNoDocuments: true,
    generates: {
        './src/types/__generated__/graphql.ts': {
            plugins: ['typescript'],
        },
        './src/': {
            preset: 'near-operation-file',
            presetConfig: {
                baseTypesPath: './types/__generated__/graphql.ts',
            },
            plugins: ['typescript-operations'],
            config: {
                avoidOptionals: {
                    field: true,
                    inputValue: false,
                },
                defaultScalarType: 'unknown',
                nonOptionalTypename: true,
                skipTypeNameForRoot: true,
            },
        },
    },
}

export default config
