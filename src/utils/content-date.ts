/** Content dates without a timezone are published in China Standard Time. */
export function contentDate(value?: string): Date | undefined {
    if (!value)
        return undefined
    const normalized = value.trim().replace(' ', 'T')
    const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
        ? `${normalized}T00:00:00+08:00`
        : /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized) ? normalized : `${normalized}+08:00`
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime()) ? undefined : date
}
