<script setup lang="ts">
import type { Props } from '@/pages/series/yisi.server'
import IconRouteOff from '~icons/tabler/route-off'

defineProps<Props>()
</script>

<template>
    <main>
        <SeriesYisiHero :count="seriesVideos.length" />

        <section v-if="pending" class="my-20">
            <div class="mb-8 border-b border-default pb-5">
                <UiSkeleton class="mb-2 h-3 w-32" />
                <UiSkeleton class="h-8 w-64 lg:h-10" />
            </div>
            <div class="space-y-px border-y border-default">
                <UiSkeleton v-for="index in 5" :key="index" class="h-32 rounded-none" />
            </div>
        </section>

        <UiEmpty v-else-if="!seriesVideos.length" class="my-20">
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
            :videos="seriesVideos"
            :total="seriesVideos.length"
            eyebrow="YISI CURRICULUM"
            title="完整课程目录"
            numbering="series"
        />
    </main>
</template>
