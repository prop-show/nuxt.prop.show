<script setup lang="ts">
import IconArrowsMaximize from '~icons/tabler/arrows-maximize'
import IconContrast2 from '~icons/tabler/contrast-2'
import IconPaletteOff from '~icons/tabler/palette-off'
import IconSpacingHorizontal from '~icons/tabler/spacing-horizontal'

const rules = [
    {
        number: '01',
        icon: IconSpacingHorizontal,
        title: '留出空白',
        description: '标志与文字、图像及容器边界保持距离。',
    },
    {
        number: '02',
        icon: IconPaletteOff,
        title: '不要自行改色',
        description: '仅使用黑色或品牌黄版本，不添加渐变、描边或装饰色。',
    },
    {
        number: '03',
        icon: IconArrowsMaximize,
        title: '保持原始比例',
        description: '等比缩放，不拉伸、压缩、旋转或重排图形。',
    },
    {
        number: '04',
        icon: IconContrast2,
        title: '确保背景对比',
        description: '浅底用黑色版，深底用品牌黄版，避免杂乱背景。',
    },
]
</script>

<template>
    <section class="my-12 md:my-16" aria-labelledby="usage-rules-heading">
        <SectionHeading title="使用规则" title-id="usage-rules-heading" />

        <div class="grid gap-x-12 gap-y-8 md:grid-cols-2">
            <article
                v-for="rule in rules"
                :key="rule.number"
                class="min-w-0"
            >
                <div class="flex items-start justify-between">
                    <span class="flex size-8 items-center justify-center">
                        <component :is="rule.icon" class="size-5 text-primary" aria-hidden="true" />
                    </span>
                </div>
                <h3 class="mt-3 text-lg leading-[1.4] font-bold lg:text-xl">
                    {{ rule.title }}
                </h3>
                <p class="mt-3 max-w-xl text-base leading-8 text-muted">
                    {{ rule.description }}
                </p>
            </article>
        </div>
    </section>
</template>
