import type { MarkdownDocument, Node, NodeHandler } from 'comark'
import { renderHtmlFromDocument } from '@comark/html'
import { createMarkdownParser } from 'comark'
import components from 'comark/plugins/components'
import html from 'comark/plugins/html'
import security from 'comark/plugins/security'

// Existing articles embed HTML badges and screenshots; filter active content and unsafe URLs.
const parse = createMarkdownParser({
    registerDefaultPlugins: false,
    plugins: [components(), html(), security({
        blockedTags: ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'base', 'form', 'svg', 'math'],
        allowedProtocols: ['http', 'https', 'mailto', 'tel'],
        allowDataImages: false,
    })],
    autoUnwrap: false,
    autoClose: false,
    linkify: true,
})

const renderers: Record<string, NodeHandler> = Object.fromEntries(
    ['note', 'alert', 'poetry'].map(name => [name, async ([, , ...children], state) => {
        const tag = name === 'poetry' ? 'blockquote' : 'aside'
        return `<${tag} class="content-${name}">${await state.render(children)}</${tag}>`
    }]),
)

function plainText(node: Node): string {
    if (typeof node === 'string')
        return node
    if (node[0] === 'br')
        return ' '
    if (node[0] === 'img')
        return String(node[1].alt || '')
    return node.slice(2).map(child => plainText(child as Node)).join('')
}

function firstParagraph(nodes: Node[]): Node | undefined {
    for (const node of nodes) {
        if (typeof node === 'string')
            continue
        if (node[0] === 'p')
            return node
        const nested = firstParagraph(node.slice(2) as Node[])
        if (nested)
            return nested
    }
}

export async function renderMarkdown(markdown: string) {
    const document: MarkdownDocument = await parse(markdown)
    const paragraph = firstParagraph(document.nodes)
    return {
        html: await renderHtmlFromDocument(document, { components: renderers }),
        excerpt: paragraph ? plainText(paragraph).replace(/\s+/g, ' ').trim().slice(0, 200) : '',
    }
}
