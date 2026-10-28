import generated from 'virtual:prop-content'
import { contentConfig, site } from './config'

export { contentDate } from './utils/content-date'

export const siteUrl = site.url
export const pageSize = contentConfig.pageSize

/** Metadata only: collections are shipped to the browser through page props, so bodies stay out. */
export interface ContentEntry {
    /** Original source-relative filename, including its numeric prefix. */
    stem: string
    path: string
    slug: string
    title: string
    description: string
}

export interface ContentDocument extends ContentEntry {
    /** Rendered HTML, ready for v-html, with embedded HTML filtered by Comark security. */
    html: string
}

export interface Video extends ContentEntry {
    category: string
    date?: string
    /** 可选封面图；没有时不渲染缩略图，不留空位。 */
    cover?: string
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

const { bodies } = generated
export const videos: readonly Video[] = generated.videos
export const news: readonly News[] = generated.news
export const works: readonly Work[] = generated.works
export const creators: readonly Creator[] = generated.creators

export const collections = { videos, news, works, creators }

export function getContent<K extends 'videos' | 'news' | 'works'>(collection: K, pathOrSlug: string): (typeof collections)[K][number] | undefined {
    const path = pathOrSlug.replace(/\/+$/, '').toLowerCase()
    return collections[collection].find(entry => entry.path === path || entry.slug === path)
}

/** Adds the rendered body; use it on detail pages only, never on archive lists. */
export function renderContent<T extends ContentEntry>(entry: T): T & ContentDocument {
    const html = Object.hasOwn(bodies, entry.path) ? bodies[entry.path] : undefined
    if (html === undefined)
        throw new Error(`${entry.path}: no rendered body; only entries built by document() have one`)
    return { ...entry, html }
}

export function getCreator(slug: string): Creator | undefined {
    return creators.find(creator => creator.slug === slug || creator.stem === slug)
}

export function escapeXml(value: string): string {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll('\'', '&apos;')
}
