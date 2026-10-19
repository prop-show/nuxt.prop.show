import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { contentPlugin } from './scripts/content-plugin.ts'

const common = {
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    test: { environment: 'node' as const },
}

export default defineConfig({
    ...common,
    plugins: [contentPlugin()],
    test: {
        projects: [
            { ...common, test: { ...common.test, name: 'unit', include: ['tests/**/*.test.ts'], exclude: ['tests/**/*.e2e.test.ts'] } },
            // Needs a running server: pnpm dev, or pnpm build && pnpm preview.
            { ...common, test: { ...common.test, name: 'e2e', include: ['tests/**/*.e2e.test.ts'] } },
        ],
    },
})
