<script setup lang="ts">
import type { Props } from '@/pages/videos/index.server'

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
            v-else-if="!resultCount"
            icon="i-tabler-player-play"
            title="没有匹配的节目"
            description="换个频道或标签，或清除筛选。"
        >
            <template #actions>
                <UButton to="/videos" color="neutral" variant="outline">
                    清除筛选
                </UButton>
            </template>
        </UEmpty>

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
