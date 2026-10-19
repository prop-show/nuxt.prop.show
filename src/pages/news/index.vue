<script setup lang="ts">
import type { Props } from '@/pages/news/index.server'

defineProps<Props>()
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
            title="暂无速报"
            description="新内容还在路上。"
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
