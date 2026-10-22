<script setup lang="ts">
import type { Props } from '@/pages/series/yisi.server'
import IconRouteOff from '~icons/tabler/route-off'
import SeriesYisiHero from '@/pages/series/_components/YisiHero.vue'
import VideoList from '@/pages/videos/_components/List.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <SeriesYisiHero :count="seriesVideos.length" />

        <section v-if="pending" id="curriculum" class="my-8 md:my-10">
            <div class="mb-8 border-b border-default pb-5">
                <UiSkeleton class="h-8 w-64 lg:h-10" />
            </div>
            <div>
                <div v-for="index in 5" :key="index" class="space-y-3 border-b border-default px-1 py-7 sm:px-5">
                    <UiSkeleton class="h-8 w-3/5" />
                    <UiSkeleton class="h-4 w-40" />
                    <UiSkeleton class="h-5 w-full" />
                    <UiSkeleton class="h-5 w-4/5" />
                    <UiSkeleton class="h-4 w-32" />
                </div>
            </div>
        </section>

        <UiEmpty v-else-if="!seriesVideos.length" id="curriculum" class="my-8 md:my-10">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconRouteOff aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>系列内容暂不可用</UiEmptyTitle>
                <UiEmptyDescription>请稍后再来查看课程目录。</UiEmptyDescription>
            </UiEmptyHeader>
        </UiEmpty>

        <VideoList
            v-else
            id="curriculum"
            :videos="seriesVideos"
            :total="seriesVideos.length"
            eyebrow="YISI CURRICULUM"
            title="完整课程目录"
            numbering="series"
        />
    </main>
</template>
