<script setup lang="ts">
import type { Props } from '@/pages/videos/index.server'
import IconPlayerPlay from '~icons/tabler/player-play'

defineProps<Props>()
</script>

<template>
    <main>
        <VideoHero
            :count="videoTotal"
            :channel-count="categories.length"
            :latest-order="latestVideo?.order"
            :latest-title="latestVideo?.title"
        />

        <VideoArchiveFilters
            :categories
            :tags
            :active-category="activeCategory"
            :active-tag="activeTag"
            :result-count="resultCount"
            :series-count
        />

        <section v-if="pending" class="my-20">
            <div class="mb-8 border-b border-default pb-5">
                <UiSkeleton class="mb-2 h-3 w-28" />
                <UiSkeleton class="h-8 w-56 lg:h-10" />
            </div>

            <div class="border-y border-default">
                <div v-for="index in 5" :key="index" class="grid gap-5 border-b border-default px-1 py-7 last:border-b-0 sm:px-5 lg:grid-cols-[7rem_1fr_12rem_2.5rem] lg:items-center">
                    <div class="space-y-3">
                        <UiSkeleton class="h-8 w-16" />
                        <UiSkeleton class="h-3 w-20" />
                    </div>
                    <div class="space-y-3">
                        <UiSkeleton class="h-6 w-3/5" />
                        <UiSkeleton class="h-4 w-full" />
                        <div class="flex gap-2">
                            <UiSkeleton class="h-5 w-14" />
                            <UiSkeleton class="h-5 w-18" />
                        </div>
                    </div>
                    <UiSkeleton class="h-8 w-32" />
                    <UiSkeleton class="hidden size-10 lg:block" />
                </div>
            </div>
        </section>

        <UiEmpty v-else-if="!resultCount" class="my-20">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconPlayerPlay aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>没有匹配的视频</UiEmptyTitle>
                <UiEmptyDescription>试试其他分类或标签。</UiEmptyDescription>
            </UiEmptyHeader>
            <UiEmptyContent>
                <UiButton to="/videos" variant="outline">
                    清除筛选
                </UiButton>
            </UiEmptyContent>
        </UiEmpty>

        <template v-else>
            <VideoList :videos="paginated" :total="resultCount" />
            <ContentPagination
                :page="currentPage"
                :page-size="pageSize"
                :total="resultCount"
                base-path="/videos"
                :query="filterQuery"
            />
        </template>
    </main>
</template>
