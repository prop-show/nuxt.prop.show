<script setup lang="ts">
import type { Creator } from '@/content'

defineProps<{
    creators: readonly Creator[]
    activeAuthor?: string
    resultCount: number
}>()

function creatorKey(creator: Creator) {
    return creator.stem.split('/').at(-1) || creator.stem
}
</script>

<template>
    <section class="my-8 md:my-10">
        <div>
            <div class="flex flex-col gap-2 py-2 sm:flex-row sm:items-start sm:gap-4">
                <div class="py-3 text-[13px] text-muted sm:shrink-0">
                    作者
                </div>

                <div class="flex flex-wrap gap-2">
                    <SiteLink
                        preserve-scroll
                        to="/works"
                        :aria-current="!activeAuthor ? 'true' : undefined"
                        class="filter-control inline-flex items-center border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        :class="!activeAuthor ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:bg-elevated hover:text-highlighted'"
                    >
                        全部成员
                    </SiteLink>

                    <SiteLink
                        v-for="creator in creators"
                        :key="creator.stem"
                        :aria-current="activeAuthor === creatorKey(creator) ? 'true' : undefined"
                        preserve-scroll
                        :to="activeAuthor === creatorKey(creator) ? '/works' : { path: '/works', query: { author: creatorKey(creator) } }"
                        class="filter-control inline-flex items-center gap-2 border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        :class="activeAuthor === creatorKey(creator) ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:bg-elevated hover:text-highlighted'"
                    >
                        <CreatorAvatar :creator="creator" size="xs" />
                        {{ creator.name }}
                    </SiteLink>
                </div>
            </div>
        </div>

        <div v-if="activeAuthor || !resultCount" class="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
            <span v-if="!resultCount">找到 0 件作品</span>
            <SiteLink v-if="activeAuthor" preserve-scroll to="/works" class="outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                清除筛选
            </SiteLink>
        </div>
    </section>
</template>
