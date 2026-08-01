<script setup lang="ts">
const props = defineProps<{
    categories: string[]
    tags: string[]
    activeCategory?: string
    activeTag?: string
    resultCount: number
    seriesCount: number
}>()

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
    return navigateTo(filterLink(type, value))
}
</script>

<template>
    <section class="my-16">
        <NuxtLink
            to="/series/yisi"
            class="group mb-8 grid gap-5 border border-default bg-default/70 p-5 outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary sm:p-7 md:grid-cols-[1fr_auto] md:items-center"
        >
            <div>
                <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                    FEATURED SERIES / {{ String(seriesCount).padStart(2, '0') }} EPISODES
                </div>
                <h2 class="mt-2 text-2xl font-black md:text-3xl">
                    乙巳：从零构建完整产品
                </h2>
                <p class="mt-2 max-w-2xl text-sm leading-6 text-muted">
                    从技术选型到 API、数据库、前端、登录与缓存，按顺序查看完整课程目录。
                </p>
            </div>
            <div class="flex size-12 items-center justify-center border border-default text-muted transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                <Icon name="i-tabler-route" class="size-6" />
            </div>
        </NuxtLink>

        <div class="border-y border-default">
            <div class="grid gap-5 px-1 py-5 sm:px-5 lg:grid-cols-[8rem_1fr]">
                <div class="font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
                    CHANNEL
                </div>
                <div class="flex flex-wrap gap-2">
                    <button
                        type="button"
                        class="border px-3 py-1.5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="!activeCategory ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:border-primary hover:text-highlighted'"
                        @click="applyFilter('category')"
                    >
                        全部频道
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category"
                        type="button"
                        class="border px-3 py-1.5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="category === activeCategory ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:border-primary hover:text-highlighted'"
                        @click="applyFilter('category', category === activeCategory ? undefined : category)"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>

            <div class="grid gap-5 border-t border-default px-1 py-5 sm:px-5 lg:grid-cols-[8rem_1fr]">
                <div class="font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
                    TOPIC
                </div>
                <div class="flex flex-wrap gap-2">
                    <button
                        type="button"
                        class="border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="!activeTag ? 'border-primary bg-primary text-black' : 'border-default text-toned hover:border-primary hover:text-highlighted'"
                        @click="applyFilter('tag')"
                    >
                        ALL TAGS
                    </button>
                    <button
                        v-for="tag in tags"
                        :key="tag"
                        type="button"
                        class="border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="tag === activeTag ? 'border-primary bg-primary text-black' : 'border-default text-toned hover:border-primary hover:text-highlighted'"
                        @click="applyFilter('tag', tag === activeTag ? undefined : tag)"
                    >
                        {{ tag }}
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
            <span>{{ String(resultCount).padStart(2, '0') }} MATCHES</span>
            <NuxtLink v-if="activeCategory || activeTag" to="/videos" class="transition-colors hover:text-highlighted">
                CLEAR FILTERS
            </NuxtLink>
        </div>
    </section>
</template>
