declare module 'virtual:prop-content' {
    const content: {
        videos: readonly import('./content').Video[]
        news: readonly import('./content').News[]
        works: readonly import('./content').Work[]
        creators: readonly import('./content').Creator[]
        bodies: Record<string, string>
    }
    export default content
}
