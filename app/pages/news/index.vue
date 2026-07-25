<script lang="ts" setup>
import NewsLine from '~/components/NewsLine.vue'

const route = useRoute()
const { paginationPageSize } = useAppConfig()

const requestedPage = computed(() => {
    const page = Number.parseInt(String(route.query.page || '1'), 10)

    return Math.max(Number.isNaN(page) ? 1 : page, 1)
})

const { data: newsPage, pending } = useAsyncData(
    () => `news-page-${requestedPage.value}`,
    async () => {
        const requested = requestedPage.value
        const [total, latest] = await Promise.all([
            queryCollection('news').count('*'),
            queryCollection('news').order('date', 'DESC').first(),
        ])
        const lastPage = Math.max(1, Math.ceil(total / paginationPageSize))
        const page = Math.min(requested, lastPage)
        const news = await queryCollection('news')
            .order('date', 'DESC')
            .skip((page - 1) * paginationPageSize)
            .limit(paginationPageSize)
            .all()

        return { news, total, latest, requested, page }
    },
    {
        default: () => ({
            news: [],
            total: 0,
            latest: null,
            requested: 1,
            page: 1,
        }),
    },
)

const currentPage = computed(() => newsPage.value.page)
const pageOffset = computed(() => (currentPage.value - 1) * paginationPageSize)

watch(
    [requestedPage, () => newsPage.value.requested, currentPage],
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
    title: '速报 - prop.show',
    description: '第一时间获得前端库和工具的最新动态和更新消息。',
})
</script>

<template>
    <main>
        <NewsHero :count="newsPage.total" :latest-date="newsPage.latest?.date" />

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
            v-else-if="!newsPage.total"
            icon="i-tabler-hourglass-empty"
            title="还没有东西哦"
            description="暂时没有新的速报内容。请稍后再来看看！"
        />

        <template v-else>
            <NewsLine :news="newsPage.news" :total="newsPage.total" :offset="pageOffset" />
            <ContentPagination
                :page="currentPage"
                :page-size="paginationPageSize"
                :total="newsPage.total"
                base-path="/news"
            />
        </template>
    </main>
</template>
