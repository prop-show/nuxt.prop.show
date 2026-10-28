<script setup lang="ts">
import type { Props } from '@/pages/news/index.server'
import IconHourglassEmpty from '~icons/tabler/hourglass-empty'
import NewsHero from '@/pages/news/_components/Hero.vue'
import NewsLine from '@/pages/news/_components/Line.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <NewsHero />

        <section v-if="pending" class="mt-10 mb-8 md:mt-16 md:mb-10" aria-label="正在加载速报">
            <div class="mb-6">
                <UiSkeleton class="h-4 w-20" />
            </div>

            <div class="border-y border-default">
                <div v-for="index in 4" :key="index" class="border-b border-default py-7 last:border-b-0">
                    <UiSkeleton class="h-6 w-24" />
                    <div class="mt-2 min-w-0">
                        <UiSkeleton class="h-[31px] w-3/5" />
                        <div class="mt-2 space-y-2 py-1.5">
                            <UiSkeleton class="h-5 w-full" />
                            <UiSkeleton class="h-5 w-4/5" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <UiEmpty v-else-if="!newsPage.total" class="my-20">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconHourglassEmpty aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>暂无速报</UiEmptyTitle>
                <UiEmptyDescription>新内容还在路上。</UiEmptyDescription>
            </UiEmptyHeader>
        </UiEmpty>

        <template v-else>
            <NewsLine :news="newsPage.news" :total="newsPage.total" />
            <ContentPagination
                :page="currentPage"
                :page-size="paginationPageSize"
                :total="newsPage.total"
                base-path="/news"
            />
        </template>
    </main>
</template>
