import type { Creator, Work } from '@/content'
import { HTTPException } from 'hono/http-exception'

import { defineHandler, defineHead } from 'void'

import { getContent, getCreator } from '@/content'

export interface Props {
    work: Work
    creator: Creator | null
    pending: boolean
    error: null
}

export const loader = defineHandler((c): Props => {
    const work = getContent('works', c.req.param('slug')!)
    if (!work)
        throw new HTTPException(404, { message: '作品不存在' })
    return { work, creator: getCreator(work.author) ?? null, pending: false, error: null }
})

export const head = defineHead<Props>((_c, { work }) => ({
    title: work.title,
    meta: [{ name: 'description', content: work.description }],
    link: [{ rel: 'canonical', href: `https://prop.show${work.path}` }],
}))
