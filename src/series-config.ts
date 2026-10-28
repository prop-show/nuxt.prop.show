// Keys match the series route slug; names match the Markdown `series` field.
export const seriesConfig = {
    yisi: {
        name: '乙巳',
        path: '/series/yisi',
        title: '乙巳：从零构建完整产品',
        description: '从技术选型开始，按顺序学习 NestJS API、数据库、Vue 前端、JWT 登录与 Redis 缓存。',
        ogLabel: 'YISI SERIES',
        /** 目录分段：按集数区间切分，只用于回访定位，不改变内容顺序。 */
        phases: [
            { title: '准备', from: 0, to: 1 },
            { title: '后端骨架', from: 2, to: 9 },
            { title: '数据与配置', from: 10, to: 14 },
            { title: '前端实现', from: 15, to: 20 },
            { title: '登录与缓存', from: 21, to: 23 },
        ],
    },
}
