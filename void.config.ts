import { defineConfig } from 'void/config'

export default defineConfig({
    sourceDir: 'src',
    target: 'cloudflare',
    cloudflare: {
        name: 'nuxt-prop-show',
        previews: {},
    },
    worker: { compatibility_date: '2026-10-18', compatibility_flags: ['nodejs_compat'] },
    head: {
        titleTemplate: '%s | prop.show',
        htmlAttrs: { lang: 'zh-CN' },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'robots', content: 'index, follow, max-image-preview:large' },
        ],
        link: [
            { rel: 'icon', type: 'image/svg+xml', href: '/prop-light.svg' },
            { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: 'prop.show RSS' },
        ],
        script: [{ innerHTML: 'try{const t=localStorage.getItem("vueuse-color-scheme");if(t==="dark"||((!t||t==="auto")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch{}' }],
    },
})
