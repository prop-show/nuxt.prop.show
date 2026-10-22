// Shared by the app, Void config and Node scripts; keep this module free of UI imports.
export const site = {
    name: 'prop.show',
    url: 'https://prop.show',
    locale: 'zh-CN',
    timeZone: 'Asia/Shanghai',
    utcOffset: '+08:00',
}

export const contentConfig = {
    pageSize: 5,
    homeVideos: 3,
    homeNews: 3,
}

export const accounts = {
    github: 'prop-show',
    bilibili: '104376935',
    youtube: 'PropShowFM',
}

export const themeStorageKey = 'vueuse-color-scheme'
export const ogImage = { width: 1200, height: 630, format: 'png', directory: '/og' } as const
export const xmlCacheControl = 'public, max-age=0, s-maxage=3600'
export const devPort = 4399
