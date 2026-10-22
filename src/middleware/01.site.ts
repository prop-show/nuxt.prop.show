import { defineMiddleware } from 'void'
import { site } from '@/config'
import { creators } from '@/content'

export default defineMiddleware(async (c, next) => {
    const url = new URL(c.req.url)
    if (url.hostname === `www.${new URL(site.url).hostname}`) {
        url.hostname = new URL(site.url).hostname
        url.protocol = new URL(site.url).protocol
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
    const isErrorPage = url.pathname === '/404'
    // Internal rendering uses the normal Vue route, assets and layout; never fetch the public origin.
    if (isErrorPage || (c.res.status === 404 && (c.req.method === 'GET' || c.req.method === 'HEAD')
        && c.req.header('accept')?.includes('text/html') && !c.req.header('x-voidpages')
        && url.pathname !== '/api' && !url.pathname.startsWith('/api/') && !url.pathname.split('/').pop()?.includes('.'))) {
        let response = c.res
        if (!isErrorPage) {
            const { default: app } = await import('virtual:void-routes')
            response = await app.fetch(new Request(new URL('/404', url), {
                headers: { accept: 'text/html', cookie: c.req.header('cookie') ?? '' },
            }), c.env, c.executionCtx)
        }
        if (response.status >= 500) {
            c.res = response
            return
        }
        const headers = new Headers(response.headers)
        headers.set('X-Robots-Tag', 'noindex, follow')
        c.res = new Response(c.req.method === 'HEAD' ? null : response.body, { status: 404, headers })
    }
})
