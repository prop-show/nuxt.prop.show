<script setup lang="ts">
/** 区块标题与右侧操作。 */
withDefaults(defineProps<{
    title: string
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
        class="mb-6 flex flex-col justify-between gap-3"
        :class="stackAt === 'md' ? 'md:flex-row md:items-end' : 'sm:flex-row sm:items-end'"
    >
        <h2 :id="titleId" class="text-2xl leading-[1.3] font-bold tracking-tight lg:text-3xl">
            {{ title }}
        </h2>

        <slot />
    </div>
</template>
