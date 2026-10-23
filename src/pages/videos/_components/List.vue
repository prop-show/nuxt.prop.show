<script lang="ts" setup>
import type { Video } from '@/content'
import VideoCard from '@/pages/videos/_components/Card.vue'

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
    <section class="my-8 md:my-10">
        <SectionHeading :title="title">
            <span class="text-sm text-muted">
                共 {{ total }} 集视频
            </span>
        </SectionHeading>

        <TransitionGroup name="archive" tag="div" class="overflow-hidden border-y border-default">
            <VideoCard v-for="video in videos" :key="video.stem" :video="video" :numbering />
        </TransitionGroup>
    </section>
</template>
