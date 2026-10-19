import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { collections, contentDate, creators, escapeXml, getContent, getCreator, news, renderContent, videos, works } from '@/content'

const root = new URL('..', import.meta.url).pathname
const pages = [...videos, ...news, ...works]

describe('content index', () => {
    it('bundles every source file', async () => {
        for (const name of ['videos', 'news', 'works', 'creators']) {
            const files = await readdir(join(root, 'content', name))
            expect(collections[name as keyof typeof collections]).toHaveLength(files.length)
        }
    })

    it('derives a unique lowercased path from the source filename', () => {
        expect(new Set(pages.map(item => item.path)).size).toBe(pages.length)
        for (const item of pages) {
            const expected = `/${item.stem.split('/').map(part => part.replace(/^\d+\./, '').toLowerCase()).join('/')}`
            expect(item.path).toBe(expected)
            expect(item.description.trim()).toBeTruthy()
            // Collections stay metadata-only so list pages never ship article bodies.
            expect(item).not.toHaveProperty('html')
            expect(item).not.toHaveProperty('markdown')
        }
    })

    it('renders a body only for entries whose source has one', async () => {
        for (const item of pages) {
            const source = await readFile(join(root, 'content', `${item.stem}.md`), 'utf8')
            const body = source.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '').trim()
            expect(renderContent(item).html !== '').toBe(body !== '')
            expect(getContent(item.stem.split('/')[0] as 'videos' | 'news' | 'works', `${item.path}/`)).toBe(item)
        }
        expect(() => renderContent({ ...pages[0]!, path: '/not-bundled' })).toThrow(/no rendered body/)
    })

    it('sorts collections for display', () => {
        expect(videos.every((item, index) => !index || videos[index - 1]!.order >= item.order)).toBe(true)
        expect(news.every((item, index) => !index || contentDate(news[index - 1]!.date)! >= contentDate(item.date)!)).toBe(true)
        expect(creators.every((item, index) => !index || creators[index - 1]!.order <= item.order)).toBe(true)
    })

    it('looks up entries by slug or stem', () => {
        expect(getContent('news', '04-react-server-component-bug')).toBeTruthy()
        expect(getContent('news', 'missing')).toBeUndefined()
        expect(getCreator('wei')?.stem).toBe('creators/wei')
    })
})

describe('contentDate', () => {
    it('treats timezone-less dates as China Standard Time', () => {
        expect(contentDate('2026-07-11 09:00')!.toISOString()).toBe('2026-07-11T01:00:00.000Z')
        expect(contentDate('2026-07-11T01:00:00Z')!.toISOString()).toBe('2026-07-11T01:00:00.000Z')
        expect(contentDate('invalid')).toBeUndefined()
    })
})

describe('rendered content', () => {
    it('keeps embedded badges in a work body', () => {
        const kasita = renderContent(getContent('works', 'kasitaenv')!)
        expect(kasita.path).toBe('/works/kasitaenv')
        expect(kasita.html).toMatch(/<a href="https:\/\/kermanx.github.io\/reactive-vscode\/"[^>]*><img/)
        expect(kasita.html).toMatch(/<img[^>]*alt="kasita-env-example"[^>]*src="https:\/\/raw.githubusercontent.com\//)
        expect(kasita.html).not.toContain('&lt;img')
        expect(kasita.html).not.toContain('&lt;a href=')
    })

    it('renders note, poetry and alert blocks', () => {
        const note = renderContent(getContent('videos', 'npm-supply-chain-simple-defense')!)
        expect(note.html).toMatch(/<aside class="content-note">\s*<p>注意：/)
        expect(note.html).toMatch(/<pre[^>]*class="[^"]*shiki[^"]*"[^>]*><code class="language-yaml">/)
        const ending = renderContent(getContent('videos', 'ys-23-the-end')!)
        expect(ending.html).toMatch(/<blockquote class="content-poetry">/)
        expect(ending.html).toMatch(/<aside class="content-alert">/)
        expect(ending.html).not.toContain('::poetry')
    })

    it('uses the first paragraph as a fallback description', () => {
        expect(news[0]!.description).not.toContain('**')
    })
})

describe('escapeXml', () => {
    it('escapes the XML special characters', () => {
        expect(escapeXml('<&>"\'')).toBe('&lt;&amp;&gt;&quot;&apos;')
    })
})
