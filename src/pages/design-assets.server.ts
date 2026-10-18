import { defineHandler, defineHead } from 'void'

export interface Props {}

export const loader = defineHandler((): Props => ({}))

export const head = defineHead<Props>(() => ({
    title: '设计资产',
    meta: [{ name: 'description', content: '查看并下载 prop.show 的 Logo、品牌主色与基础使用规范。' }],
    link: [{ rel: 'canonical', href: 'https://prop.show/design-assets' }],
}))
