import { describe, expect, it } from 'vitest'
import { pageSize, videos } from '@/content'

// Needs a running server: pnpm dev, or pnpm build && pnpm preview.
const base = process.env.SEO_BASE_URL ?? 'http://localhost:4399'

async function read(path: string) {
    const response = await fetch(`${base}${path}`)
    expect(response.status, path).toBe(200)
    return response.text()
}

const pageCount = Math.ceil(videos.length / pageSize)

describe('seo', () => {
    it('links every video once across the paginated archive', async () => {
        const seen = new Set<string>()
        for (let page = 1; page <= pageCount; page++) {
            const path = `/videos${page > 1 ? `?page=${page}` : ''}`
            const html = await read(path)
            expect(html).toContain(`rel="canonical" href="https://prop.show${path}"`)
            const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? ''
            const links = [...new Set([...main.matchAll(/<a\s[^>]*href="(\/videos\/[^"?#]+)"/g)].map(match => match[1]!))]
            expect(links).toHaveLength(page === pageCount ? videos.length - pageSize * (pageCount - 1) : pageSize)
            for (const link of links) {
                expect(seen.has(link), `Repeated video: ${link}`).toBe(false)
                seen.add(link)
            }
        }
        expect(seen.size).toBe(videos.length)
    })

    it('renders pagination as accessible links to real archive pages', async () => {
        const html = await read('/videos?page=2')
        const pagination = html.match(/<nav\s[^>]*aria-label="内容分页"[\s\S]*?<\/nav>/)?.[0]
        expect(pagination).toBeDefined()
        const links = pagination!.match(/<a\s[^>]+>/g) ?? []
        expect(links.find(link => link.includes('aria-current="page"'))).toContain('href="/videos?page=2"')
        expect(links.find(link => link.includes('rel="prev"'))).toContain('href="/videos"')
        if (pageCount > 2)
            expect(links.find(link => link.includes('rel="next"'))).toContain('href="/videos?page=3"')
        expect(pagination).not.toMatch(/<button\b/)
    })

    it('renders metadata and headings', async () => {
        expect(await read('/videos/npm-supply-chain-simple-defense')).toMatch(/<meta name="description" content="[^"]+"/)
        for (const path of ['/', '/about', '/design-assets', '/series/yisi', '/news', '/works']) {
            const html = await read(path)
            expect(html).toMatch(/<h1\b/)
            expect(html.match(/<main\b/g)).toHaveLength(1)
            expect(html).toContain('property="og:title"')
            expect(html).toContain('name="twitter:card"')
            const structured = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
            expect(JSON.parse(structured![1]!)['@graph'].map((entry: { '@type': string }) => entry['@type'])).toEqual(['WebSite', 'WebPage'])
            expect(html).not.toMatch(/<(?:NuxtLink|Lazy[A-Z])/)
        }
    })

    it('renders the Vue error page with a real 404 for unknown routes and entries', async () => {
        for (const path of ['/404', '/seo-check-missing', '/videos/seo-check-missing', '/news/seo-check-missing', '/works/seo-check-missing']) {
            const response = await fetch(`${base}${path}`, { headers: { accept: 'text/html' } })
            expect(response.status, path).toBe(404)
            expect(response.headers.get('x-robots-tag')).toBe('noindex, follow')
            const html = await response.text()
            expect(html).toContain('页面不存在')
            expect(html).toContain('__VOID_PAGE_DATA__')
            expect(html).toContain('主要导航')
            expect(html).toContain('href="/videos"')
            expect(html.match(/<main\b/g)).toHaveLength(1)
        }
    })

    it('keeps API and asset 404s out of the Vue error page', async () => {
        for (const path of ['/api/seo-check-missing', '/seo-check-missing.js']) {
            const response = await fetch(`${base}${path}`, { headers: { accept: 'text/html' } })
            expect(response.status).toBe(404)
            expect(await response.text()).not.toContain('__VOID_PAGE_DATA__')
        }
    })

    it('serves a Takumi PNG for each share image URL', async () => {
        for (const path of ['/', '/videos?page=2', '/videos/npm-supply-chain-simple-defense', '/news', '/works', '/about']) {
            const html = await read(path)
            const image = html.match(/<meta property="og:image" content="([^"]+)"/)![1]!
            const response = await fetch(new URL(new URL(image).pathname, base))
            expect(response.status).toBe(200)
            expect(response.headers.get('content-type')).toContain('image/png')
            const bytes = new Uint8Array(await response.arrayBuffer())
            expect([...bytes.slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10])
            const view = new DataView(bytes.buffer)
            expect(view.getUint32(16)).toBe(1200)
            expect(view.getUint32(20)).toBe(630)
        }
    })

    it('serves sitemap, RSS and robots', async () => {
        const sitemap = await read('/sitemap.xml')
        for (let page = 2; page <= pageCount; page++)
            expect(sitemap).toContain(`https://prop.show/videos?page=${page}`)
        expect(await read('/rss.xml')).toContain('<rss ')
        expect(await read('/robots.txt')).toContain('Sitemap: https://prop.show/sitemap.xml')
    })

    it('redirects legacy pagination to the query form', async () => {
        const redirect = await fetch(`${base}/videos/page/2`, { redirect: 'manual' })
        expect(redirect.status).toBe(301)
        expect(redirect.headers.get('location')).toBe('/videos?page=2')
    })
})
