import { defineHandler, defineHead } from 'void'

import { seoHead } from '@/utils/seo'

export interface Props {}

export const loader = defineHandler((): Props => ({}))

export const head = defineHead<Props>(() => seoHead({
    title: '关于我们',
    description: '了解 prop.show 前端开发播客与教程平台，我们的使命、内容和创作团队。',
    canonical: 'https://prop.show/about',
}))
