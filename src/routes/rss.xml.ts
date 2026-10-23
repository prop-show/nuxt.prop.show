import { defineHandler } from 'void'
import { site, xmlCacheControl } from '@/config'
import { contentDate, escapeXml, news, siteUrl, videos } from '@/content'
import { videoLabel } from '@/utils/video'

const items = [
    ...news.map(item => ({ ...item, category: '前端速报', sortOrder: 0 })),
    ...videos.map(item => ({ ...item, title: videoLabel(item), sortOrder: item.order })),
].sort((a, b) => {
    const difference = (contentDate(b.date)?.getTime() ?? 0) - (contentDate(a.date)?.getTime() ?? 0)
    return difference || b.sortOrder - a.sortOrder
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${siteUrl}</link>
    <description>前端开发视频、速报与开发者对谈持续更新。</description>
    <language>${escapeXml(site.locale)}</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items.map((item) => {
    const link = escapeXml(new URL(item.path, siteUrl).href)
    const publishedAt = contentDate(item.date)?.toUTCString()
    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(item.description || item.title)}</description>
      <category>${escapeXml(item.category)}</category>${publishedAt
            ? `
      <pubDate>${publishedAt}</pubDate>`
            : ''}
    </item>`
}).join('\n')}
  </channel>
</rss>`

export const GET = defineHandler((c) => {
    c.header('Content-Type', 'application/rss+xml; charset=utf-8')
    c.header('Cache-Control', xmlCacheControl)
    return c.body(xml)
})
