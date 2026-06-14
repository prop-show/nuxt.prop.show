<script lang="ts" setup>
const route = useRoute()
const { paginationPageSize } = useAppConfig()

const requestedPage = computed(() => {
    const page = Number.parseInt(String(route.query.page || '1'), 10)

    return Math.max(Number.isNaN(page) ? 1 : page, 1)
})

const { data: videoPage, pending } = useAsyncData(
    () => `videos-page-${requestedPage.value}`,
    async () => {
        const requested = requestedPage.value
        const [total, channelCount, latest] = await Promise.all([
            queryCollection('videos').count('*'),
            queryCollection('videos').count('category', true),
            queryCollection('videos').order('order', 'DESC').first(),
        ])
        const lastPage = Math.max(1, Math.ceil(total / paginationPageSize))
        const page = Math.min(requested, lastPage)
        const videos = await queryCollection('videos')
            .order('order', 'DESC')
            .skip((page - 1) * paginationPageSize)
            .limit(paginationPageSize)
            .all()

        return { videos, total, channelCount, latest, requested, page }
    },
    {
        default: () => ({
            videos: [],
            total: 0,
            channelCount: 0,
            latest: null,
            requested: 1,
            page: 1,
        }),
    },
)

const currentPage = computed(() => videoPage.value.page)

watch(
    [requestedPage, () => videoPage.value.requested, currentPage],
    async ([requested, resolvedRequest, page]) => {
        if (resolvedRequest !== requested || page === requested)
            return

        const query = { ...route.query }

        if (page === 1)
            delete query.page
        else
            query.page = String(page)

        await navigateTo({ path: route.path, query }, { replace: true })
    },
    { immediate: true },
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
        <VideoHero
            :count="videoPage.total"
            :channel-count="videoPage.channelCount"
            :latest-order="videoPage.latest?.order"
            :latest-title="videoPage.latest?.title"
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
            v-else-if="!videoPage.total"
            icon="i-tabler-player-play"
            title="暂无视频"
            description="精彩内容即将上线，敬请期待！"
        />

        <template v-else>
            <VideoList :videos="videoPage.videos" :total="videoPage.total" />
            <ContentPagination
                :page="currentPage"
                :page-size="paginationPageSize"
                :total="videoPage.total"
                base-path="/videos"
            />
        </template>
    </main>
</template>
