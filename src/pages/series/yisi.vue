<script setup lang="ts">
import type { Props } from '@/pages/series/yisi.server'

defineProps<Props>()
</script>

<template>
    <section>
        <SeriesYisiHero :count="seriesVideos.length" />

        <section v-if="pending" class="my-20">
            <div class="mb-8 border-b border-default pb-5">
                <USkeleton class="mb-2 h-3 w-32" />
                <USkeleton class="h-10 w-64" />
            </div>
            <div class="space-y-px border-y border-default">
                <USkeleton v-for="index in 5" :key="index" class="h-32 rounded-none" />
            </div>
        </section>

        <UEmpty
            v-else-if="!seriesVideos.length"
            icon="i-tabler-route-off"
            title="系列内容暂不可用"
            description="请稍后再来查看课程目录。"
        />

        <VideoList
            v-else
            :videos="seriesVideos"
            :total="seriesVideos.length"
            eyebrow="YISI CURRICULUM"
            title="完整课程目录"
            numbering="series"
        />
    </section>
</template>
