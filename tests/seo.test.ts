import type { CloudEnv } from 'void'
import type { Props } from '@/pages/videos/index.server'
import { Hono } from 'hono'
import { describe, expect, it } from 'vitest'
import { renderHeadToString, resolveHead } from 'void/pages'
import { videos } from '@/content'
import { head, loader } from '@/pages/videos/index.server'
import { seoHead } from '@/utils/seo'

const input = {
    title: '视频 · 第 2 页',
    description: '前端开发视频与教程。',
    canonical: 'https://prop.show/videos?tag=Vue&page=2',
}

function graph(descriptor: ReturnType<typeof seoHead>) {
    return JSON.parse(descriptor.script![0]!.innerHTML!)['@graph']
}

describe('seoHead', () => {
    it('preserves page metadata and shares the final title and canonical across social and structured data', () => {
        const descriptor = seoHead(input)
        expect(descriptor.title).toBe(input.title)
        expect(descriptor.link).toEqual([{ rel: 'canonical', href: input.canonical }])
        expect(descriptor.meta).toEqual(expect.arrayContaining([
            { name: 'description', content: input.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'prop.show' },
            { property: 'og:locale', content: 'zh_CN' },
            { property: 'og:title', content: `${input.title} | prop.show` },
            { property: 'og:description', content: input.description },
            { property: 'og:url', content: input.canonical },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: `${input.title} | prop.show` },
            { name: 'twitter:description', content: input.description },
        ]))
        expect(graph(descriptor)).toEqual([
            { '@type': 'WebSite', '@id': 'https://prop.show/#website', 'url': 'https://prop.show/', 'name': 'prop.show', 'inLanguage': 'zh-CN' },
            {
                '@type': 'WebPage',
                '@id': `${input.canonical}#webpage`,
                'url': input.canonical,
                'name': `${input.title} | prop.show`,
                'description': input.description,
                'inLanguage': 'zh-CN',
                'isPartOf': { '@id': 'https://prop.show/#website' },
            },
        ])
    })

    it('keeps JSON-LD inside one script and round-trips untrusted text through the Void renderer', () => {
        const text = '</ScRiPt><script>alert("x")</script><!-- & > \\ 中文\u2028\u2029'
        const descriptor = seoHead({ ...input, title: text, description: text })
        const html = renderHeadToString(descriptor)
        expect(html.match(/<script\b/g)).toHaveLength(1)
        expect(html.match(/<\/script>/g)).toHaveLength(1)
        const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]!
        expect(json).not.toContain('<')
        expect(json).toContain('\\u003c')
        expect(JSON.parse(json)['@context']).toBe('https://schema.org')
        expect(JSON.parse(json)['@graph'][1]).toMatchObject({ name: `${text} | prop.show`, description: text })
    })

    it('inherits default robots and replaces them when noindex is requested', () => {
        const config = { titleTemplate: '%s | prop.show', meta: [{ name: 'robots', content: 'index, follow, max-image-preview:large' }] }
        const normal = resolveHead(config, undefined, seoHead(input))!
        expect(normal.title).toBe(`${input.title} | prop.show`)
        expect(normal.meta!.filter(meta => meta.name === 'robots')).toEqual(config.meta)
        const empty = resolveHead(config, undefined, seoHead({ ...input, noindex: true }))!
        expect(empty.meta!.filter(meta => meta.name === 'robots')).toEqual([{ name: 'robots', content: 'noindex, follow' }])
    })
})

describe('video archive SEO', () => {
    const app = new Hono<CloudEnv>()
    app.get('/videos', async c => c.json(head(c, await loader(c) as Props)))

    it('noindexes empty filters while retaining their canonical', async () => {
        const response = await app.request('/videos?tag=seo-missing-tag&ignored=value&page=99')
        const descriptor = await response.json()
        expect(descriptor.meta).toContainEqual({ name: 'robots', content: 'noindex, follow' })
        expect(descriptor.link).toEqual([{ rel: 'canonical', href: 'https://prop.show/videos?tag=seo-missing-tag' }])
        expect(descriptor.title).toBe('视频')
    })

    it('keeps populated filters and the unfiltered archive indexable', async () => {
        for (const query of ['', `?category=${encodeURIComponent(videos[0]!.category)}`]) {
            const descriptor = await (await app.request(`/videos${query}`)).json()
            expect(descriptor.meta.some((meta: { name?: string }) => meta.name === 'robots')).toBe(false)
        }
    })
})
