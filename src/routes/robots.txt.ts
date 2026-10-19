import { defineHandler } from 'void'
import { siteUrl } from '@/content'

export const GET = defineHandler((c) => {
    c.header('Cache-Control', 'public, max-age=0, s-maxage=3600')
    return c.text(`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
})
