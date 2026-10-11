<script setup lang="ts">
/**
 * 区块标题：bordered section heading + mono eyebrow + 右侧插槽。
 * 见 .agents/skills/prop-show-design/references/design-system.md 的 Section Heading 模式。
 */
withDefaults(defineProps<{
    title: string
    eyebrow?: string
    /** h2 的 id，供外层 section 的 aria-labelledby 引用。 */
    titleId?: string
    /** 右侧栏并排的断点：短内容（计数、图标）用 sm，段落用 md。 */
    stackAt?: 'sm' | 'md'
}>(), {
    stackAt: 'sm',
})
</script>

<template>
    <div
        class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5"
        :class="stackAt === 'md' ? 'md:flex-row md:items-end' : 'sm:flex-row sm:items-end'"
    >
        <div>
            <div v-if="eyebrow" class="eyebrow">
                {{ eyebrow }}
            </div>
            <h2 :id="titleId" class="text-3xl font-black tracking-tight md:text-4xl">
                {{ title }}
            </h2>
        </div>

        <slot />
    </div>
</template>
