const siteUrl = 'https://prop.show'

function escapeXml(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
}

function rssDate(value?: string) {
    if (!value)
        return

    const date = new Date(`${value.replace(' ', 'T')}+08:00`)
    return Number.isNaN(date.getTime()) ? undefined : date.toUTCString()
}

export default defineEventHandler(async (event) => {
    const [news, videos] = await Promise.all([
        queryCollection(event, 'news').order('date', 'DESC').all(),
        queryCollection(event, 'videos').order('order', 'DESC').all(),
    ])

    const items = [
        ...news.map(item => ({ ...item, category: '前端速报', sortOrder: 0 })),
        ...videos.map(item => ({
            ...item,
            title: item.series
                ? `${item.series} EP.${String(item.episode ?? item.order).padStart(2, '0')}：${item.title}`
                : item.title,
            category: item.category,
            sortOrder: item.order ?? 0,
        })),
    ].sort((a, b) => {
        const dateDifference = (Date.parse(b.date || '') || 0) - (Date.parse(a.date || '') || 0)
        return dateDifference || b.sortOrder - a.sortOrder
    })

    const itemXml = items.map((item) => {
        const link = new URL(item.path, siteUrl).toString()
        const publishedAt = rssDate(item.date)

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
    }).join('\n')

    setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
    setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600')

    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>prop.show</title>
    <link>${siteUrl}</link>
    <description>前端开发视频、速报与开发者对谈持续更新。</description>
    <language>zh-CN</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>`
})
