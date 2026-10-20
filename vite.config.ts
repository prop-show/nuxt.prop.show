import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { voidVue } from '@void/vue/plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { voidPlugin } from 'void'
import { contentPlugin } from './scripts/content-plugin.ts'

export default defineConfig({
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    plugins: [
        contentPlugin(),
        voidPlugin(),
        voidVue(),
        tailwindcss(),
        Icons({ compiler: 'vue3' }),
        AutoImport({ imports: ['vue'], dirs: ['./src/utils'], dts: 'src/auto-imports.d.ts' }),
        Components({ dirs: ['src/components'], directoryAsNamespace: true, collapseSamePrefixes: true, dts: 'src/components.d.ts' }),
    ],
})
