import antfu from '@antfu/eslint-config'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    antfu({
        formatters: true,
        vue: true,
        typescript: true,
        stylistic: {
            indent: 4,
        },
        rules: {
            'jsonc/indent': ['error', 2],
            'vue/block-lang': ['warn', {
                script: { lang: ['ts', 'tsx'] },
                style: { lang: ['scss'] },
            }],
            'vue/enforce-style-attribute': ['warn', {
                allow: ['scoped'],
            }],
            'yaml/indent': ['error', 2],
            'perfectionist/sort-imports': ['error', {
                tsconfigRootDir: '.',
            }],
        },
        ignores: ['patches/**', 'pnpm-workspace.yaml'],
    }),
)
