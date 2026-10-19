import type { Handler } from 'hono'
import type { CloudEnv } from 'void'
import { Hono } from 'hono'
import { describe, expect, it } from 'vitest'
import { news, pageSize, videos, works } from '@/content'
import { GET as robots } from '@/routes/robots.txt'
import { GET as rss } from '@/routes/rss.xml'
import { GET as sitemap } from '@/routes/sitemap.xml'

// TypedHandler resolves its response as unknown, so Hono cannot infer the handler type.
const app = new Hono<CloudEnv>()
for (const [path, handler] of Object.entries({ '/rss.xml': rss, '/robots.txt': robots, '/sitemap.xml': sitemap }))
    app.get(path, handler as unknown as Handler)

async function read(path: string) {
    const response = await app.request(`https://prop.show${path}`)
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('public, max-age=0, s-maxage=3600')
    return response
}

describe('http endpoints', () => {
    it('serves RSS with every video and news item', async () => {
        const response = await read('/rss.xml')
        expect(response.headers.get('content-type')).toMatch(/^application\/rss\+xml/)
        const body = await response.text()
        expect(body.match(/<item>/g)).toHaveLength(videos.length + news.length)
        expect(body).toContain('乙巳 EP.')
        expect(body).not.toContain('xml-stylesheet')
        expect(body).not.toContain('Invalid Date')
    })

    it('serves robots linking the sitemap', async () => {
        const response = await read('/robots.txt')
        expect(response.headers.get('content-type')).toMatch(/^text\/plain/)
        expect(await response.text()).toContain('Sitemap: https://prop.show/sitemap.xml')
    })

    it('serves a sitemap with pages, detail URLs and query pagination', async () => {
        const response = await read('/sitemap.xml')
        expect(response.headers.get('content-type')).toMatch(/^application\/xml/)
        const body = await response.text()
        for (const item of [...videos, ...news, ...works])
            expect(body).toContain(`<loc>https://prop.show${item.path}</loc>`)
        for (let page = 2; page <= Math.ceil(videos.length / pageSize); page++)
            expect(body).toContain(`/videos?page=${page}`)
        expect(body).not.toContain('/videos/page/')
    })
})
