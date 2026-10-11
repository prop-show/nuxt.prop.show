<script setup lang="ts">
const props = withDefaults(defineProps<{
    tags?: string[]
    /** 只显示前 N 个（归档行用）。 */
    limit?: number
    /** sm = 卡片行内，md = 区块/详情页。 */
    size?: 'sm' | 'md'
}>(), {
    size: 'sm',
})

const visible = computed(() => props.limit ? (props.tags || []).slice(0, props.limit) : props.tags)
</script>

<template>
    <div class="flex flex-wrap gap-2">
        <span
            v-for="tag in visible"
            :key="tag"
            class="border border-default font-mono font-bold tracking-wider text-toned"
            :class="size === 'md' ? 'px-2.5 py-1 text-[10px]' : 'px-2 py-0.5 text-[9px]'"
        >
            {{ tag }}
        </span>
    </div>
</template>
