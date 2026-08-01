<script setup lang="ts">
const { data: seriesVideos, pending } = useAsyncData(
    'yisi-series-videos',
    async () => {
        const videos = await queryCollection('videos')
            .where('series', '=', '乙巳')
            .all()

        return videos.sort((a, b) => (a.episode ?? a.order!) - (b.episode ?? b.order!))
    },
    { default: () => [] },
)

useSeoMeta({
    title: '乙巳：从零构建完整产品 - prop.show',
    description: '从技术选型开始，按顺序学习 NestJS API、数据库、Vue 前端、JWT 登录与 Redis 缓存。',
})
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
