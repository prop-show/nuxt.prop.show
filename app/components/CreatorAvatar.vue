<script setup lang="ts">
/**
 * 创作者头像。尺寸固定并输出真实 width/height，避免图片加载造成布局位移。
 * 统一 rounded-sm —— 全站几何以直角边框为主。
 */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(defineProps<{
    creator: { name: string, avatar: string }
    size?: AvatarSize
}>(), {
    size: 'sm',
})

const sizes: Record<AvatarSize, { px: number, class: string }> = {
    xs: { px: 24, class: 'size-6' },
    sm: { px: 40, class: 'size-10' },
    md: { px: 48, class: 'size-12' },
    lg: { px: 64, class: 'size-16' },
    xl: { px: 88, class: 'size-22' },
}

const current = computed(() => sizes[props.size])
</script>

<template>
    <img
        :width="current.px"
        :height="current.px"
        :src="creator.avatar"
        :alt="`${creator.name} avatar`"
        class="rounded-sm object-cover"
        :class="current.class"
        loading="lazy"
        decoding="async"
    >
</template>
