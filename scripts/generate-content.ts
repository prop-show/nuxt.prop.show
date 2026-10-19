import type { ContentEntry, Creator, News, Video, Work } from '../src/content.ts'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import { renderMarkdown } from '../src/markdown.ts'
import { contentDate } from '../src/utils/content-date.ts'

function record(value: unknown, source: string): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new Error(`${source}: expected a YAML mapping`)
    return value as Record<string, unknown>
}

function text(data: Record<string, unknown>, key: string, source: string, required = false): string | undefined {
    const value = data[key]
    if (value === undefined && !required)
        return undefined
    if (typeof value !== 'string' || (required && !value.trim()))
        throw new Error(`${source}: ${key} must be ${required ? 'a nonempty' : 'a'} string`)
    return value as string
}

function number(data: Record<string, unknown>, key: string, source: string, fallback?: number): number | undefined {
    const value = data[key] ?? fallback
    if (value === undefined)
        return undefined
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0)
        throw new Error(`${source}: ${key} must be a nonnegative integer`)
    return value
}

function tags(data: Record<string, unknown>, source: string): string[] {
    const value = data.tags ?? []
    if (!Array.isArray(value) || value.some(tag => typeof tag !== 'string'))
        throw new Error(`${source}: tags must be an array of strings`)
    return value
}

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
    const data = record(parseYaml(frontmatter), source)
    const markdown = raw.slice(match[0].length).trim()
    const title = text(data, 'title', source, true)!
    const { html, excerpt } = await renderMarkdown(markdown)
    const entry: ContentEntry = {
        ...identity(source),
        title,
        description: text(data, 'description', source)?.trim() || excerpt || title,
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
        let parsed
        try {
            parsed = await document(source, raw)
        }
        catch (error) {
            throw new Error(`${source}: invalid content`, { cause: error })
        }
        const { data, entry, html } = parsed
        if (Object.hasOwn(bodies, entry.path))
            throw new Error(`${source}: duplicate content path ${entry.path}`)
        bodies[entry.path] = html
        if (entry.stem.startsWith('videos/')) {
            const platforms = data.platforms === undefined ? {} : record(data.platforms, source)
            videoEntries.push({
                ...entry,
                category: text(data, 'category', source, true)!,
                date: text(data, 'date', source),
                status: text(data, 'status', source),
                platforms: {
                    bilibili: text(platforms, 'bilibili', source),
                    youtube: text(platforms, 'youtube', source),
                    douyin: text(platforms, 'douyin', source),
                },
                tags: tags(data, source),
                series: text(data, 'series', source),
                episode: number(data, 'episode', source),
                repository: text(data, 'repository', source),
                order: number(data, 'order', source, 0)!,
            })
        }
        else if (entry.stem.startsWith('news/')) {
            newsEntries.push({ ...entry, date: text(data, 'date', source, true)!, source: text(data, 'source', source) })
        }
        else {
            workEntries.push({
                ...entry,
                author: text(data, 'author', source, true)!,
                type: text(data, 'type', source, true)!,
                order: number(data, 'order', source, 0)!,
                tags: tags(data, source),
                website: text(data, 'website', source),
                repository: text(data, 'repository', source),
            })
        }
    }

    const videos: readonly Video[] = videoEntries.sort((a, b) => b.order - a.order)
    const news: readonly News[] = newsEntries.sort((a, b) => (contentDate(b.date)?.getTime() ?? 0) - (contentDate(a.date)?.getTime() ?? 0))
    const works: readonly Work[] = workEntries.sort((a, b) => b.order - a.order)
    const creators: readonly Creator[] = creatorFiles.map(([source, raw]) => {
        let data
        try {
            data = record(parseYaml(raw), source)
        }
        catch (error) {
            throw new Error(`${source}: invalid creator`, { cause: error })
        }
        const { stem, slug } = identity(source)
        return {
            stem,
            slug,
            name: text(data, 'name', source, true)!,
            avatar: text(data, 'avatar', source, true)!,
            href: text(data, 'href', source, true)!,
            role: text(data, 'role', source, true)!,
            order: number(data, 'order', source, 0)!,
        }
    }).sort((a, b) => a.order - b.order)

    return { videos, news, works, creators, bodies }
}
