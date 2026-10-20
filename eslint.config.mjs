import antfu from '@antfu/eslint-config'

export default antfu({
    typescript: true,
    vue: true,
    stylistic: { indent: 4 },
    ignores: ['.vscode/**', 'pnpm-workspace.yaml', '.void/**', 'dist/**', 'src/auto-imports.d.ts', 'src/components.d.ts', 'content/**', 'pnpm-lock.yaml', 'void.lock.json', 'src/components/ui/**'],
    rules: { 'vue/multi-word-component-names': 'off' },
}, {
    files: ['scripts/**/*.mjs'],
    rules: { 'antfu/no-top-level-await': 'off', 'no-console': 'off', 'node/prefer-global/process': 'off' },
})
