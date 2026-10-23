import type { Node } from '@takumi-rs/core'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Renderer } from '@takumi-rs/core'
import { ogImage, site } from '../src/config.ts'
import { seriesConfig } from '../src/series-config.ts'
import { videoLabel } from '../src/utils/video.ts'
import { generateContent } from './generate-content.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(import.meta.url)
const fontRoot = dirname(require.resolve('@fontsource-variable/noto-sans-sc/package.json'))
const renderer = new Renderer()
// Fontsource's CJK subsets need their unicode ranges to resolve one family correctly.
const css = await readFile(resolve(fontRoot, 'index.css'), 'utf8')
for (const block of css.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
    const file = block[1]!.match(/url\(\.\/([^)]*\.woff2)\)/)![1]!
    const ranges = block[1]!.match(/unicode-range:\s*([^;]+)/)![1]!.split(',').map((range): [number, number] => {
        const [start, end] = range.trim().slice(2).split('-')
        return [Number.parseInt(start!, 16), Number.parseInt(end ?? start!, 16)]
    })
    await renderer.registerFont({ name: 'Noto Sans SC', weight: 700, data: await readFile(resolve(fontRoot, file)), unicodeRange: ranges })
}

const content = await generateContent(root)
const pages = [
    { path: '/', title: '前端实践，持续记录。', label: '视频与技术速报' },
    { path: '/videos', title: '视频', label: '前端实践与项目演示' },
    { path: '/news', title: '前端速报', label: '框架、工具与开源动态' },
    { path: '/works', title: '团队作品', label: '项目、工具与开源实践' },
    { path: '/about', title: '关于 prop.show', label: '认识创作团队' },
    { path: '/design-assets', title: '设计资产', label: '标志、品牌色与使用规则' },
    ...Object.values(seriesConfig).map(series => ({ path: series.path, title: series.title, label: '项目实战系列' })),
    ...content.videos.map(entry => ({ ...entry, title: videoLabel(entry), label: `视频 · ${entry.category}` })),
    ...content.news.map(entry => ({ ...entry, label: '前端速报' })),
    ...content.works.map(entry => ({
        ...entry,
        label: '团队作品',
        authorName: content.creators.find(creator => creator.slug === entry.author)?.name,
    })),
]
const logo = await readFile(resolve(root, 'public/prop-light-transparent.svg'))
const output = resolve(root, `public${ogImage.directory}`)
await mkdir(output, { recursive: true })
for (const page of pages) {
    const titleSize = page.title.length > 60 ? 46 : page.title.length > 42 ? 54 : page.title.length > 26 ? 62 : 76
    const node: Node = {
        type: 'container',
        style: { width: ogImage.width, height: ogImage.height, padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff', color: '#171717', fontFamily: 'Noto Sans SC', fontWeight: 700 },
        children: [
            {
                type: 'container',
                style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
                children: [
                    {
                        type: 'container',
                        style: { display: 'flex', alignItems: 'center', gap: 18 },
                        children: [
                            { type: 'image', src: 'prop-logo', style: { width: 52, height: 52 } },
                            { type: 'text', text: site.name, style: { fontSize: 30 } },
                        ],
                    },
                    { type: 'text', text: page.label, style: { fontSize: 22, color: '#525252' } },
                ],
            },
            {
                type: 'container',
                style: { display: 'flex', flexDirection: 'column', gap: 24 },
                children: [
                    { type: 'container', style: { width: 64, height: 10, backgroundColor: '#f0db4f' } },
                    { type: 'text', text: page.title, style: { fontSize: titleSize, lineHeight: 1.3, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } },
                ],
            },
            {
                type: 'container',
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
                children: [
                    { type: 'text', text: 'authorName' in page ? `作者 · ${page.authorName || '未知作者'}` : '开发者共创 · 记录真实经验', style: { fontSize: 22, color: '#525252' } },
                    { type: 'text', text: 'prop.show', style: { fontSize: 22 } },
                ],
            },
        ],
    }
    const png = await renderer.render(node, { width: ogImage.width, height: ogImage.height, format: ogImage.format, images: [{ src: 'prop-logo', data: logo }] })
    // Nested page paths use nested directories; query variants share their archive image.
    const target = resolve(output, `${page.path === '/' ? 'index' : page.path.slice(1)}.${ogImage.format}`)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, png)
}
console.log(`Takumi: generated ${pages.length} OG images (${ogImage.width}×${ogImage.height}) in public${ogImage.directory}`)
