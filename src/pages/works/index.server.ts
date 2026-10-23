import type { Creator, Work } from '@/content'
import { defineHandler, defineHead } from 'void'

import { site } from '@/config'

import { creators, pageSize, works } from '@/content'
import { seoHead } from '@/utils/seo'

export interface Props {
    archive: { works: readonly Work[], creators: readonly Creator[] }
    pending: boolean
    error: null
    activeAuthor: string
    filteredWorks: readonly Work[]
    paginationQuery: { author?: string }
    currentPage: number
    pageSize: number
    paginated: Work[]
}

export const loader = defineHandler((c): Props => {
    // Keep these keys serialized: Void infers page props from the first response.
    const activeAuthor = c.req.query('author') || ''
    const filteredWorks = activeAuthor
        ? creators.some(creator => creator.slug === activeAuthor) ? works.filter(work => work.author === activeAuthor) : []
        : works
    const rawPage = c.req.query('page') || '1'
    const requested = /^\d+$/.test(rawPage) && Number.isSafeInteger(Number(rawPage)) ? Number(rawPage) : 1
    const currentPage = Math.min(Math.max(1, requested), Math.max(1, Math.ceil(filteredWorks.length / pageSize)))
    return {
        archive: { works, creators },
        pending: false,
        error: null,
        activeAuthor,
        filteredWorks,
        paginationQuery: activeAuthor ? { author: activeAuthor } : {},
        currentPage,
        pageSize,
        paginated: filteredWorks.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    }
})

export const head = defineHead<Props>((_c, props) => {
    const query = new URLSearchParams(props.paginationQuery)
    if (props.currentPage > 1)
        query.set('page', String(props.currentPage))
    return seoHead({
        title: props.currentPage > 1 ? `团队作品 · 第 ${props.currentPage} 页` : '团队作品',
        description: '浏览 prop.show 团队成员完成的网站、产品、工具与开源项目。',
        canonical: `${site.url}/works${query.size ? `?${query}` : ''}`,
    })
})
