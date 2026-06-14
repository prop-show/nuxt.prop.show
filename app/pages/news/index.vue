<script lang="ts" setup>
import NewsLine from '~/components/NewsLine.vue'

const { data: news, pending } = useAsyncData(
    () => queryCollection('news').order('date', 'DESC').all(),
    {
        default: () => [],
    },
)

useSeoMeta({
    title: '速报 - prop.show',
    description: '第一时间获得前端库和工具的最新动态和更新消息。',
})

// defineOgImageComponent('NuxtSeo', {
//     headline: 'prop.show',
//     title: '前端速报 📰',
//     description: '第一时间获得前端库和工具的最新动态和更新消息。',
//     theme: '#F0DB4F',
//     colorMode: 'dark',
// })
</script>

<template>
    <main>
        <NewsHero :count="news.length" :latest-date="news[0]?.date" />

        <section v-if="pending" class="my-20">
            <div class="mb-8 border-b border-default pb-5">
                <USkeleton class="mb-2 h-3 w-28" />
                <USkeleton class="h-10 w-56" />
            </div>

            <div class="border-y border-default">
                <div v-for="index in 4" :key="index" class="grid gap-5 border-b border-default px-1 py-6 last:border-b-0 sm:px-5 md:grid-cols-[5rem_8rem_1fr_2.5rem] md:items-center">
                    <USkeleton class="h-4 w-12" />
                    <USkeleton class="h-4 w-24" />
                    <div class="space-y-3">
                        <USkeleton class="h-6 w-3/5" />
                        <USkeleton class="h-4 w-full" />
                    </div>
                    <USkeleton class="hidden size-10 md:block" />
                </div>
            </div>
        </section>

        <UEmpty
            v-else-if="!news.length"
            icon="i-tabler-hourglass-empty"
            title="还没有东西哦"
            description="暂时没有新的速报内容。请稍后再来看看！"
        />

        <NewsLine v-else :news />
    </main>
</template>
