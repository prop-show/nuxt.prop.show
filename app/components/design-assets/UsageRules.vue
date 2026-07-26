<script setup lang="ts">
const rules = [
    {
        number: '01',
        icon: 'i-tabler-spacing-horizontal',
        title: '保留呼吸空间',
        description: '让标志周围保持充足空白，避免与文字、图像或容器边界拥挤。',
    },
    {
        number: '02',
        icon: 'i-tabler-palette-off',
        title: '不要自行改色',
        description: '只使用黑色、品牌黄两种标志版本，不使用渐变、描边或其他装饰色。',
    },
    {
        number: '03',
        icon: 'i-tabler-arrows-maximize',
        title: '保持原始比例',
        description: '等比缩放标志，不拉伸、压缩、旋转或重新排列内部图形。',
    },
    {
        number: '04',
        icon: 'i-tabler-contrast-2',
        title: '确保背景对比',
        description: '浅色背景使用黑色版，深色背景使用品牌黄版，避免放在杂乱图像上。',
    },
]
</script>

<template>
    <section class="my-20" aria-labelledby="usage-rules-heading">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 md:flex-row md:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    BASIC USAGE
                </div>
                <h2 id="usage-rules-heading" class="text-3xl font-black tracking-tight md:text-4xl">
                    基础使用规则
                </h2>
            </div>
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                让标志保持清晰、可识别，比增加额外效果更重要。
            </p>
        </div>

        <div class="grid border-y border-default md:grid-cols-2">
            <article
                v-for="rule in rules"
                :key="rule.number"
                class="group border-b border-default p-6 transition-colors hover:bg-elevated/55 md:p-8 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
            >
                <div class="flex items-start justify-between">
                    <span class="flex size-11 items-center justify-center border border-default bg-muted">
                        <Icon :name="rule.icon" class="size-5 text-primary" />
                    </span>
                    <span class="font-mono text-4xl font-black tracking-[-0.1em] text-dimmed/35 transition-colors group-hover:text-primary">
                        {{ rule.number }}
                    </span>
                </div>
                <h3 class="mt-10 text-xl font-black">
                    {{ rule.title }}
                </h3>
                <p class="mt-3 max-w-xl text-sm leading-7 text-muted">
                    {{ rule.description }}
                </p>
            </article>
        </div>
    </section>
</template>
