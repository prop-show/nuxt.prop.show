import type { ContentEntry, Creator, News, Video, Work } from '../src/content.ts'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { z } from 'zod'
import { renderMarkdown } from '../src/markdown.ts'
import { contentDate } from '../src/utils/content-date.ts'

const requiredText = z.string().refine(value => value.trim().length > 0, 'Must be a nonempty string')
const orderSchema = z.number().int().nonnegative().nullish().transform(value => value ?? 0)
const tagsSchema = z.array(z.string()).nullish().transform(value => value ?? [])
const documentSchema = z.object({
    title: requiredText,
    description: z.string().optional(),
})
const videoSchema = z.object({
    category: requiredText,
    date: z.string().optional(),
    /** 可选封面图，放在 public/ 下，例如 /media/videos/27-cover.jpg。 */
    cover: z.string().optional(),
    status: z.string().optional(),
    platforms: z.object({
        bilibili: z.string().optional(),
        youtube: z.string().optional(),
        douyin: z.string().optional(),
    }).default({}),
    tags: tagsSchema,
    series: z.string().min(1).optional(),
    episode: z.number().int().nonnegative().nullish().transform(value => value ?? undefined),
    repository: z.url().optional(),
    order: orderSchema,
})
const newsSchema = z.object({
    date: requiredText,
    source: z.url().optional(),
})
const workSchema = z.object({
    author: requiredText,
    type: requiredText,
    order: orderSchema,
    tags: tagsSchema,
    website: z.url().optional(),
    repository: z.url().optional(),
})
const creatorSchema = z.object({
    name: requiredText,
    avatar: requiredText,
    href: requiredText,
    role: requiredText,
    order: orderSchema,
})

function identity(source: string) {
    const stem = source.replace(/\.(md|ya?ml)$/, '')
    // Nuxt removes dotted ordering prefixes, but keeps e.g. 04-react-... intact.
    const path = `/${stem.split('/').map(part => part.replace(/^\d+\./, '').replace(/^index$/, '').toLowerCase()).filter(Boolean).join('/')}`
    return { stem, path, slug: path.split('/').at(-1)! }
}

async function document(source: string, raw: string) {
    const match = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw)
    if (!match)
        throw new Error(`${source}: missing YAML frontmatter`)
    // Nuxt accepted the existing unquoted @nestjs title; YAML reserves @.
    const frontmatter = match[1]!.replace(/^(\s*[\w-]+:\s+)(@[^\r\n]*)$/gm, (_, key: string, value: string) => `${key}${JSON.stringify(value)}`)
    const data: unknown = parseYaml(frontmatter)
    const markdown = raw.slice(match[0].length).trim()
    const { title, description } = documentSchema.parse(data)
    const { html, excerpt } = await renderMarkdown(markdown)
    const entry: ContentEntry = {
        ...identity(source),
        title,
        description: description?.trim() || excerpt || title,
    }
    return { data, entry, html }
}

async function sources(root: string, collection: string, extension: RegExp) {
    const directory = join(root, 'content', collection)
    const files = (await readdir(directory, { recursive: true })).filter(file => extension.test(file)).sort()
    return Promise.all(files.map(async file => [
        `${collection}/${file.replaceAll('\\', '/')}`,
        await readFile(join(directory, file), 'utf8'),
    ] as const))
}

export async function generateContent(root = fileURLToPath(new URL('../', import.meta.url))) {
    const markdownFiles = (await Promise.all(['videos', 'news', 'works'].map(name => sources(root, name, /\.md$/)))).flat()
    const creatorFiles = await sources(root, 'creators', /\.ya?ml$/)
    const bodies: Record<string, string> = Object.create(null)
    const videoEntries: Video[] = []
    const newsEntries: News[] = []
    const workEntries: Work[] = []
    for (const [source, raw] of markdownFiles) {
        try {
            const { data, entry, html } = await document(source, raw)
            if (Object.hasOwn(bodies, entry.path))
                throw new Error(`duplicate content path ${entry.path}`)
            bodies[entry.path] = html
            if (entry.stem.startsWith('videos/'))
                videoEntries.push({ ...entry, ...videoSchema.parse(data) })
            else if (entry.stem.startsWith('news/'))
                newsEntries.push({ ...entry, ...newsSchema.parse(data) })
            else
                workEntries.push({ ...entry, ...workSchema.parse(data) })
        }
        catch (error) {
            throw new Error(`${source}: invalid content: ${error instanceof Error ? error.message : String(error)}`, { cause: error })
        }
    }

    const videos: readonly Video[] = videoEntries.sort((a, b) => b.order - a.order)
    const news: readonly News[] = newsEntries.sort((a, b) => (contentDate(b.date)?.getTime() ?? 0) - (contentDate(a.date)?.getTime() ?? 0))
    const works: readonly Work[] = workEntries.sort((a, b) => b.order - a.order)
    const creators: readonly Creator[] = creatorFiles.map(([source, raw]) => {
        try {
            const data = creatorSchema.parse(parseYaml(raw))
            const { stem, slug } = identity(source)
            return { stem, slug, ...data }
        }
        catch (error) {
            throw new Error(`${source}: invalid creator: ${error instanceof Error ? error.message : String(error)}`, { cause: error })
        }
    }).sort((a, b) => a.order - b.order)

    return { videos, news, works, creators, bodies }
}
