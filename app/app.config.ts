import type { NavigationMenuItem } from '@nuxt/ui'

import type { Creator, Platform, Social } from './types/app.config.type'

export default defineAppConfig({
    paginationPageSize: 10,

    ui: {
        colors: {
            primary: 'yellow',
            secondary: 'sky',
            neutral: 'neutral',
        },
    },

    platforms: [
        { key: 'bilibili', name: 'BiliBili', icon: 'i-tabler-brand-bilibili' },
        { key: 'douyin', name: '抖音', icon: 'i-tabler-brand-tiktok' },
        { key: 'youtube', name: 'YouTube', icon: 'i-tabler-brand-youtube' },
    ] as Platform[],

    socials: [
        { href: 'https://github.com/prop-show', platform: 'GitHub', icon: 'i-tabler-brand-github' },
        { href: 'https://space.bilibili.com/104376935', platform: '哔哩哔哩', icon: 'i-tabler-brand-bilibili' },
        { href: 'https://www.youtube.com/@PropShowFM', platform: 'YouTube', icon: 'i-tabler-brand-youtube' },
        { href: '/rss.xml', platform: 'XSS', icon: 'i-tabler-rss' },
        // { href: 'https://bento.me/prop-show', platform: 'Bento', icon: 'i-tabler-link' },
    ] as Social[],

    creators: [
        {
            avatar: 'https://bitmc.uno/picgo/126662463_p2.jpg',
            creator: 'Wei',
            href: 'https://github.com/Whbbit1999',
        },
        {
            avatar: 'https://bitmc.uno/picgo/Himavanta.jpeg',
            creator: 'Himavanta',
            href: 'https://github.com/himavanta',
        },
    ] as Creator[],

    navigationLinks: [
        { label: '首页', icon: 'i-tabler-armchair-2', to: '/' },
        { label: '视频', icon: 'i-tabler-device-tv', to: '/videos' },
        { label: '速报', icon: 'i-tabler-news', to: '/news' },
        { label: '关于我们', icon: 'i-tabler-brand-asana', to: '/about' },
    ] as NavigationMenuItem[],

    friendLinks: [
        { label: 'PropShowKit', to: 'https://kit.prop.show' },
        { label: '月空人', to: 'https://weilog.me' },
        { label: 'Himavanta', to: 'https://www.unsun.cc/' },
    ] as NavigationMenuItem[],

    techLogos: [
        { icon: 'i-tabler-brand-react', title: 'React', href: 'https://react.dev' },
        { icon: 'i-tabler-brand-nextjs', title: 'Next.js', href: 'https://nextjs.org' },
        { icon: 'i-tabler-brand-vue', title: 'Vue.js', href: 'https://vuejs.org/' },
        { icon: 'i-tabler-brand-nuxt', title: 'Nuxt.js', href: 'https://nuxt.com/' },
        { icon: 'i-tabler-brand-typescript', title: 'TypeScript', href: 'https://www.typescriptlang.org' },
        { icon: 'i-tabler-brand-tailwind', title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
        { icon: 'i-tabler-brand-nodejs', title: 'Nodejs', href: 'https://nodejs.org/' },
    ] as { icon: string, title: string, href: string }[],

    stacks: [
        { name: 'Nuxt.js' },
        { name: 'Vue' },
        { name: 'TypeScript' },
        { name: 'Tailwind CSS' },
        { name: 'Nuxt UI' },
        { name: 'Vercel' },
    ],
})
