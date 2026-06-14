<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

defineProps<{
    video: VideosCollectionItem
}>()

function getCategoryColor(category: string) {
    switch (category) {
        case '构建现场':
            return 'bg-blue-500'
        case '工具雷达':
            return 'bg-green-500'
        case '开发者会客厅':
            return 'bg-purple-500'
        default:
            return 'bg-gray-500'
    }
}
</script>

<template>
    <UCard class="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-elevated/70 hover:shadow-lg" variant="subtle">
        <span class="pointer-events-none absolute -right-2 -top-3 z-0 font-mono text-9xl font-black tracking-[-0.12em] text-primary/25 transition-all duration-300 group-hover:-rotate-6 group-hover:text-primary/45">{{ String(video.order).padStart(2, '0') }}</span>

        <div class="flex items-start justify-between relative z-10">
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-3 h-3 rounded-full" :class="[`${getCategoryColor(video.category)}`]" />
                    <span class="font-mono text-xs font-bold tracking-wider text-muted">{{ video.category }}</span>
                </div>
                <h3 class="text-lg font-black transition-colors group-hover:text-primary">
                    {{ video.title }}
                </h3>
            </div>
        </div>

        <div v-if="video.tags?.length" class="flex flex-wrap gap-1 my-3">
            <UBadge v-for="tag in video.tags" :key="tag" variant="outline" color="neutral" class="text-xs">
                {{ tag }}
            </UBadge>
        </div>

        <p class="line-clamp-3 text-sm text-muted py-2">
            {{ video.description }}
        </p>

        <VideoPlatformButtons :show-title="false" :platforms="video.platforms" />
    </UCard>
</template>
