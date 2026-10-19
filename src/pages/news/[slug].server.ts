import type { ContentDocument, News } from '@/content'
import { HTTPException } from 'hono/http-exception'

import { defineHandler, defineHead } from 'void'

import { contentDate, getContent, news, renderContent } from '@/content'
import { seoHead } from '@/utils/seo'

export interface Props {
    letter: News & ContentDocument
    pending: boolean
    signalNumber: string
    publishedAt: { date: string, time: string }
}

export const loader = defineHandler((c): Props => {
    const found = getContent('news', c.req.param('slug')!)
    if (!found)
        throw new HTTPException(404, { message: '速报不存在' })
    const letter = renderContent(found)
    const value = contentDate(letter.date)
    return {
        letter,
        pending: false,
        signalNumber: String(news.length - news.findIndex(item => item.path === letter.path)).padStart(2, '0'),
        publishedAt: value
            ? {
                    date: new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(value),
                    time: new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false }).format(value),
                }
            : { date: '--', time: '--' },
    }
})

export const head = defineHead<Props>((_c, { letter }) => seoHead({
    title: letter.title,
    description: letter.description,
    canonical: `https://prop.show${letter.path}`,
}))
