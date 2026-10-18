import assert from 'node:assert/strict'

const base = process.argv[2] || 'http://localhost:4399'
async function read(path) {
    const response = await fetch(`${base}${path}`)
    assert.equal(response.status, 200, path)
    return response.text()
}
const seen = new Set()
for (let page = 1; page <= 3; page++) {
    const path = `/videos${page > 1 ? `?page=${page}` : ''}`
    const html = await read(path)
    assert.ok(html.includes(`rel="canonical" href="https://prop.show${path}"`), `Canonical: ${path}`)
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || ''
    const links = [...new Set([...main.matchAll(/<a\s[^>]*href="(\/videos\/[^"?#]+)"/g)].map(match => match[1]))]
    assert.equal(links.length, page === 3 ? 7 : 10, path)
    for (const link of links) {
        assert.ok(!seen.has(link), `Repeated video: ${link}`)
        seen.add(link)
    }
}
assert.equal(seen.size, 27)
const video = await read('/videos/npm-supply-chain-simple-defense')
assert.match(video, /<meta name="description" content="[^"]+"/)
for (const collection of ['videos', 'news', 'works']) {
    const response = await fetch(`${base}/${collection}/seo-check-missing`)
    assert.equal(response.status, 404)
}
for (const path of ['/', '/about', '/design-assets', '/series/yisi', '/news', '/works']) {
    const html = await read(path)
    assert.match(html, /<h1\b/)
    assert.ok(!/<(?:NuxtLink|Lazy[A-Z])/.test(html))
}
const sitemap = await read('/sitemap.xml')
assert.ok(sitemap.includes('https://prop.show/videos?page=2'))
assert.ok(sitemap.includes('https://prop.show/videos?page=3'))
const rss = await read('/rss.xml')
assert.ok(rss.includes('<rss '))
assert.ok((await read('/robots.txt')).includes('Sitemap: https://prop.show/sitemap.xml'))
const redirect = await fetch(`${base}/videos/page/2`, { redirect: 'manual' })
assert.equal(redirect.status, 301)
assert.equal(redirect.headers.get('location'), '/videos?page=2')
console.log('PASS: live SSR pages, 27 videos across query pagination, canonical, descriptions, 404s, sitemap, RSS, robots and legacy redirect.')
