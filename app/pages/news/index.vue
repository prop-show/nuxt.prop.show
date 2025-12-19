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

defineOgImageComponent('NuxtSeo', {
    headline: 'prop.show',
    title: '前端速报 📰',
    description: '第一时间获得前端库和工具的最新动态和更新消息。',
    theme: '#F0DB4F',
    colorMode: 'dark',
})
</script>

<template>
    <main>
        <PageHeader title="速报" description="一些库和工具的最新动态和更新消息" />
        <section className="mb-16" />

        <section v-if="pending">
            <UCard v-for="index in 4" :key="index" class="space-y-4 mb-4">
                <template #header>
                    <USkeleton class="h-8 w-62.5" />
                </template>
                <section class="space-y-2">
                    <USkeleton v-for="i in 3" :key="i" class="h-4" />
                </section>
            </UCard>
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
