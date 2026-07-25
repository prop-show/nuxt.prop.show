<script lang="ts" setup>
const route = useRoute()
const { paginationPageSize } = useAppConfig()

const activeCategory = computed(() => typeof route.query.category === 'string' ? route.query.category : undefined)
const activeTag = computed(() => typeof route.query.tag === 'string' ? route.query.tag : undefined)

const requestedPage = computed(() => {
    const page = Number.parseInt(String(route.query.page || '1'), 10)

    return Math.max(Number.isNaN(page) ? 1 : page, 1)
})

const { data: videos, pending } = useAsyncData(
    'videos-archive',
    async () => {
        return queryCollection('videos').order('order', 'DESC').all()
    },
    { default: () => [] },
)

const categories = computed(() => [...new Set(videos.value.map(video => video.category))])
const tags = computed(() => [...new Set(videos.value.flatMap(video => video.tags || []))].sort())
const seriesCount = computed(() => videos.value.filter(video => video.series === '乙巳').length)
const filteredVideos = computed(() => videos.value.filter((video) => {
    const categoryMatches = !activeCategory.value || video.category === activeCategory.value
    const tagMatches = !activeTag.value || video.tags?.includes(activeTag.value)
    return categoryMatches && tagMatches
}))
const lastPage = computed(() => Math.max(1, Math.ceil(filteredVideos.value.length / paginationPageSize)))
const currentPage = computed(() => Math.min(requestedPage.value, lastPage.value))
const paginatedVideos = computed(() => filteredVideos.value.slice(
    (currentPage.value - 1) * paginationPageSize,
    currentPage.value * paginationPageSize,
))
const filterQuery = computed(() => ({
    ...(activeCategory.value ? { category: activeCategory.value } : {}),
    ...(activeTag.value ? { tag: activeTag.value } : {}),
}))

watch(
    [requestedPage, currentPage],
    async ([requested, page]) => {
        if (page === requested)
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
</script>

<template>
    <main>
        <VideoHero
            :count="videos.length"
            :channel-count="categories.length"
            :latest-order="videos[0]?.order"
            :latest-title="videos[0]?.title"
        />

        <VideoArchiveFilters
            :categories
            :tags
            :active-category="activeCategory"
            :active-tag="activeTag"
            :result-count="filteredVideos.length"
            :series-count
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
            v-else-if="!filteredVideos.length"
            icon="i-tabler-player-play"
            title="没有匹配的节目"
            description="换一个频道或标签，或者清除当前筛选。"
        >
            <template #actions>
                <UButton to="/videos" color="neutral" variant="outline">
                    清除筛选
                </UButton>
            </template>
        </UEmpty>

        <template v-else>
            <VideoList :videos="paginatedVideos" :total="filteredVideos.length" />
            <ContentPagination
                :page="currentPage"
                :page-size="paginationPageSize"
                :total="filteredVideos.length"
                base-path="/videos"
                :query="filterQuery"
            />
        </template>
    </main>
</template>
