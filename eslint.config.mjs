import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Native flat config for eslint-config-next 16 (FlatCompat is not necessary).
// NOTE: typescript-eslint does not support TypeScript 7 yet, so "yarn lint"
// stops with an error until a compatible typescript-eslint version is out.
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
