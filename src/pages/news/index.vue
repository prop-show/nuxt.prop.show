<script setup lang="ts">
import type { Props } from '@/pages/news/index.server'
import IconHourglassEmpty from '~icons/tabler/hourglass-empty'

defineProps<Props>()
</script>

<template>
    <main>
        <NewsHero :count="newsPage.total" :latest-date="newsPage.latest?.date" />

        <section v-if="pending" class="my-20">
            <div class="mb-8 border-b border-default pb-5">
                <UiSkeleton class="mb-2 h-3 w-28" />
                <UiSkeleton class="h-8 w-56 lg:h-10" />
            </div>

            <div class="border-y border-default">
                <div v-for="index in 4" :key="index" class="grid gap-5 border-b border-default px-1 py-6 last:border-b-0 sm:px-5 md:grid-cols-[5rem_8rem_1fr_2.5rem] md:items-center">
                    <UiSkeleton class="h-4 w-12" />
                    <UiSkeleton class="h-4 w-24" />
                    <div class="space-y-3">
                        <UiSkeleton class="h-6 w-3/5" />
                        <UiSkeleton class="h-4 w-full" />
                    </div>
                    <UiSkeleton class="hidden size-10 md:block" />
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
