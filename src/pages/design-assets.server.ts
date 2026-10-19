import { defineHandler, defineHead } from 'void'

import { seoHead } from '@/utils/seo'

export interface Props {}

export const loader = defineHandler((): Props => ({}))

export const head = defineHead<Props>(() => seoHead({
    title: '设计资产',
    description: '查看并下载 prop.show 的 Logo、品牌主色与基础使用规范。',
    canonical: 'https://prop.show/design-assets',
}))
