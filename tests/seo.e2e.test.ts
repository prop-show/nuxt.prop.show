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

    it('renders metadata and headings', async () => {
        expect(await read('/videos/npm-supply-chain-simple-defense')).toMatch(/<meta name="description" content="[^"]+"/)
        for (const path of ['/', '/about', '/design-assets', '/series/yisi', '/news', '/works']) {
            const html = await read(path)
            expect(html).toMatch(/<h1\b/)
            expect(html).not.toMatch(/<(?:NuxtLink|Lazy[A-Z])/)
        }
    })

    it('returns 404 for unknown entries', async () => {
        for (const collection of ['videos', 'news', 'works'])
            expect((await fetch(`${base}/${collection}/seo-check-missing`)).status).toBe(404)
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
