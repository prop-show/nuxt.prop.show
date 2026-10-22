import type { HeadDescriptor } from 'void'
import { ogImage, site } from '@/config'

export function seoHead({ title, description, canonical, noindex = false }: {
    title: string
    description: string
    canonical: string
    noindex?: boolean
}): HeadDescriptor {
    const name = `${title} | ${site.name}`
    const website = `${site.url}/#website`
    const path = new URL(canonical).pathname.replace(/\/+$/, '')
    const image = `${site.url}${ogImage.directory}/${path ? path.slice(1) : 'index'}.${ogImage.format}`
    return {
        title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: site.name },
            { property: 'og:locale', content: site.locale.replace('-', '_') },
            { property: 'og:title', content: name },
            { property: 'og:description', content: description },
            { property: 'og:url', content: canonical },
            { property: 'og:image', content: image },
            { property: 'og:image:width', content: String(ogImage.width) },
            { property: 'og:image:height', content: String(ogImage.height) },
            { property: 'og:image:type', content: `image/${ogImage.format}` },
            { property: 'og:image:alt', content: name },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:image', content: image },
            { name: 'twitter:image:alt', content: name },
            { name: 'twitter:title', content: name },
            { name: 'twitter:description', content: description },
            ...(noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
        ],
        link: [{ rel: 'canonical', href: canonical }],
        script: [{
            type: 'application/ld+json',
            // Void emits innerHTML verbatim; prevent content from closing the script element.
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    { '@type': 'WebSite', '@id': website, 'url': `${site.url}/`, 'name': site.name, 'inLanguage': site.locale },
                    {
                        '@type': 'WebPage',
                        '@id': `${canonical}#webpage`,
                        'url': canonical,
                        name,
                        description,
                        'inLanguage': site.locale,
                        'isPartOf': { '@id': website },
                    },
                ],
            }).replaceAll('<', '\\u003c'),
        }],
    }
}
