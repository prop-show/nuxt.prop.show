<script lang="ts" setup>
import type { Video } from '@/content'

withDefaults(defineProps<{
    videos: Video[]
    total: number
    eyebrow?: string
    title?: string
    numbering?: 'global' | 'series'
}>(), {
    eyebrow: 'VIDEOS',
    title: '全部视频',
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
            <VideoCard v-for="video in videos" :key="video.stem" :video="video" :numbering />
        </div>
    </section>
</template>
