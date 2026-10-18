import type { News } from '@/content'
import { HTTPException } from 'hono/http-exception'

import { defineHandler, defineHead } from 'void'

import { contentDate, getContent, news } from '@/content'

export interface Props {
    letter: News
    pending: boolean
    signalNumber: string
    publishedAt: { date: string, time: string }
}

export const loader = defineHandler((c): Props => {
    const letter = getContent('news', c.req.param('slug')!)
    if (!letter)
        throw new HTTPException(404, { message: '速报不存在' })
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

export const head = defineHead<Props>((_c, { letter }) => ({
    title: letter.title,
    meta: [{ name: 'description', content: letter.description }],
    link: [{ rel: 'canonical', href: `https://prop.show${letter.path}` }],
}))
