import antfu from '@antfu/eslint-config'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    antfu({
        typescript: true,
        pnpm: true,
        formatters: {
            css: true,
            html: true,
            markdown: 'prettier',
        },
        stylistic: {
            indent: 4,
        },
        vue: {
            overrides: {
                'vue/block-lang': ['warn', {
                    script: { lang: ['ts', 'tsx'] },
                }],
                'vue/enforce-style-attribute': ['warn', {
                    allow: ['scoped'],
                }],
            },
        },
        imports: {
            overrides: {
                'perfectionist/sort-imports': ['error', {
                    tsconfig: { rootDir: '.' },
                }],
            },
        },
        rules: {
            'css/style/no-tabs': 'off', // 如果规则在 css 插件下
            'style/no-tabs': 'off', // 如果规则是全局的
            'no-tabs': 'off', // 原生 ESLint 的 no-tabs 规则
        },
        ignores: [
            '*.yaml',
            'patches/**',
            'pnpm-workspace.yaml',
            'content/posts/2025/typescript-performance.md',
        ],
    }, {
        files: ['**/*.json'],
        ignores: ['content/**'],
        rules: {
            'style/eol-last': ['warn', 'never'],
        },
    }, {
        files: ['content/**'],
        // @keep-sorted
        rules: {
            'antfu/consistent-list-newline': 'off',
            'eqeqeq': 'off',
            // 'jsonc/comma-dangle': ['warn', 'always'],
            'no-irregular-whitespace': 'off',
            'no-sequences': 'off',
            'prefer-arrow-callback': 'off',
            'prefer-template': 'off',
            'style/indent': 'off',
            'style/no-mixed-spaces-and-tabs': 'off',
            'style/quotes': 'off',
            'style/semi': 'off',
            'unicorn/prefer-includes': 'off',
        },
    }),
)
