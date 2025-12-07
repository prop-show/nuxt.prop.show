import tailwindcss from '@tailwindcss/vite'

const keywords = [
  '前端开发',
  '播客',
  '视频教程',
  'Node.js',
  'React',
  'Vue',
  'Next.js',
  'Nuxt',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  '编程教学',
  '前端框架',
  'Web开发',
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/content', '@nuxtjs/seo', '@nuxt/hints', '@nuxtjs/seo', '@nuxt/eslint', '@nuxt/image'],

  css: ['~/assets/css/main.css'],

  // 性能优化配置
  experimental: {
    payloadExtraction: true,
    viewTransition: true,
  },

  // Nitro 预渲染配置
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // 路由预取策略
  routeRules: {
    '/': { prerender: true },
  },

  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    customCollections: [
      {
        prefix: 'prop',
        dir: './app/assets/icons',
      },
    ],
  },

  site: {
    url: 'https://prop.show',
    name: 'prop.show',
    description: 'prop.show 为你传递前端开发的核心属性。包含 Node.js 后台 API 开发，前端页面开发，系统设计，新库推荐，框架解析等内容。',
    defaultLocale: 'zh-CN',
  },
  ogImage: {
    fonts: [
      'Noto+Sans+SC:400',
    ],
    defaults: {
      emojis: 'twemoji',
    },
  },

  image: {
    domains: ['bitmc.uno'],
    format: ['webp', 'avif'],
    quality: 80,
    densities: [1, 2],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: 'prop.show - 前端开发播客与教程',
      meta: [
        { name: 'description', content: 'prop.show 为你传递前端开发的核心属性。包含 Node.js 后台 API 开发，前端页面开发，系统设计，新库推荐，框架解析等内容。我们有视频和音频两种形式的内容。如果你有什么想和大家说的，可以到我们的来信栏目一起讨论。' },
        { name: 'keywords', content: keywords.join(', ') },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'prop.show' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://prop.show' },
      ],
    },
  },
})
