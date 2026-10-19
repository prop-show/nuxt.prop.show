import type { Video } from '@/content'

import { defineHandler, defineHead } from 'void'

import { videos } from '@/content'
import { seoHead } from '@/utils/seo'
import { videoEpisode } from '@/utils/video'

export interface Props {
    seriesVideos: Video[]
    pending: boolean
}

export const loader = defineHandler((): Props => ({
    seriesVideos: videos.filter(video => video.series === '乙巳').sort((a, b) => videoEpisode(a) - videoEpisode(b)),
    pending: false,
}))

export const head = defineHead<Props>(() => seoHead({
    title: '乙巳：从零构建完整产品',
    description: '从技术选型开始，按顺序学习 NestJS API、数据库、Vue 前端、JWT 登录与 Redis 缓存。',
    canonical: 'https://prop.show/series/yisi',
}))
