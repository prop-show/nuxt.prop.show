import { defineHandler } from 'void'
import { xmlCacheControl } from '@/config'
import { contentDate, escapeXml, news, pageSize, siteUrl, videos, works } from '@/content'

const entries: { path: string, date?: string }[] = [
    { path: '/' },
    { path: '/about' },
    { path: '/design-assets' },
    { path: '/series/yisi' },
    ...videos,
    ...news,
    ...works,
]
for (const [collection, count] of [['videos', videos.length], ['news', news.length], ['works', works.length]] as const) {
    entries.push({ path: `/${collection}` })
    for (let page = 2; page <= Math.ceil(count / pageSize); page++)
        entries.push({ path: `/${collection}?page=${page}` })
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => {
    const location = new URL(entry.path, siteUrl).href
    const modified = contentDate(entry.date)?.toISOString()
    return `  <url><loc>${escapeXml(location)}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ''}</url>`
}).join('\n')}
</urlset>`

export const GET = defineHandler((c) => {
    c.header('Content-Type', 'application/xml; charset=utf-8')
    c.header('Cache-Control', xmlCacheControl)
    return c.body(xml)
})
