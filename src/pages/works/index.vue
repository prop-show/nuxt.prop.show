<script setup lang="ts">
import type { Props } from '@/pages/works/index.server'
import IconAlertTriangle from '~icons/tabler/alert-triangle'
import IconArchiveOff from '~icons/tabler/archive-off'
import IconUserSearch from '~icons/tabler/user-search'

defineProps<Props>()
</script>

<template>
    <main>
        <WorkHero />

        <section v-if="pending" class="my-16">
            <div class="mb-8 border-y border-default px-1 py-5 sm:px-5">
                <UiSkeleton class="h-9 w-80 max-w-full" />
            </div>

            <div class="my-20">
                <div class="mb-8 border-b border-default pb-5">
                    <UiSkeleton class="mb-2 h-3 w-28" />
                    <UiSkeleton class="h-8 w-56 lg:h-10" />
                </div>
                <div class="border-y border-default">
                    <div v-for="index in 3" :key="index" class="grid gap-5 border-b border-default px-1 py-7 last:border-b-0 sm:px-5 lg:grid-cols-[minmax(0,1fr)_14rem_2.5rem] lg:items-center">
                        <div class="space-y-3">
                            <UiSkeleton class="h-3 w-16" />
                            <UiSkeleton class="h-6 w-3/5" />
                            <UiSkeleton class="h-4 w-full" />
                            <UiSkeleton class="h-5 w-40" />
                        </div>
                        <UiSkeleton class="h-10 w-40" />
                        <UiSkeleton class="hidden size-10 lg:block" />
                    </div>
                </div>
            </div>
        </section>

        <UiAlert
            v-else-if="error"
            class="my-20"
            variant="destructive"
        >
            <IconAlertTriangle aria-hidden="true" />
            <UiAlertTitle>作品加载失败</UiAlertTitle>
            <UiAlertDescription>刷新页面重试。</UiAlertDescription>
        </UiAlert>

        <UiEmpty
            v-else-if="!archive.works.length"
            class="my-20"
        >
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconArchiveOff aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>暂无团队作品</UiEmptyTitle>
                <UiEmptyDescription>作品整理中。</UiEmptyDescription>
            </UiEmptyHeader>
        </UiEmpty>

        <template v-else>
            <WorkArchiveFilters
                :creators="archive.creators"
                :active-author="activeAuthor"
                :result-count="filteredWorks.length"
            />

            <UiEmpty
                v-if="!filteredWorks.length"
                class="my-20"
            >
                <UiEmptyHeader>
                    <UiEmptyMedia variant="icon">
                        <IconUserSearch aria-hidden="true" />
                    </UiEmptyMedia>
                    <UiEmptyTitle>没有匹配的作品</UiEmptyTitle>
                    <UiEmptyDescription>试试其他成员，或清除筛选。</UiEmptyDescription>
                </UiEmptyHeader>
                <UiEmptyContent>
                    <UiButton to="/works" variant="outline">
                        清除筛选
                    </UiButton>
                </UiEmptyContent>
            </UiEmpty>

            <template v-else>
                <WorkList
                    :works="paginated"
                    :creators="archive.creators"
                    :total="filteredWorks.length"
                />
                <ContentPagination
                    :page="currentPage"
                    :page-size="pageSize"
                    :total="filteredWorks.length"
                    base-path="/works"
                    :query="paginationQuery"
                />
            </template>
        </template>
    </main>
</template>
