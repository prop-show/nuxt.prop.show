import { defineHandler } from 'void'
import { xmlCacheControl } from '@/config'
import { siteUrl } from '@/content'

export const GET = defineHandler((c) => {
    c.header('Cache-Control', xmlCacheControl)
    return c.text(`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
})
