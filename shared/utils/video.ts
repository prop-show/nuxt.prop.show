/**
 * 节目编号与展示的统一来源。
 * `episode` 是系列内的集数，`order` 是全局节目序号；两者在 content/videos/*.md 里并不相等。
 */

export interface NumberedVideo {
    title: string
    series?: string
    episode?: number
    order?: number
}

/** 系列内用 `episode`，其余用全局 `order`。 */
export function videoEpisode(video?: NumberedVideo) {
    return video?.episode ?? video?.order ?? 0
}

/** 系列节目带集数的标题：`乙巳 EP.01：用到的包`。 */
export function videoLabel(video: NumberedVideo) {
    return video.series
        ? `${video.series} EP.${String(videoEpisode(video)).padStart(2, '0')}：${video.title}`
        : video.title
}

/** 分类色点，只用于小面积语义标识。 */
export function videoCategoryColor(category?: string) {
    switch (category) {
        case '构建现场':
            return 'bg-blue-500'
        case '工具雷达':
            return 'bg-green-500'
        case '开发者会客厅':
            return 'bg-purple-500'
        default:
            return 'bg-gray-500'
    }
}
