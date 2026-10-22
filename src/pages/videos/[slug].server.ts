import type { ContentDocument, Video } from '@/content'
import { HTTPException } from 'hono/http-exception'
import { defineHandler, defineHead } from 'void'

import { site } from '@/config'
import { getContent, renderContent, videos } from '@/content'

import { seriesConfig } from '@/series-config'
import { seoHead } from '@/utils/seo'
import { videoEpisode, videoLabel } from '@/utils/video'

export interface Props {
    video: Video & ContentDocument
    previousVideo: Video | null
    nextVideo: Video | null
    pending: boolean
    isYisiSeries: boolean
    displayEpisode: number
    platforms: { key: string, name: string }[]
}

export const loader = defineHandler((c): Props => {
    const found = getContent('videos', c.req.param('slug')!)
    if (!found)
        throw new HTTPException(404, { message: '视频不存在' })
    const video = renderContent(found)
    const sequence = video.series
        ? videos.filter(item => item.series === video.series).sort((a, b) => videoEpisode(a) - videoEpisode(b))
        : [...videos].sort((a, b) => a.order - b.order)
    const index = sequence.findIndex(item => item.path === video.path)
    return {
        video,
        previousVideo: sequence[index - 1] ?? null,
        nextVideo: sequence[index + 1] ?? null,
        pending: false,
        isYisiSeries: video.series === seriesConfig.yisi.name,
        displayEpisode: videoEpisode(video),
        platforms: [
            { key: 'bilibili', name: 'BiliBili' },
            { key: 'douyin', name: '抖音' },
            { key: 'youtube', name: 'YouTube' },
        ],
    }
})

export const head = defineHead<Props>((_c, { video }) => {
    const title = videoLabel(video)
    const description = video.description.trim() || `观看「${title}」，了解${video.tags.join('、') || video.category}相关实践。`
    return seoHead({
        title,
        description: video.series ? `「${title}」：${description}` : description,
        canonical: `${site.url}${video.path}`,
    })
})
