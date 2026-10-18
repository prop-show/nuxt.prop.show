import type { Video } from '@/content'
import { HTTPException } from 'hono/http-exception'

import { defineHandler, defineHead } from 'void'

import { getContent, videos } from '@/content'
import { videoEpisode, videoLabel } from '@/utils/video'

export interface Props {
    video: Video
    previousVideo: Video | null
    nextVideo: Video | null
    pending: boolean
    isYisiSeries: boolean
    displayEpisode: number
    platforms: { key: string, name: string, icon: string }[]
}

export const loader = defineHandler((c): Props => {
    const video = getContent('videos', c.req.param('slug')!)
    if (!video)
        throw new HTTPException(404, { message: '视频不存在' })
    const sequence = video.series
        ? videos.filter(item => item.series === video.series).sort((a, b) => videoEpisode(a) - videoEpisode(b))
        : [...videos].sort((a, b) => a.order - b.order)
    const index = sequence.findIndex(item => item.path === video.path)
    return {
        video,
        previousVideo: sequence[index - 1] ?? null,
        nextVideo: sequence[index + 1] ?? null,
        pending: false,
        isYisiSeries: video.series === '乙巳',
        displayEpisode: videoEpisode(video),
        platforms: [
            { key: 'bilibili', name: 'BiliBili', icon: 'i-tabler-brand-bilibili' },
            { key: 'douyin', name: '抖音', icon: 'i-tabler-brand-tiktok' },
            { key: 'youtube', name: 'YouTube', icon: 'i-tabler-brand-youtube' },
        ],
    }
})

export const head = defineHead<Props>((_c, { video }) => ({
    title: videoLabel(video),
    meta: [{ name: 'description', content: video.description.trim() || `观看「${videoLabel(video)}」，了解${video.tags.join('、') || video.category}相关实践。` }],
    link: [{ rel: 'canonical', href: `https://prop.show${video.path}` }],
}))
