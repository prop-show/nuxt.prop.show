/// <reference types="vite/client" />
import { parse as parseYaml } from 'yaml'
import { renderMarkdown } from '@/markdown'

export const siteUrl = 'https://prop.show'
export const pageSize = 10

export interface ContentEntry {
    /** Original source-relative filename, including its numeric prefix. */
    stem: string
    path: string
    slug: string
    title: string
    description: string
    /** Rendered HTML, ready for v-html, with embedded HTML filtered by Comark security. */
    body: string
    html: string
    markdown: string
}

export interface Video extends ContentEntry {
    category: string
    date?: string
    status?: string
    platforms: { bilibili?: string, youtube?: string, douyin?: string }
    tags: string[]
    series?: string
    episode?: number
    repository?: string
    order: number
}

export interface News extends ContentEntry {
    date: string
    source?: string
}

export interface Work extends ContentEntry {
    author: string
    type: string
    order: number
    tags: string[]
    website?: string
    repository?: string
}

export interface Creator {
    stem: string
    slug: string
    name: string
    avatar: string
    href: string
    role: string
    order: number
}

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
    const stem = source.replace(/^\.\.\/content\//, '').replace(/\.(md|ya?ml)$/, '')
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
        markdown,
        body: html,
        html,
    }
    return { data, entry }
}

// Vite embeds source text in the build; no filesystem or Nuxt Content at runtime.
const markdownFiles = import.meta.glob<string>('../content/{videos,news,works}/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
})
const creatorFiles = import.meta.glob<string>('../content/creators/**/*.{yml,yaml}', {
    eager: true,
    query: '?raw',
    import: 'default',
})

const videoEntries: Video[] = []
const newsEntries: News[] = []
const workEntries: Work[] = []
for (const [source, raw] of Object.entries(markdownFiles)) {
    // Comark parsing must finish before exporting the server's content collections.
    // eslint-disable-next-line antfu/no-top-level-await
    const { data, entry } = await document(source, raw)
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

/** Content dates without a timezone are published in China Standard Time. */
export function contentDate(value?: string): Date | undefined {
    if (!value)
        return undefined
    const normalized = value.trim().replace(' ', 'T')
    const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
        ? `${normalized}T00:00:00+08:00`
        : /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized) ? normalized : `${normalized}+08:00`
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime()) ? undefined : date
}

export const videos: readonly Video[] = videoEntries.sort((a, b) => b.order - a.order)
export const news: readonly News[] = newsEntries.sort((a, b) => (contentDate(b.date)?.getTime() ?? 0) - (contentDate(a.date)?.getTime() ?? 0))
export const works: readonly Work[] = workEntries.sort((a, b) => b.order - a.order)
export const creators: readonly Creator[] = Object.entries(creatorFiles).map(([source, raw]) => {
    const data = record(parseYaml(raw), source)
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

export const collections = { videos, news, works, creators }

export function getContent<K extends 'videos' | 'news' | 'works'>(collection: K, pathOrSlug: string): (typeof collections)[K][number] | undefined {
    const path = pathOrSlug.replace(/\/+$/, '').toLowerCase()
    return collections[collection].find(entry => entry.path === path || entry.slug === path)
}

export function getCreator(slug: string): Creator | undefined {
    return creators.find(creator => creator.slug === slug || creator.stem === slug)
}

export function escapeXml(value: string): string {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll('\'', '&apos;')
}
