<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

withDefaults(defineProps<{
    videos: VideosCollectionItem[]
    total: number
    eyebrow?: string
    title?: string
    numbering?: 'global' | 'series'
}>(), {
    eyebrow: 'PROGRAM ARCHIVE',
    title: '全部节目',
    numbering: 'global',
})
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex items-end justify-between border-b border-default pb-5">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    {{ eyebrow }}
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    {{ title }}
                </h2>
            </div>
            <span class="hidden font-mono text-xs font-bold tracking-[0.18em] text-dimmed sm:block">
                {{ String(total).padStart(2, '0') }} EPISODES
            </span>
        </div>

        <div class="overflow-hidden border-y border-default">
            <VideoCard v-for="video in videos" :key="video.id" :video="video" :numbering />
        </div>
    </section>
</template>
