<script setup lang="ts">
import type { Props } from '@/pages/videos/index.server'
import IconPlayerPlay from '~icons/tabler/player-play'
import VideoArchiveFilters from '@/pages/videos/_components/ArchiveFilters.vue'
import VideoHero from '@/pages/videos/_components/Hero.vue'
import VideoList from '@/pages/videos/_components/List.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <VideoHero />

        <VideoArchiveFilters
            :categories
            :tags
            :active-category="activeCategory"
            :active-tag="activeTag"
            :result-count="resultCount"
            :series-count
        />

        <section v-if="pending" class="mt-10 mb-8 md:mt-16 md:mb-10">
            <div class="mb-6">
                <UiSkeleton class="h-4 w-28" />
            </div>

            <div>
                <div v-for="index in 5" :key="index" class="space-y-3 border-b border-default py-7">
                    <UiSkeleton class="h-8 w-3/5" />
                    <UiSkeleton class="h-4 w-40" />
                    <UiSkeleton class="h-5 w-full" />
                    <UiSkeleton class="h-5 w-4/5" />
                    <UiSkeleton class="h-4 w-32" />
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
