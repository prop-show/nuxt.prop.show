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
    <section class="my-16">
        <div class="border-y border-default">
            <div class="grid gap-5 px-1 py-5 sm:px-5 lg:grid-cols-[8rem_1fr] lg:items-center">
                <div class="meta-label">
                    CREATOR
                </div>

                <div class="flex flex-wrap gap-2">
                    <SiteLink
                        to="/works"
                        class="inline-flex min-h-9 items-center border px-3 py-1.5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="!activeAuthor ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:border-primary hover:text-highlighted'"
                    >
                        全部成员
                    </SiteLink>

                    <SiteLink
                        v-for="creator in creators"
                        :key="creator.stem"
                        :to="activeAuthor === creatorKey(creator) ? '/works' : { path: '/works', query: { author: creatorKey(creator) } }"
                        class="inline-flex min-h-9 items-center gap-2 border px-2.5 py-1 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="activeAuthor === creatorKey(creator) ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:border-primary hover:text-highlighted'"
                    >
                        <CreatorAvatar :creator="creator" size="xs" />
                        {{ creator.name }}
                    </SiteLink>
                </div>
            </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
            <span>{{ String(resultCount).padStart(2, '0') }} MATCHES</span>
            <SiteLink v-if="activeAuthor" to="/works" class="transition-colors hover:text-highlighted">
                CLEAR FILTER
            </SiteLink>
        </div>
    </section>
</template>
