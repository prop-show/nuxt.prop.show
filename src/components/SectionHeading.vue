<script setup lang="ts">
/** 区块标题与右侧操作。 */
withDefaults(defineProps<{
    /** 省略时不渲染标题，只保留右侧的计数等短内容。 */
    title?: string
    /** h2 的 id，供外层 section 的 aria-labelledby 引用。 */
    titleId?: string
    /** 右侧栏并排的断点：短内容（计数、图标）用 sm，段落用 md。 */
    stackAt?: 'sm' | 'md'
}>(), {
    title: '',
    stackAt: 'sm',
})
</script>

<template>
    <div
        class="flex flex-col justify-between gap-3"
        :class="[title ? 'mb-6' : 'mb-3', stackAt === 'md' ? 'md:flex-row md:items-end' : 'sm:flex-row sm:items-end']"
    >
        <h2 v-if="title" :id="titleId" class="text-2xl leading-[1.3] font-bold tracking-tight lg:text-3xl">
            {{ title }}
        </h2>

        <slot />
    </div>
</template>
