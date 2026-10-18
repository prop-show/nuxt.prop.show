import type { News, Video } from '@/content'

import { defineHandler, defineHead } from 'void'

import { creators, news, videos } from '@/content'

export interface Props {
    homeContent: {
        videoTotal: number
        newsTotal: number
        creatorTotal: number
        videos: Video[]
        news: News[]
    }
}

export const loader = defineHandler((): Props => ({
    homeContent: {
        videoTotal: videos.length,
        newsTotal: news.length,
        creatorTotal: creators.length,
        videos: videos.slice(0, 3),
        news: news.slice(0, 3),
    },
}))

export const head = defineHead<Props>(() => ({
    title: '前端开发播客与教程',
    meta: [{ name: 'description', content: 'prop.show 是专注于前端开发的播客与教程平台，提供 React、Vue、Node.js、TypeScript 等技术内容。包括视频教程、音频播客、新库推荐和框架解析。' }],
    link: [{ rel: 'canonical', href: 'https://prop.show/' }],
}))
