export function resolveLink(to: string | { path: string, query?: Record<string, unknown> }) {
    if (typeof to === 'string') {
        if (!to.startsWith('/') || to.startsWith('//'))
            return to
        const url = new URL(to, 'https://prop.show')
        if (url.pathname !== '/')
            url.pathname = url.pathname.replace(/\/$/, '')
        return `${url.pathname}${url.search}${url.hash}`
    }
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(to.query || {})) {
        if (value !== undefined && value !== null)
            query.set(key, String(value))
    }
    return resolveLink(`${to.path}${query.size ? `?${query}` : ''}`)
}
