import tailwindcss from '@tailwindcss/vite'
const keywords = [
  "前端开发",
  "播客",
  "视频教程",
  "Node.js",
  "React",
  "Vue",
  "Next.js",
  "Nuxt",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "编程教学",
  "前端框架",
  "Web开发",
]
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/content', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    customCollections: [
      {
        prefix: 'prop',
        dir: './app/assets/icons'
      }
    ]
  },

  app: {
    head: {
      title: 'prop.show - 前端开发播客与教程',
      meta: [
        { name: 'description', content: "prop.show 为你传递前端开发的核心属性。包含 Node.js 后台 API 开发，前端页面开发，系统设计，新库推荐，框架解析等内容。我们有视频和音频两种形式的内容。如果你有什么想和大家说的，可以到我们的来信栏目一起讨论。" },
        { name: 'keywords', content: keywords.join(', ') },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'prop.show' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg' },
      ],
    }
  }
})