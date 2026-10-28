<script setup lang="ts">
import { useRouter } from '@void/vue'
import { resolveLink } from '@/navigation'

const props = defineProps<{
    categories: string[]
    tags: string[]
    activeCategory?: string
    activeTag?: string
    resultCount: number
    seriesCount: number
}>()

const router = useRouter()

function filterLink(type: 'category' | 'tag', value?: string) {
    const query: Record<string, string> = {}
    const category = type === 'category' ? value : props.activeCategory
    const tag = type === 'tag' ? value : props.activeTag

    if (category)
        query.category = category
    if (tag)
        query.tag = tag

    return Object.keys(query).length ? { path: '/videos', query } : '/videos'
}

function applyFilter(type: 'category' | 'tag', value?: string) {
    return router.visit(resolveLink(filterLink(type, value)), { preserveScroll: true })
}
</script>

<template>
    <section class="my-8 md:my-10">
        <SiteLink
            to="/series/yisi"
            class="mb-4 inline-flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-sm outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
            <span class="text-[13px] text-muted">系列</span>
            <span class="min-w-0">
                乙巳：从零构建完整产品
            </span>
            <span class="whitespace-nowrap text-[13px] text-muted">{{ seriesCount }} 集 →</span>
        </SiteLink>

        <div>
            <div class="flex flex-col gap-2 py-2 sm:flex-row sm:items-start sm:gap-4">
                <div class="py-3 text-[13px] text-muted sm:shrink-0">
                    分类
                </div>
                <div class="flex flex-wrap gap-2">
                    <button
                        type="button"
                        class="filter-control border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        :aria-pressed="!activeCategory"
                        :class="!activeCategory ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:bg-elevated hover:text-highlighted'"
                        @click="applyFilter('category')"
                    >
                        全部分类
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category"
                        type="button"
                        class="filter-control border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        :aria-pressed="category === activeCategory"
                        :class="category === activeCategory ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:bg-elevated hover:text-highlighted'"
                        @click="applyFilter('category', category === activeCategory ? undefined : category)"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>

            <details class="group/tags">
                <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    <span><span class="mr-3 text-[13px] text-muted">标签</span>{{ activeTag || '全部标签' }}</span>
                    <span class="text-[13px] text-muted group-open/tags:hidden">展开标签</span>
                    <span class="hidden text-[13px] text-muted group-open/tags:inline">收起标签</span>
                </summary>
                <div class="flex flex-wrap gap-2 pb-4">
                    <button
                        type="button"
                        class="filter-control border px-2.5 py-1 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        :aria-pressed="!activeTag"
                        :class="!activeTag ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:bg-elevated hover:text-highlighted'"
                        @click="applyFilter('tag')"
                    >
                        全部标签
                    </button>
                    <button
                        v-for="tag in tags"
                        :key="tag"
                        type="button"
                        class="filter-control border px-2.5 py-1 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        :aria-pressed="tag === activeTag"
                        :class="tag === activeTag ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:bg-elevated hover:text-highlighted'"
                        @click="applyFilter('tag', tag === activeTag ? undefined : tag)"
                    >
                        {{ tag }}
                    </button>
                </div>
            </details>
        </div>

        <div v-if="activeCategory || activeTag" class="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
            <span class="tabular-nums">找到 {{ resultCount }} 期</span>
            <SiteLink preserve-scroll to="/videos" class="outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                清除筛选
            </SiteLink>
        </div>
    </section>
</template>
