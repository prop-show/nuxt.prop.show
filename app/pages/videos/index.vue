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
        <!-- <PageHeader title="视频教程" description="通过高质量的视频内容，学习前端开发技能和最佳实践" /> -->
        <!-- <section class="mb-16" /> -->

        <section v-if="pending" class="grid gap-6">
            <UCard v-for="i in 6" :key="i" class="relative overflow-hidden" variant="subtle">
                <USkeleton class="absolute -right-2 -top-2 size-24 -rotate-12 opacity-40" />

                <div class="relative z-10">
                    <div class="mb-2 flex items-center gap-2">
                        <USkeleton class="size-3 rounded-full" />
                        <USkeleton class="h-4 w-20" />
                    </div>

                    <USkeleton class="h-7 w-2/3 max-w-120" />

                    <div class="my-3 flex flex-wrap gap-1">
                        <USkeleton class="h-5 w-14 rounded-sm" />
                        <USkeleton class="h-5 w-20 rounded-sm" />
                        <USkeleton v-if="i % 2 === 0" class="h-5 w-16 rounded-sm" />
                    </div>

                    <div class="space-y-2 py-2">
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-4/5" />
                    </div>

                    <div class="flex flex-wrap gap-4 pt-2">
                        <USkeleton class="h-8 w-24 rounded-sm" />
                        <USkeleton class="h-8 w-20 rounded-sm" />
                        <USkeleton class="h-8 w-24 rounded-sm" />
                    </div>
                </div>
            </UCard>
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
