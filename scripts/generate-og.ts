import type { Node } from '@takumi-rs/core'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Renderer } from '@takumi-rs/core'
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
    await renderer.registerFont({ name: 'Noto Sans SC', weight: 900, data: await readFile(resolve(fontRoot, file)), unicodeRange: ranges })
}

const content = await generateContent(root)
const pages = [
    { path: '/', title: '看前端视频，\n读技术速报。', label: 'VIDEOS / NEWS' },
    { path: '/videos', title: '前端节目，随时开播。', label: 'VIDEOS' },
    { path: '/news', title: '前端讯号，正在接收。', label: 'NEWS' },
    { path: '/works', title: '团队作品，持续归档。', label: 'WORKS' },
    { path: '/about', title: '记录技术变化，分享真实经验。', label: 'ABOUT' },
    { path: '/design-assets', title: '设计资产，保持一致。', label: 'DESIGN ASSETS' },
    { path: '/series/yisi', title: '乙巳：从零构建完整产品', label: 'YISI SERIES' },
    ...content.videos.map(entry => ({ ...entry, title: videoLabel(entry), label: `VIDEO / ${entry.category}` })),
    ...content.news.map(entry => ({ ...entry, label: 'NEWS' })),
    ...content.works.map(entry => ({ ...entry, label: 'WORKS' })),
]
const logo = await readFile(resolve(root, 'public/prop-light-transparent.svg'))
const output = resolve(root, 'public/og')
await mkdir(output, { recursive: true })
for (const page of pages) {
    const titleSize = page.title.length > 42 ? 48 : page.title.length > 26 ? 58 : 72
    const node: Node = {
        type: 'container',
        style: { width: 1200, height: 630, display: 'flex', backgroundColor: '#171717', color: '#fafafa', fontFamily: 'Noto Sans SC', fontWeight: 900 },
        children: [
            {
                type: 'container',
                style: { width: 870, height: 630, padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
                children: [
                    { type: 'text', text: 'PROP.SHOW', style: { fontSize: 26, letterSpacing: 3 } },
                    { type: 'text', text: page.title, style: { fontSize: titleSize, lineHeight: 1.25, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' } },
                    { type: 'text', text: '把前端技术讲明白，持续记录真实经验。', style: { fontSize: 22, color: '#a3a3a3' } },
                ],
            },
            {
                type: 'container',
                style: { width: 330, height: 630, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f0db4f', color: '#000' },
                children: [
                    { type: 'text', text: page.label, style: { fontSize: 18 } },
                    { type: 'image', src: 'prop-logo', style: { width: 266, height: 266 } },
                    { type: 'text', text: 'prop.show', style: { fontSize: 24 } },
                ],
            },
        ],
    }
    const png = await renderer.render(node, { width: 1200, height: 630, format: 'png', images: [{ src: 'prop-logo', data: logo }] })
    // Nested page paths use nested directories; query variants share their archive image.
    const target = resolve(output, `${page.path === '/' ? 'index' : page.path.slice(1)}.png`)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, png)
}
console.log(`Takumi: generated ${pages.length} OG images (1200×630) in public/og`)
