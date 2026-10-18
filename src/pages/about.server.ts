import { defineHandler, defineHead } from 'void'

export interface Props {}

export const loader = defineHandler((): Props => ({}))

export const head = defineHead<Props>(() => ({
    title: '关于我们',
    meta: [{ name: 'description', content: '了解 prop.show 前端开发播客与教程平台，我们的使命、内容和创作团队。' }],
    link: [{ rel: 'canonical', href: 'https://prop.show/about' }],
}))
