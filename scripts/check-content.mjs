// Run: node scripts/check-content.mjs /path/to/isolated-dependencies
// The directory needs vite, void, hono, comark, @comark/html and yaml installed.
import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const dependencies = resolve(process.argv[2] || root)
const require = createRequire(join(dependencies, 'package.json'))
const { build } = await import(pathToFileURL(require.resolve('vite')))
const { Hono } = await import(pathToFileURL(require.resolve('hono')))
const cache = join(root, 'node_modules/.cache')
await mkdir(cache, { recursive: true })
const output = await mkdtemp(join(cache, 'prop-content-check-'))
await build({
    root,
    configFile: false,
    resolve: {
        alias: [
            { find: '@', replacement: join(root, 'src') },
            ...['comark', '@comark/html', 'yaml'].map(name => ({ find: new RegExp(`^${name}$`), replacement: require.resolve(name) })),
        ],
    },
    build: {
        ssr: true,
        outDir: output,
        rollupOptions: {
            input: {
                content: join(root, 'src/content.ts'),
                markdown: join(root, 'src/markdown.ts'),
                rss: join(root, 'src/routes/rss.xml.ts'),
                robots: join(root, 'src/routes/robots.txt.ts'),
                sitemap: join(root, 'src/routes/sitemap.xml.ts'),
            },
            external: ['void'],
            output: { entryFileNames: '[name].mjs' },
        },
    },
    ssr: { noExternal: ['comark', '@comark/html', 'yaml'] },
})
const { renderMarkdown } = await import(pathToFileURL(join(output, 'markdown.mjs')))
const sample = await renderMarkdown('## 标题\n\n中文 **重点** 与 `代码` https://example.com\n\n<script>alert(1)</script>\n\n```html\n<img src=x onerror=alert(1)>\n```')
assert.equal(sample.excerpt, '中文 重点 与 代码 https://example.com')
assert.match(sample.html, /<strong>重点<\/strong>/)
assert.match(sample.html, /href="https:\/\/example.com"/)
assert.ok(!sample.html.includes('<script>'))
assert.ok(!sample.html.includes('<img src=x'))
assert.ok(sample.html.includes('&lt;img src=x onerror=alert(1)&gt;'))
const embedded = await renderMarkdown('<a href="https://example.com"><img src="https://example.com/badge.png" alt="badge" style="width: 200px" onerror="alert(1)"></a>\n\n<a href="javascript:alert(1)">unsafe</a>\n\n<iframe src="https://example.com"></iframe>')
assert.match(embedded.html, /<a href="https:\/\/example.com"><img/)
assert.ok(embedded.html.includes('src="https://example.com/badge.png"'))
assert.ok(!embedded.html.includes('onerror'))
assert.ok(!embedded.html.includes('javascript:'))
assert.ok(!embedded.html.includes('<iframe'))
const content = await import(pathToFileURL(join(output, 'content.mjs')))
const { videos, news, works, creators, getContent, getCreator, contentDate, escapeXml } = content
for (const name of ['videos', 'news', 'works', 'creators']) {
    const files = await readdir(join(root, 'content', name))
    assert.equal(content[name].length, files.length, `${name}: every source is bundled`)
}
const pages = [...videos, ...news, ...works]
assert.equal(new Set(pages.map(item => item.path)).size, pages.length)
for (const item of pages) {
    const expected = `/${item.stem.split('/').map(part => part.replace(/^\d+\./, '').toLowerCase()).join('/')}`
    assert.equal(item.path, expected)
    assert.ok(item.description.trim())
    assert.equal(item.body, item.html)
    assert.ok(!item.markdown || item.html.includes('<'))
    assert.ok(!item.markdown.startsWith('---'))
    assert.equal(getContent(item.stem.split('/')[0], `${item.path}/`), item)
}
assert.ok(videos.every((item, index) => !index || videos[index - 1].order >= item.order))
assert.ok(news.every((item, index) => !index || contentDate(news[index - 1].date) >= contentDate(item.date)))
assert.ok(creators.every((item, index) => !index || creators[index - 1].order <= item.order))
const kasita = getContent('works', 'kasitaenv')
assert.equal(kasita.path, '/works/kasitaenv')
assert.match(kasita.html, /<a href="https:\/\/kermanx.github.io\/reactive-vscode\/"[^>]*><img/)
assert.match(kasita.html, /<img[^>]*alt="kasita-env-example"[^>]*src="https:\/\/raw.githubusercontent.com\//)
assert.ok(!kasita.html.includes('&lt;img'))
assert.ok(!kasita.html.includes('&lt;a href='))
assert.ok(getContent('news', '04-react-server-component-bug'))
assert.equal(getContent('news', 'missing'), undefined)
assert.equal(getCreator('wei').stem, 'creators/wei')
assert.equal(contentDate('2026-07-11 09:00').toISOString(), '2026-07-11T01:00:00.000Z')
assert.equal(contentDate('2026-07-11T01:00:00Z').toISOString(), '2026-07-11T01:00:00.000Z')
assert.equal(contentDate('invalid'), undefined)
assert.equal(escapeXml('<&>"\''), '&lt;&amp;&gt;&quot;&apos;')
const note = getContent('videos', 'npm-supply-chain-simple-defense')
assert.match(note.html, /<aside class="content-note">\s*<p>注意：/)
assert.match(note.html, /<pre[^>]*><code class="language-yaml">minimumReleaseAge: 10080/)
const ending = getContent('videos', 'ys-23-the-end')
assert.match(ending.html, /<blockquote class="content-poetry">/)
assert.match(ending.html, /<aside class="content-alert">/)
assert.ok(!ending.html.includes('::poetry'))
assert.ok(!news[0].description.includes('**'))

const app = new Hono()
for (const name of ['rss', 'robots', 'sitemap']) {
    const { GET } = await import(pathToFileURL(join(output, `${name}.mjs`)))
    app.get(`/${name === 'robots' ? 'robots.txt' : `${name}.xml`}`, GET)
}
for (const [path, type] of [['rss.xml', 'application/rss+xml'], ['robots.txt', 'text/plain'], ['sitemap.xml', 'application/xml']]) {
    const response = await app.request(`https://prop.show/${path}`)
    assert.equal(response.status, 200)
    assert.ok(response.headers.get('content-type').startsWith(type))
    assert.equal(response.headers.get('cache-control'), 'public, max-age=0, s-maxage=3600')
    const body = await response.text()
    if (path === 'rss.xml') {
        assert.equal((body.match(/<item>/g) || []).length, videos.length + news.length)
        assert.ok(body.includes('乙巳 EP.'))
        assert.ok(!body.includes('xml-stylesheet'))
        assert.ok(!body.includes('Invalid Date'))
        await import('node:fs/promises').then(fs => fs.writeFile(join(output, 'rss.xml'), body))
    }
    if (path === 'sitemap.xml') {
        for (const item of pages)
            assert.ok(body.includes(`<loc>https://prop.show${item.path}</loc>`))
        assert.ok(body.includes('/videos?page=2'))
        assert.ok(body.includes('/videos?page=3'))
        assert.ok(!body.includes('/videos/page/'))
        await import('node:fs/promises').then(fs => fs.writeFile(join(output, 'sitemap.xml'), body))
    }
    if (path === 'robots.txt')
        assert.ok(body.includes('Sitemap: https://prop.show/sitemap.xml'))
}
const bundled = await readFile(join(output, 'content.mjs'), 'utf8')
assert.ok(!bundled.includes('import.meta.glob'))
assert.ok(!bundled.includes('node:fs'))
console.log(`PASS: ${videos.length} videos, ${news.length} news, ${works.length} works, ${creators.length} creators; paths, HTML/MDC, fallback descriptions, dates, and all three Hono endpoints.`)
await rm(output, { recursive: true })
