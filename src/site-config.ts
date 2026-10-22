import IconBrandBilibili from '~icons/tabler/brand-bilibili'
import IconBrandCloudflare from '~icons/tabler/brand-cloudflare'
import IconBrandGithub from '~icons/tabler/brand-github'
import IconBrandNextjs from '~icons/tabler/brand-nextjs'
import IconBrandNodejs from '~icons/tabler/brand-nodejs'
import IconBrandNuxt from '~icons/tabler/brand-nuxt'
import IconBrandReact from '~icons/tabler/brand-react'
import IconBrandTailwind from '~icons/tabler/brand-tailwind'
import IconBrandTiktok from '~icons/tabler/brand-tiktok'
import IconBrandTypescript from '~icons/tabler/brand-typescript'
import IconBrandVue from '~icons/tabler/brand-vue'
import IconBrandYoutube from '~icons/tabler/brand-youtube'
import IconRss from '~icons/tabler/rss'
import { accounts } from './config'

export const siteConfig = {
    platforms: [
        { key: 'bilibili', name: 'BiliBili', icon: IconBrandBilibili },
        { key: 'douyin', name: '抖音', icon: IconBrandTiktok },
        { key: 'youtube', name: 'YouTube', icon: IconBrandYoutube },
    ],

    socials: [
        { href: `https://github.com/${accounts.github}`, platform: 'GitHub', icon: IconBrandGithub },
        { href: `https://space.bilibili.com/${accounts.bilibili}`, platform: '哔哩哔哩', icon: IconBrandBilibili },
        { href: `https://www.youtube.com/@${accounts.youtube}`, platform: 'YouTube', icon: IconBrandYoutube },
        { href: '/rss.xml', platform: 'RSS', icon: IconRss },
    ],

    navigationLinks: [
        { label: '首页', to: '/' },
        { label: '视频', to: '/videos' },
        { label: '速报', to: '/news' },
        { label: '作品', to: '/works' },
        { label: '关于我们', to: '/about' },
    ],

    designAssets: {
        logos: [
            {
                key: 'light',
                label: '浅色背景版',
                channel: 'LIGHT SURFACE',
                description: '用于白色或明亮简洁的背景。',
                asset: '/prop-light.svg',
                transparentAsset: '/prop-light-transparent.svg',
                surfaceColor: '#FFFFFF',
            },
            {
                key: 'dark',
                label: '深色背景版',
                channel: 'DARK SURFACE',
                description: '用于黑色或深色背景。',
                asset: '/prop-dark.svg',
                transparentAsset: '/prop-dark-transparent.svg',
                surfaceColor: '#000000',
            },
        ],
        colors: [
            {
                name: '品牌黄',
                channel: 'PRIMARY',
                hex: '#F0DB4F',
                rgb: '240 219 79',
                description: '标志、主要按钮与重点色块；浅色背景上的强调文字使用深黄色以保证对比度。',
                textColor: '#000000',
            },
            {
                name: '墨黑',
                channel: 'INK',
                hex: '#000000',
                rgb: '0 0 0',
                description: '标题、黑色背景与浅色版标志',
                textColor: '#FFFFFF',
            },
            {
                name: '纸白',
                channel: 'PAPER',
                hex: '#FFFFFF',
                rgb: '255 255 255',
                description: '浅色表面与内容留白',
                textColor: '#000000',
            },
        ],
    },

    friendLinks: [
        { label: '在线图片压缩', to: 'https://compress.weilog.me' },
        { label: 'PropShowKit', to: 'https://kit.prop.show' },
        { label: '月空人', to: 'https://weilog.me' },
        { label: 'Himavanta', to: 'https://www.unsun.cc/' },
    ],

    techLogos: [
        { icon: IconBrandReact, title: 'React', href: 'https://react.dev' },
        { icon: IconBrandNextjs, title: 'Next.js', href: 'https://nextjs.org' },
        { icon: IconBrandVue, title: 'Vue.js', href: 'https://vuejs.org/' },
        { icon: IconBrandNuxt, title: 'Nuxt.js', href: 'https://nuxt.com/' },
        { icon: IconBrandTypescript, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
        { icon: IconBrandTailwind, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
        { icon: IconBrandNodejs, title: 'Nodejs', href: 'https://nodejs.org/' },
    ],

    stacks: [
        { name: 'Void', logo: '/brands/void-light.svg', darkLogo: '/brands/void-dark.svg' },
        { name: 'Vue', icon: IconBrandVue },
        { name: 'TypeScript', icon: IconBrandTypescript },
        { name: 'Tailwind CSS', icon: IconBrandTailwind },
        { name: 'shadcn-vue', logo: '/brands/shadcn-vue.svg' },
        { name: 'Cloudflare', icon: IconBrandCloudflare },
    ],
}
