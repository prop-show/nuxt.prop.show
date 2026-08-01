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
    ],

    socials: [
        { href: 'https://github.com/prop-show', platform: 'GitHub', icon: 'i-tabler-brand-github' },
        { href: 'https://space.bilibili.com/104376935', platform: '哔哩哔哩', icon: 'i-tabler-brand-bilibili' },
        { href: 'https://www.youtube.com/@PropShowFM', platform: 'YouTube', icon: 'i-tabler-brand-youtube' },
        { href: '/rss.xml', platform: 'RSS', icon: 'i-tabler-rss' },
    ],

    navigationLinks: [
        { label: '首页', to: '/' },
        { label: '视频', to: '/videos' },
        { label: '速报', to: '/news' },
        { label: '关于我们', to: '/about' },
    ],

    designAssets: {
        logos: [
            {
                key: 'light',
                label: '浅色背景版',
                channel: 'LIGHT SURFACE',
                description: '黑色标志用于白色或其他明亮、简洁的背景。',
                asset: '/prop-light.svg',
                transparentAsset: '/prop-light-transparent.svg',
                surfaceColor: '#FFFFFF',
            },
            {
                key: 'dark',
                label: '深色背景版',
                channel: 'DARK SURFACE',
                description: '品牌黄标志用于黑色或其他深色背景。',
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
                description: '标志、主要交互与重点信息',
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
        { label: 'PropShowKit', to: 'https://kit.prop.show' },
        { label: '月空人', to: 'https://weilog.me' },
        { label: 'Himavanta', to: 'https://www.unsun.cc/' },
    ],

    techLogos: [
        { icon: 'i-tabler-brand-react', title: 'React', href: 'https://react.dev' },
        { icon: 'i-tabler-brand-nextjs', title: 'Next.js', href: 'https://nextjs.org' },
        { icon: 'i-tabler-brand-vue', title: 'Vue.js', href: 'https://vuejs.org/' },
        { icon: 'i-tabler-brand-nuxt', title: 'Nuxt.js', href: 'https://nuxt.com/' },
        { icon: 'i-tabler-brand-typescript', title: 'TypeScript', href: 'https://www.typescriptlang.org' },
        { icon: 'i-tabler-brand-tailwind', title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
        { icon: 'i-tabler-brand-nodejs', title: 'Nodejs', href: 'https://nodejs.org/' },
    ],

    stacks: [
        { name: 'Nuxt.js', icon: 'i-tabler-brand-nuxt' },
        { name: 'Vue', icon: 'i-tabler-brand-vue' },
        { name: 'TypeScript', icon: 'i-tabler-brand-typescript' },
        { name: 'Tailwind CSS', icon: 'i-tabler-brand-tailwind' },
        { name: 'Nuxt UI', icon: 'i-tabler-components' },
        { name: 'Vercel', icon: 'i-tabler-brand-vercel' },
    ],
})
