import type { News } from '@/content'

import { defineHandler, defineHead } from 'void'

import { news, pageSize } from '@/content'
import { seoHead } from '@/utils/seo'

export interface Props {
    newsPage: { news: News[], total: number, latest: News | null, requested: number, page: number }
    pending: boolean
    currentPage: number
    pageOffset: number
    paginationPageSize: number
}

export const loader = defineHandler((c): Props => {
    const rawPage = c.req.query('page') || '1'
    const requested = /^\d+$/.test(rawPage) && Number.isSafeInteger(Number(rawPage)) ? Number(rawPage) : 1
    const page = Math.min(Math.max(1, requested), Math.max(1, Math.ceil(news.length / pageSize)))
    const pageOffset = (page - 1) * pageSize
    return {
        newsPage: { news: news.slice(pageOffset, pageOffset + pageSize), total: news.length, latest: news[0] ?? null, requested, page },
        pending: false,
        currentPage: page,
        pageOffset,
        paginationPageSize: pageSize,
    }
})

export const head = defineHead<Props>((_c, props) => seoHead({
    title: props.currentPage > 1 ? `速报 · 第 ${props.currentPage} 页` : '速报',
    description: '第一时间获得前端库和工具的最新动态和更新消息。',
    canonical: `https://prop.show/news${props.currentPage > 1 ? `?page=${props.currentPage}` : ''}`,
}))
