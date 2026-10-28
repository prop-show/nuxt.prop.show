<script lang="ts" setup>
import type { Video } from '@/content'
import VideoCard from '@/pages/videos/_components/Card.vue'

withDefaults(defineProps<{
    videos: Video[]
    total: number
    title?: string
    /** 计数单位：全局归档用「期」，系列课程用「集」。 */
    unit?: '期' | '集'
    numbering?: 'global' | 'series'
}>(), {
    title: '全部视频',
    unit: '期',
    numbering: 'global',
})
</script>

<template>
    <section class="my-8 md:my-10">
        <SectionHeading :title="title">
            <span class="text-sm text-muted tabular-nums">
                共 {{ total }} {{ unit }}视频
            </span>
        </SectionHeading>

        <TransitionGroup name="archive" tag="div" class="overflow-hidden border-y border-default">
            <VideoCard v-for="video in videos" :key="video.stem" :video="video" :numbering />
        </TransitionGroup>
    </section>
</template>
