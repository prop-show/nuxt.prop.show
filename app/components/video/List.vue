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
        <SectionHeading :eyebrow="eyebrow" :title="title">
            <span class="section-count hidden sm:block">
                {{ String(total).padStart(2, '0') }} EPISODES
            </span>
        </SectionHeading>

        <div class="overflow-hidden border-y border-default">
            <VideoCard v-for="video in videos" :key="video.id" :video="video" :numbering />
        </div>
    </section>
</template>
