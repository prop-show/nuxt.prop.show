import type { HeadDescriptor } from 'void'

export function seoHead({ title, description, canonical, noindex = false }: {
    title: string
    description: string
    canonical: string
    noindex?: boolean
}): HeadDescriptor {
    const name = `${title} | prop.show`
    const website = 'https://prop.show/#website'
    const path = new URL(canonical).pathname.replace(/\/+$/, '')
    const image = `https://prop.show/og/${path ? path.slice(1) : 'index'}.png`
    return {
        title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'prop.show' },
            { property: 'og:locale', content: 'zh_CN' },
            { property: 'og:title', content: name },
            { property: 'og:description', content: description },
            { property: 'og:url', content: canonical },
            { property: 'og:image', content: image },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:type', content: 'image/png' },
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
                    { '@type': 'WebSite', '@id': website, 'url': 'https://prop.show/', 'name': 'prop.show', 'inLanguage': 'zh-CN' },
                    {
                        '@type': 'WebPage',
                        '@id': `${canonical}#webpage`,
                        'url': canonical,
                        name,
                        description,
                        'inLanguage': 'zh-CN',
                        'isPartOf': { '@id': website },
                    },
                ],
            }).replaceAll('<', '\\u003c'),
        }],
    }
}
