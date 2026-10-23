import type { Video } from '@/content'
import { defineHandler, defineHead } from 'void'

import { site } from '@/config'
import { videos } from '@/content'

import { seriesConfig } from '@/series-config'
import { seoHead } from '@/utils/seo'
import { videoEpisode } from '@/utils/video'

export interface Props {
    seriesVideos: Video[]
    pending: boolean
}

export const loader = defineHandler((): Props => ({
    seriesVideos: videos.filter(video => video.series === seriesConfig.yisi.name).sort((a, b) => videoEpisode(a) - videoEpisode(b)),
    pending: false,
}))

export const head = defineHead<Props>(() => seoHead({
    title: seriesConfig.yisi.title,
    description: seriesConfig.yisi.description,
    canonical: `${site.url}${seriesConfig.yisi.path}`,
}))
