<script lang="ts" setup>
import type { Video } from '@/content'
import VideoCard from '@/pages/videos/_components/Card.vue'
import { videoEpisode } from '@/utils/video'

const props = withDefaults(defineProps<{
    videos: Video[]
    total: number
    title?: string
    /** 计数单位：全局归档用「期」，系列课程用「集」。 */
    unit?: '期' | '集'
    numbering?: 'global' | 'series'
    /** 系列索引：行内不重复每行相同的摘要与分类。 */
    index?: boolean
    /** 目录分段，只用于回访定位。 */
    phases?: readonly { title: string, from: number, to: number }[]
}>(), {
    unit: '期',
    numbering: 'global',
    index: false,
})

const groups = computed(() => {
    if (!props.phases?.length)
        return [{ title: '', videos: props.videos }]

    return props.phases
        .map(phase => ({
            title: phase.title,
            videos: props.videos.filter(video => videoEpisode(video) >= phase.from && videoEpisode(video) <= phase.to),
        }))
        .filter(group => group.videos.length)
})
</script>

<template>
    <section class="mt-10 mb-8 md:mt-16 md:mb-10" aria-label="视频列表">
        <h2 v-if="!title" class="sr-only">
            视频列表
        </h2>
        <SectionHeading :title="title">
            <span class="text-sm text-muted tabular-nums">
                共 {{ total }} {{ unit }}视频
            </span>
        </SectionHeading>

        <nav v-if="groups.length > 1" aria-label="课程分段" class="mb-4 flex flex-wrap items-center gap-x-5 text-sm text-muted">
            <a
                v-for="(group, phaseIndex) in groups"
                :key="group.title"
                :href="`#phase-${phaseIndex}`"
                class="inline-flex min-h-11 items-center outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring"
            >
                {{ group.title }}
            </a>
        </nav>

        <TransitionGroup name="archive" tag="div" class="overflow-hidden border-y border-default">
            <template v-for="(group, groupIndex) in groups" :key="group.title || 'all'">
                <div
                    v-if="group.title"
                    :id="`phase-${groupIndex}`"
                    :key="`phase-${groupIndex}`"
                    class="scroll-mt-24 bg-elevated/40 py-2 text-[13px] text-muted"
                >
                    {{ group.title }}
                </div>
                <VideoCard v-for="video in group.videos" :key="video.stem" :video="video" :numbering :index />
            </template>
        </TransitionGroup>
    </section>
</template>
