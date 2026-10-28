import { site } from '../config.ts'

/** Content dates without a timezone are published in China Standard Time. */
export function contentDate(value?: string): Date | undefined {
    if (!value)
        return undefined
    const normalized = value.trim().replace(' ', 'T')
    const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
        ? `${normalized}T00:00:00${site.utcOffset}`
        : /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized) ? normalized : `${normalized}${site.utcOffset}`
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime()) ? undefined : date
}

/** 全站唯一的日期写法（归档、首页、详情皆用）：2026/07/11。 */
export function contentDateText(value?: string): string {
    const date = contentDate(value)

    return date
        ? new Intl.DateTimeFormat(site.locale, {
                timeZone: site.timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(date)
        : '待定'
}
