import { defineMiddleware } from 'void'
import { creators } from '@/content'

export default defineMiddleware(async (c, next) => {
    const url = new URL(c.req.url)
    if (url.hostname === 'www.prop.show') {
        url.hostname = 'prop.show'
        url.protocol = 'https:'
        return c.redirect(url.toString(), 301)
    }
    const legacy = url.pathname.match(/^\/(videos|news|works)\/page\/(\d+)\/?$/)
    if (legacy) {
        url.pathname = `/${legacy[1]}`
        if (Number(legacy[2]) > 1)
            url.searchParams.set('page', legacy[2])
        return c.redirect(`${url.pathname}${url.search}`, 301)
    }
    c.set('shared', { creators, path: url.pathname })
    c.header('X-Content-Type-Options', 'nosniff')
    await next()
})
