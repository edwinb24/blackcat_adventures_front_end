import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Native flat config for eslint-config-next 16 (FlatCompat is not necessary).
// NOTE: typescript-eslint does not support TypeScript 7 yet. package.json
// installs TS 6 as "typescript" (used by typescript-eslint and Next.js) and
// TS 7 as "@typescript/native" (provides `tsc`, used by "yarn typecheck").
// Remove the alias once typescript-eslint supports TS 7.
const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'src/types/__generated__/**',
        '**/*.generated.ts',
    ]),
])

export default eslintConfig
