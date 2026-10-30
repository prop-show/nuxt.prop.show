import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { generateContent } from '../scripts/generate-content'

let root: string
const article = '---\ntitle: Example\ncategory: Test\n---\nHello **world**.'

beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), 'prop-content-'))
    for (const collection of ['videos', 'news', 'works', 'creators'])
        await mkdir(join(root, 'content', collection), { recursive: true })
})

afterEach(async () => {
    await rm(root, { recursive: true, force: true })
})

describe('content generation', () => {
    it('compiles metadata and bodies after additions, edits and deletions', async () => {
        const file = join(root, 'content/videos/01.example.md')
        await writeFile(file, article)
        const initial = await generateContent(root)
        expect(initial.videos[0]).toMatchObject({ path: '/videos/example', description: 'Hello world.' })
        expect(initial.videos[0]).not.toHaveProperty('html')
        expect(initial.bodies['/videos/example']).toContain('<strong>world</strong>')

        await writeFile(file, article.replace('world', 'readers'))
        expect((await generateContent(root)).bodies['/videos/example']).toContain('<strong>readers</strong>')
        await rm(file)
        expect(await generateContent(root)).toMatchObject({ videos: [], bodies: {} })
    })

    it('rejects invalid fields and recovers after they are fixed', async () => {
        const file = join(root, 'content/videos/example.md')
        await writeFile(file, article)
        await generateContent(root)
        await writeFile(file, article.replace('category: Test', 'category: 42'))
        await expect(generateContent(root)).rejects.toThrow(/videos\/example\.md: invalid content:[\s\S]*category/)
        await writeFile(file, article)
        expect((await generateContent(root)).videos).toHaveLength(1)
    })

    it.each([
        ['videos', 'category: Test\nepisode: -1', 'episode'],
        ['videos', 'category: Test\nplatforms:\n  youtube: 42', 'youtube'],
        ['videos', 'category: Test\ntags: [42]', 'tags'],
        ['videos', 'category: Test\nseries: ""', 'series'],
        ['videos', 'category: Test\nrepository: invalid', 'repository'],
        ['news', 'date: 2026-10-20\nsource: invalid', 'source'],
        ['news', 'date: 2026-10-20\nkind: 专题', 'kind'],
        ['works', 'author: Example\ntype: Tool\nwebsite: invalid', 'website'],
    ])('rejects invalid %s metadata (%s)', async (collection, fields, field) => {
        await writeFile(join(root, `content/${collection}/example.md`), `---\ntitle: Example\n${fields}\n---\nHello.`)
        await expect(generateContent(root)).rejects.toThrow(new RegExp(`${collection}/example\\.md: invalid content:[\\s\\S]*${field}`))
    })

    it('preserves metadata defaults and description fallbacks', async () => {
        await writeFile(join(root, 'content/videos/example.md'), article.replace('category: Test', 'category: Test\norder: null\ntags: null'))
        await writeFile(join(root, 'content/works/example.md'), '---\ntitle: Work\nauthor: Example\ntype: Tool\ndescription: "  "\n---\n')
        await writeFile(join(root, 'content/creators/example.yml'), 'name: Example\navatar: /avatar.png\nhref: /about\nrole: Author\n')
        await writeFile(join(root, 'content/news/example.md'), '---\ntitle: Example\ndate: 2026-10-20\nkind: 周报\n---\nHello.')
        const content = await generateContent(root)
        expect(content.videos[0]).toMatchObject({ order: 0, tags: [], platforms: {}, description: 'Hello world.' })
        expect(content.news[0]).toMatchObject({ kind: '周报' })
        expect(content.works[0]).toMatchObject({ order: 0, tags: [], description: 'Work' })
        expect(content.creators[0]).toMatchObject({ slug: 'example', order: 0 })
    })

    it('includes the source path and field in creator validation errors', async () => {
        await writeFile(join(root, 'content/creators/example.yml'), 'name: Example\navatar: /avatar.png\nhref: /about\nrole: Author\norder: -1\n')
        await expect(generateContent(root)).rejects.toThrow(/creators\/example\.yml: invalid creator:[\s\S]*order/)
    })

    it('includes the source path in YAML errors and rejects normalized path collisions', async () => {
        await writeFile(join(root, 'content/videos/example.md'), '---\ntitle: [\n---\n')
        await expect(generateContent(root)).rejects.toThrow('videos/example.md: invalid content')
        await writeFile(join(root, 'content/videos/example.md'), article)
        await writeFile(join(root, 'content/videos/01.example.md'), article)
        await expect(generateContent(root)).rejects.toThrow('duplicate content path /videos/example')
    })
})
