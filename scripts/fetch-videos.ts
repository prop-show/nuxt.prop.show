import { createHash } from 'node:crypto'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { fetch, ProxyAgent } from 'undici'

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

const OUTPUT_DIR = '.video-list'
const BILIBILI_MID = '104376935'
const YOUTUBE_HANDLE = 'PropShowFM'
const MAX_VIDEOS = 10
const MAX_CONTINUATION = 10

const MIXIN_KEY_ENC_TAB = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52]

interface RawVideo {
    videoId?: string
    title: string
    url: string
    publishedAt: string
    description: string
}

interface SourceVideo extends RawVideo {
    source: 'bilibili' | 'youtube'
}

const dispatcher = (() => {
    const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy
    return proxy ? new ProxyAgent(proxy) : undefined
})()

const cookies = new Map<string, string>()

function collectCookies(res: Response): void {
    const setCookies = (res.headers as { getSetCookie?: () => string[] }).getSetCookie?.() ?? []
    for (const header of setCookies) {
        const match = header.match(/^([^=;]+)=([^;]*)/)
        if (match)
            cookies.set(match[1], match[2])
    }
}

function cookieHeader(): string {
    return [...cookies.entries()].map(([key, value]) => `${key}=${value}`).join('; ')
}

async function sleep(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms))
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 6): Promise<T> {
    let lastError: unknown
    for (let attempt = 0; attempt < attempts; attempt++) {
        try {
            return await fn()
        }
        catch (error) {
            lastError = error
            if (attempt < attempts - 1)
                await sleep(2000 * 2 ** attempt + Math.random() * 1000)
        }
    }
    throw lastError
}

async function httpGet(url: string, headers: Record<string, string> = {}): Promise<string> {
    const res = await fetch(url, {
        headers: {
            'User-Agent': USER_AGENT,
            ...(cookieHeader() ? { Cookie: cookieHeader() } : {}),
            ...headers,
        },
        dispatcher,
        signal: AbortSignal.timeout(30_000),
    })
    collectCookies(res)
    if (!res.ok)
        throw new Error(`GET ${url.slice(0, 120)} -> HTTP ${res.status}`)
    return await res.text()
}

async function httpPostJson(url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': USER_AGENT,
            ...(cookieHeader() ? { Cookie: cookieHeader() } : {}),
        },
        body: JSON.stringify(body),
        dispatcher,
        signal: AbortSignal.timeout(30_000),
    })
    collectCookies(res)
    if (!res.ok)
        throw new Error(`POST ${url.slice(0, 120)} -> HTTP ${res.status}`)
    return await res.json() as Record<string, unknown>
}

function asObject(value: unknown): Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value))
        return {}
    return value as Record<string, unknown>
}

function asArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : []
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value : ''
}

function asNumber(value: unknown): number {
    return typeof value === 'number' ? value : Number(asString(value)) || 0
}

function videoFromRenderer(content: unknown): RawVideo | undefined {
    const obj = asObject(content)
    const legacy = asObject(obj.videoRenderer)
    const lockup = asObject(obj.lockupViewModel)
    const lockupMeta = asObject(asObject(lockup.metadata).lockupMetadataViewModel)
    const videoId = asString(legacy.videoId) || asString(lockup.contentId)
    const title = asArray(legacy.title)
        .map(run => asString(asObject(run).text))
        .join('')
        || asString(asObject(legacy.title).simpleText)
        || asString(asObject(lockupMeta.title).content)
    if (!videoId || !title)
        return undefined
    const contentType = asString(lockup.contentType)
    if (contentType && contentType !== 'LOCKUP_CONTENT_TYPE_VIDEO')
        return undefined
    return {
        videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: '',
        description: '',
    }
}

function extractFromTabs(data: Record<string, unknown>): { videos: RawVideo[], continuation?: string } {
    const videos: RawVideo[] = []
    let continuation: string | undefined
    const tabs = asArray(asObject(asObject(data).contents).twoColumnBrowseResultsRenderer?.tabs)
    for (const tab of tabs) {
        const content = asObject(asObject(tab).tabRenderer).content
        const richGrid = asObject(content).richGridRenderer
        if (richGrid) {
            for (const item of asArray(richGrid.contents)) {
                const video = videoFromRenderer(asObject(asObject(item).richItemRenderer).content)
                if (video)
                    videos.push(video)
                const token = asObject(asObject(asObject(item).continuationItemRenderer).continuationEndpoint?.continuationCommand).token
                if (token)
                    continuation = asString(token)
            }
        }
        const sectionList = asObject(content).sectionListRenderer
        if (sectionList) {
            const grid = asObject(asObject(asObject(asArray(sectionList.contents)[0]).itemSectionRenderer).contents?.[0]).gridRenderer
            if (grid) {
                for (const item of asArray(grid.items)) {
                    const video = videoFromRenderer(asObject(asObject(item).gridVideoRenderer))
                    if (video)
                        videos.push(video)
                }
                const token = asObject(asArray(grid.continuations)[0]).nextContinuationData?.continuation
                if (token)
                    continuation = asString(token)
            }
        }
    }
    return { videos, continuation }
}

function extractFromContinuation(data: Record<string, unknown>): { videos: RawVideo[], continuation?: string } {
    const videos: RawVideo[] = []
    let continuation: string | undefined
    const items = asArray(asObject(asObject(asArray(asObject(data).onResponseReceivedActions)[0]).appendContinuationItemsAction).continuationItems)
    for (const item of items) {
        const video = videoFromRenderer(asObject(asObject(item).richItemRenderer).content)
        if (video)
            videos.push(video)
        const token = asObject(asObject(asObject(item).continuationItemRenderer).continuationEndpoint?.continuationCommand).token
        if (token)
            continuation = asString(token)
    }
    return { videos, continuation }
}

function matchBalanced(text: string, open: number): string {
    let depth = 0
    let inString = false
    let escaped = false
    for (let i = open; i < text.length; i++) {
        const ch = text[i]
        if (inString) {
            if (escaped)
                escaped = false
            else if (ch === '\\')
                escaped = true
            else if (ch === '"')
                inString = false
        }
        else if (ch === '"') {
            inString = true
        }
        else if (ch === '{') {
            depth++
        }
        else if (ch === '}') {
            depth--
            if (depth === 0)
                return text.slice(open, i + 1)
        }
    }
    return text.slice(open)
}

function extractInitialData(page: string): Record<string, unknown> | undefined {
    const markers = ['var ytInitialData =', 'ytInitialData =']
    for (const marker of markers) {
        let index = page.indexOf(marker)
        while (index !== -1) {
            const open = page.indexOf('{', index + marker.length)
            if (open !== -1) {
                try {
                    return JSON.parse(matchBalanced(page, open)) as Record<string, unknown>
                }
                catch {}
            }
            index = page.indexOf(marker, index + 1)
        }
    }
    return undefined
}

function extractInnerTube(page: string): { apiKey: string, clientVersion: string } {
    const apiKey = page.match(/"INNERTUBE_API_KEY"\s*:\s*"([^"]+)"/)?.[1] ?? ''
    const clientVersion = page.match(/"INNERTUBE_CLIENT_VERSION"\s*:\s*"([^"]+)"/)?.[1] ?? ''
    return { apiKey, clientVersion }
}

function extractChannelId(page: string): string {
    return page.match(/channel_id=([\w-]{10,})/)?.[1]
        ?? page.match(/"externalId"\s*:\s*"([^"]+)"/)?.[1]
        ?? page.match(/"browseId"\s*:\s*"(UC[\w-]{10,})"/)?.[1]
        ?? ''
}

function unescapeXml(value: string): string {
    return value
        .trim()
        .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'')
}

async function fetchYouTubeRss(channelId: string): Promise<RawVideo[]> {
    const xml = await httpGet(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    return entries.map((match) => {
        const entry = match[1]
        const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? ''
        const title = unescapeXml(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '')
        const href = entry.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/)?.[1] ?? ''
        const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? ''
        const description = unescapeXml(entry.match(/<media:description[^>]*>([\s\S]*?)<\/media:description>/)?.[1] ?? '')
        return {
            videoId,
            title,
            url: href || `https://www.youtube.com/watch?v=${videoId}`,
            publishedAt: published.slice(0, 10),
            description,
        }
    }).filter(video => video.videoId && video.title)
}

async function fetchYouTubeVideos(handle: string): Promise<RawVideo[]> {
    const page = await httpGet(`https://www.youtube.com/@${handle}/videos`, {
        Cookie: 'CONSENT=YES+cb; SOCS=CAI',
    })

    const { apiKey, clientVersion } = extractInnerTube(page)
    const channelId = extractChannelId(page)
    const rssByVideoId = new Map<string, RawVideo>()
    if (channelId) {
        try {
            for (const video of await fetchYouTubeRss(channelId))
                rssByVideoId.set(video.videoId ?? '', video)
        }
        catch {}
    }

    let videos: RawVideo[] = []
    const initialData = extractInitialData(page)
    if (initialData) {
        const first = extractFromTabs(initialData)
        videos = first.videos
        if (apiKey && clientVersion) {
            let continuation = first.continuation
            let round = 0
            while (continuation && round < MAX_CONTINUATION && videos.length < MAX_VIDEOS) {
                const response = await httpPostJson(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`, {
                    context: { client: { clientName: 'WEB', clientVersion } },
                    continuation,
                })
                const next = extractFromContinuation(response)
                videos.push(...next.videos)
                continuation = next.continuation
                round++
            }
        }
    }
    else if (rssByVideoId.size > 0) {
        videos = [...rssByVideoId.values()]
    }
    else {
        throw new Error('cannot parse youtube page (ytInitialData missing)')
    }

    const seen = new Set<string>()
    return videos.filter((video) => {
        if (!video.videoId || seen.has(video.videoId))
            return false
        seen.add(video.videoId)
        const rss = rssByVideoId.get(video.videoId)
        if (rss) {
            video.publishedAt = rss.publishedAt
            video.description = rss.description
        }
        return true
    }).slice(0, MAX_VIDEOS)
}

async function fetchWbiKeys(): Promise<{ imgKey: string, subKey: string }> {
    const body = JSON.parse(await httpGet('https://api.bilibili.com/x/web-interface/nav')) as Record<string, unknown>
    const wbi = asObject(asObject(body).data).wbi_img
    const imgKey = asString(wbi.img_url).split('/').pop()?.split('.')[0] ?? ''
    const subKey = asString(wbi.sub_url).split('/').pop()?.split('.')[0] ?? ''
    return { imgKey, subKey }
}

function signWbi(params: Record<string, string>, imgKey: string, subKey: string): string {
    const mixinKey = MIXIN_KEY_ENC_TAB.map(index => (imgKey + subKey)[index]).join('').slice(0, 32)
    const query = Object.entries({ ...params, wts: String(Math.floor(Date.now() / 1000)) })
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    const wRid = createHash('md5').update(query + mixinKey).digest('hex')
    return `${query}&w_rid=${wRid}`
}

async function fetchBilibiliPage(mid: string, page: number, imgKey: string, subKey: string): Promise<Record<string, unknown>> {
    const query = signWbi({ mid, pn: String(page), ps: '10', order: 'pubdate' }, imgKey, subKey)
    const body = JSON.parse(await httpGet(`https://api.bilibili.com/x/space/wbi/arc/search?${query}`, {
        Referer: `https://space.bilibili.com/${mid}`,
    })) as Record<string, unknown>
    const code = asObject(body).code
    if (code !== 0)
        throw new Error(`bilibili api code ${String(code)}: ${asString(asObject(body).message)}`)
    return body
}

async function fetchBilibiliVideos(mid: string): Promise<RawVideo[]> {
    const { imgKey, subKey } = await fetchWbiKeys()
    const body = await withRetry(() => fetchBilibiliPage(mid, 1, imgKey, subKey))
    const list = asArray(asObject(asObject(asObject(body).data).list).vlist)
    return list.slice(0, MAX_VIDEOS).map((item) => {
        const video = asObject(item)
        const bvid = asString(video.bvid)
        return {
            videoId: bvid,
            title: asString(video.title),
            url: `https://www.bilibili.com/video/${bvid}`,
            publishedAt: asNumber(video.created) ? new Date(asNumber(video.created) * 1000).toISOString().slice(0, 10) : '',
            description: asString(video.description),
        }
    })
}

function toMarkdown(video: SourceVideo, order: number): string {
    const key = video.source === 'bilibili' ? 'bilibili' : 'youtube'
    return [
        '---',
        `title: ${JSON.stringify(video.title)}`,
        `description: ${JSON.stringify(video.description)}`,
        `date: ${JSON.stringify(video.publishedAt)}`,
        'category: ""',
        'status: draft',
        'platforms:',
        `  ${key}: ${JSON.stringify(video.url)}`,
        'tags: []',
        `order: ${order}`,
        '---',
        '',
    ].join('\n')
}

function slugify(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFKC')
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '') || 'video'
}

async function writeVideos(videos: SourceVideo[], succeeded: string[]): Promise<void> {
    await mkdir(OUTPUT_DIR, { recursive: true })
    for (const source of succeeded)
        await rm(join(OUTPUT_DIR, source), { recursive: true, force: true })
    const counters: Record<string, number> = {}
    for (const video of videos) {
        const count = (counters[video.source] ?? 0) + 1
        counters[video.source] = count
        const dir = join(OUTPUT_DIR, video.source)
        await mkdir(dir, { recursive: true })
        const file = join(dir, `${String(count).padStart(2, '0')}.${slugify(video.title)}.md`)
        await writeFile(file, toMarkdown(video, count))
    }
}

async function main(): Promise<void> {
    const all: SourceVideo[] = []
    const succeeded: string[] = []
    const errors: string[] = []

    try {
        const videos = await fetchBilibiliVideos(BILIBILI_MID)
        all.push(...videos.map(video => ({ ...video, source: 'bilibili' as const })))
        succeeded.push('bilibili')
        console.log(`bilibili: ${videos.length} videos`)
    }
    catch (error) {
        errors.push(`bilibili: ${(error as Error).message}`)
    }

    try {
        const videos = await fetchYouTubeVideos(YOUTUBE_HANDLE)
        all.push(...videos.map(video => ({ ...video, source: 'youtube' as const })))
        succeeded.push('youtube')
        console.log(`youtube: ${videos.length} videos`)
    }
    catch (error) {
        errors.push(`youtube: ${(error as Error).message}`)
    }

    await writeVideos(all, succeeded)

    console.log(`\nwritten ${all.length} videos to ${OUTPUT_DIR}/`)
    if (errors.length > 0)
        console.warn(`skipped sources:\n${errors.map(error => `  - ${error}`).join('\n')}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
