<script setup lang="ts">
import type { Props } from '@/pages/works/index.server'
import IconAlertTriangle from '~icons/tabler/alert-triangle'
import IconArchiveOff from '~icons/tabler/archive-off'
import IconUserSearch from '~icons/tabler/user-search'
import WorkArchiveFilters from '@/pages/works/_components/ArchiveFilters.vue'
import WorkHero from '@/pages/works/_components/Hero.vue'
import WorkList from '@/pages/works/_components/List.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <WorkHero />

        <section v-if="pending" class="my-8 md:my-10" aria-label="正在加载作品">
            <div class="flex flex-col gap-2 py-2 sm:flex-row sm:items-start sm:gap-4">
                <UiSkeleton class="my-3 h-5 w-7" />
                <div class="flex flex-wrap gap-2">
                    <UiSkeleton class="h-9 w-20" />
                    <UiSkeleton class="h-9 w-28" />
                    <UiSkeleton class="h-9 w-28" />
                </div>
            </div>

            <div class="my-8 md:my-10">
                <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <UiSkeleton class="h-[31px] w-24 lg:h-[39px] lg:w-30" />
                    <UiSkeleton class="h-5 w-24" />
                </div>
                <div class="border-y border-default">
                    <div v-for="index in 3" :key="index" class="grid gap-5 border-b border-default px-1 py-7 last:border-b-0 sm:px-5 lg:grid-cols-[minmax(0,1fr)_14rem_1.25rem] lg:items-center">
                        <div class="min-w-0">
                            <UiSkeleton class="h-6 w-16" />
                            <UiSkeleton class="mt-2 h-[31px] w-3/5" />
                            <div class="mt-2 space-y-2 py-1.5">
                                <UiSkeleton class="h-5 w-full" />
                                <UiSkeleton class="h-5 w-4/5" />
                            </div>
                            <UiSkeleton class="mt-3 h-6 w-40" />
                        </div>
                        <div class="flex items-center gap-3">
                            <UiSkeleton class="size-10 shrink-0" />
                            <div>
                                <UiSkeleton class="h-5 w-24" />
                                <UiSkeleton class="mt-0.5 h-6 w-28" />
                            </div>
                        </div>
                        <UiSkeleton class="hidden size-5 lg:block" />
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
