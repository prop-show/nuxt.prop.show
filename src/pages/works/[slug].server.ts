import type { ContentDocument, Creator, Work } from '@/content'
import { HTTPException } from 'hono/http-exception'
import { defineHandler, defineHead } from 'void'

import { site } from '@/config'

import { getContent, getCreator, renderContent } from '@/content'
import { seoHead } from '@/utils/seo'

export interface Props {
    work: Work & ContentDocument
    creator: Creator | null
    pending: boolean
    error: null
}

export const loader = defineHandler((c): Props => {
    const found = getContent('works', c.req.param('slug')!)
    if (!found)
        throw new HTTPException(404, { message: '作品不存在' })
    const work = renderContent(found)
    return { work, creator: getCreator(work.author) ?? null, pending: false, error: null }
})

export const head = defineHead<Props>((_c, { work }) => seoHead({
    title: work.title,
    description: work.description,
    canonical: `${site.url}${work.path}`,
}))
