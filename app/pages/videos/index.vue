<script lang="ts" setup>
const { data: videos, pending } = useAsyncData(
    () => queryCollection('videos').order('order', 'DESC').all(),
    {
        default: () => [],
    },
)

useSeoMeta({
    title: '视频 - prop.show',
    description: '观看 prop.show 前端开发视频，包含项目实战、技术解析、工具使用等高质量内容。',
})

const channelCount = computed(() => new Set(videos.value.map(video => video.category)).size)

// defineOgImageComponent('NuxtSeo', {
//     headline: 'prop.show',
//     title: '视频 🎥',
//     description: '观看 prop.show 前端开发视频，包含项目实战、技术解析、工具使用等高质量内容。',
//     theme: '#F0DB4F',
//     colorMode: 'dark',
// })
</script>

<template>
    <main>
        <VideoHero
            :count="videos.length"
            :channel-count="channelCount"
            :latest-order="videos[0]?.order"
            :latest-title="videos[0]?.title"
        />

        <section v-if="pending" class="my-20">
            <div class="mb-8 border-b border-default pb-5">
                <USkeleton class="mb-2 h-3 w-28" />
                <USkeleton class="h-10 w-56" />
            </div>

            <div class="border-y border-default">
                <div v-for="index in 5" :key="index" class="grid gap-5 border-b border-default px-1 py-7 last:border-b-0 sm:px-5 lg:grid-cols-[7rem_1fr_12rem_2.5rem] lg:items-center">
                    <div class="space-y-3">
                        <USkeleton class="h-8 w-16" />
                        <USkeleton class="h-3 w-20" />
                    </div>
                    <div class="space-y-3">
                        <USkeleton class="h-6 w-3/5" />
                        <USkeleton class="h-4 w-full" />
                        <div class="flex gap-2">
                            <USkeleton class="h-5 w-14" />
                            <USkeleton class="h-5 w-18" />
                        </div>
                    </div>
                    <USkeleton class="h-8 w-32" />
                    <USkeleton class="hidden size-10 lg:block" />
                </div>
            </div>
        </section>

        <UEmpty
            v-else-if="!videos.length"
            icon="i-tabler-player-play"
            title="暂无视频"
            description="精彩内容即将上线，敬请期待！"
        />

        <VideoList v-else :videos />
    </main>
</template>
