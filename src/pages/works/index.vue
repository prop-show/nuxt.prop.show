<script setup lang="ts">
import type { Props } from '@/pages/works/index.server'

defineProps<Props>()
</script>

<template>
    <main>
        <WorkHero />

        <section v-if="pending" class="my-16">
            <div class="mb-8 border-y border-default px-1 py-5 sm:px-5">
                <USkeleton class="h-9 w-80 max-w-full" />
            </div>

            <div class="my-20">
                <div class="mb-8 border-b border-default pb-5">
                    <USkeleton class="mb-2 h-3 w-28" />
                    <USkeleton class="h-10 w-56" />
                </div>
                <div class="border-y border-default">
                    <div v-for="index in 3" :key="index" class="grid gap-5 border-b border-default px-1 py-7 last:border-b-0 sm:px-5 lg:grid-cols-[minmax(0,1fr)_14rem_2.5rem] lg:items-center">
                        <div class="space-y-3">
                            <USkeleton class="h-3 w-16" />
                            <USkeleton class="h-6 w-3/5" />
                            <USkeleton class="h-4 w-full" />
                            <USkeleton class="h-5 w-40" />
                        </div>
                        <USkeleton class="h-10 w-40" />
                        <USkeleton class="hidden size-10 lg:block" />
                    </div>
                </div>
            </div>
        </section>

        <UAlert
            v-else-if="error"
            class="my-20"
            color="error"
            variant="subtle"
            icon="i-tabler-alert-triangle"
            title="作品档案加载失败"
            description="刷新页面重试。"
        />

        <UEmpty
            v-else-if="!archive.works.length"
            class="my-20"
            icon="i-tabler-archive-off"
            title="暂无团队作品"
            description="新的作品资料整理完成后会显示在这里。"
        />

        <template v-else>
            <WorkArchiveFilters
                :creators="archive.creators"
                :active-author="activeAuthor"
                :result-count="filteredWorks.length"
            />

            <UEmpty
                v-if="!filteredWorks.length"
                class="my-20"
                icon="i-tabler-user-search"
                title="没有匹配的作品"
                description="该作者不存在，或暂无归档作品。"
            >
                <template #actions>
                    <UButton to="/works" color="neutral" variant="outline">
                        清除作者筛选
                    </UButton>
                </template>
            </UEmpty>

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
