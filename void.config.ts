import { defineConfig } from 'void/config'
import { themeScript } from './src/theme-script'

export default defineConfig({
    sourceDir: 'src',
    target: 'cloudflare',
    cloudflare: {
        name: 'nuxt-prop-show',
        previews: {},
    },
    worker: { compatibility_date: '2026-10-18', compatibility_flags: ['nodejs_compat'] },
    routing: {
        // 内容全部在构建期打包，部署会清空 ISR 缓存；这里只是给不常发版时兜个底。
        revalidate: { '/api/*': 0, '*': 604800 },
        // 归档页按查询参数分页/筛选，不加入 allowlist 会共用一个缓存条目。
        revalidateQueryAllowlist: {
            '/videos': ['category', 'tag', 'page'],
            '/works': ['author', 'page'],
            '/news': ['page'],
        },
    },
    head: {
        titleTemplate: '%s | prop.show',
        htmlAttrs: { lang: 'zh-CN' },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'robots', content: 'index, follow, max-image-preview:large' },
        ],
        link: [
            { rel: 'icon', type: 'image/svg+xml', href: '/prop-dark.svg', media: '(prefers-color-scheme: dark)' },
            { rel: 'icon', type: 'image/svg+xml', href: '/prop-light.svg', media: '(prefers-color-scheme: light)' },
            { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: 'prop.show RSS' },
        ],
        script: [{ innerHTML: themeScript }],
    },
})
