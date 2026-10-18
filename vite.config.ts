import { fileURLToPath } from 'node:url'
import ui from '@nuxt/ui/vite'
import { voidVue } from '@void/vue/plugin'
import { defineConfig } from 'vite'
import { voidPlugin } from 'void'

export default defineConfig({
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    plugins: [
        voidPlugin(),
        voidVue(),
        ui({
            router: false,
            ui: { colors: { primary: 'yellow', secondary: 'sky', neutral: 'neutral' } },
            autoImport: { imports: ['vue'], dirs: ['./src/utils'], dts: 'src/auto-imports.d.ts' },
            components: { dirs: ['src/components'], directoryAsNamespace: true, collapseSamePrefixes: true, dts: 'src/components.d.ts' },
        }),
    ],
})
