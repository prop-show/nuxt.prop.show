import type { Video } from '@/content'

import { defineHandler, defineHead } from 'void'

import { pageSize, videos } from '@/content'

export interface Props {
    videos: readonly Video[]
    pending: boolean
    categories: string[]
    tags: string[]
    seriesCount: number
    activeCategory: string
    activeTag: string
    filteredVideos: readonly Video[]
    filterQuery: { category?: string, tag?: string }
    currentPage: number
    pageSize: number
    paginated: Video[]
}

export const loader = defineHandler((c): Props => {
    // Keep these keys serialized: Void infers page props from the first response.
    const activeCategory = c.req.query('category') || ''
    const activeTag = c.req.query('tag') || ''
    const filteredVideos = videos.filter(video => (!activeCategory || video.category === activeCategory)
        && (!activeTag || video.tags.includes(activeTag)))
    const rawPage = c.req.query('page') || '1'
    const requested = /^\d+$/.test(rawPage) && Number.isSafeInteger(Number(rawPage)) ? Number(rawPage) : 1
    const currentPage = Math.min(Math.max(1, requested), Math.max(1, Math.ceil(filteredVideos.length / pageSize)))

    return {
        videos,
        pending: false,
        categories: [...new Set(videos.map(video => video.category))],
        tags: [...new Set(videos.flatMap(video => video.tags))].sort(),
        seriesCount: videos.filter(video => video.series === '乙巳').length,
        activeCategory,
        activeTag,
        filteredVideos,
        filterQuery: { ...(activeCategory ? { category: activeCategory } : {}), ...(activeTag ? { tag: activeTag } : {}) },
        currentPage,
        pageSize,
        paginated: filteredVideos.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    }
})

export const head = defineHead<Props>((_c, props) => {
    // Filtered archives have their own canonical; discard unrelated query parameters.
    const query = new URLSearchParams(props.filterQuery)
    if (props.currentPage > 1)
        query.set('page', String(props.currentPage))
    return {
        title: props.currentPage > 1 ? `视频 · 第 ${props.currentPage} 页` : '视频',
        meta: [{ name: 'description', content: '观看 prop.show 前端开发视频，包含项目实战、技术解析、工具使用等高质量内容。' }],
        link: [{ rel: 'canonical', href: `https://prop.show/videos${query.size ? `?${query}` : ''}` }],
    }
})
