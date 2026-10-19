import { describe, expect, it } from 'vitest'
import { renderMarkdown } from '@/markdown'

describe('renderMarkdown', () => {
    it('renders markdown and derives an excerpt from the first paragraph', async () => {
        const sample = await renderMarkdown('## 标题\n\n中文 **重点** 与 `代码` https://example.com\n\n<script>alert(1)</script>\n\n```html\n<img src=x onerror=alert(1)>\n```')
        expect(sample.excerpt).toBe('中文 重点 与 代码 https://example.com')
        expect(sample.html).toMatch(/<strong>重点<\/strong>/)
        expect(sample.html).toMatch(/href="https:\/\/example.com"/)
        expect(sample.html).not.toContain('<script>')
        expect(sample.html).not.toContain('<img src=x')
        expect(sample.html).toMatch(/<pre[^>]*class="[^"]*shiki[^"]*"[^>]*><code class="language-html">/)
        const pre = sample.html.match(/<pre\b[^>]*>/)?.[0]
        expect(pre).toContain('background-color:#fff;')
        expect(pre).toContain('color:#24292e;')
        expect(pre).toContain('--shiki-dark-bg:#24292e;')
        expect(pre).toContain('--shiki-dark:#e1e4e8')
        expect(sample.html).toContain('&lt;')
    })

    it('keeps safe embedded html and strips active content', async () => {
        const embedded = await renderMarkdown('<a href="https://example.com"><img src="https://example.com/badge.png" alt="badge" style="width: 200px" onerror="alert(1)"></a>\n\n<a href="javascript:alert(1)">unsafe</a>\n\n<iframe src="https://example.com"></iframe>')
        expect(embedded.html).toMatch(/<a href="https:\/\/example.com"><img/)
        expect(embedded.html).toContain('src="https://example.com/badge.png"')
        expect(embedded.html).not.toContain('onerror')
        expect(embedded.html).not.toContain('javascript:')
        expect(embedded.html).not.toContain('<iframe')
    })
})
