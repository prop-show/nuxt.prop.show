<script setup lang="ts">
import type { CreatorsCollectionItem } from '@nuxt/content'

defineProps<{
    creators: CreatorsCollectionItem[]
    activeAuthor?: string
    resultCount: number
}>()

function creatorKey(creator: CreatorsCollectionItem) {
    return creator.stem.split('/').at(-1) || creator.stem
}
</script>

<template>
    <section class="my-16">
        <div class="border-y border-default">
            <div class="grid gap-5 px-1 py-5 sm:px-5 lg:grid-cols-[8rem_1fr] lg:items-center">
                <div class="font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
                    CREATOR
                </div>

                <div class="flex flex-wrap gap-2">
                    <NuxtLink
                        to="/works"
                        class="inline-flex min-h-9 items-center border px-3 py-1.5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="!activeAuthor ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:border-primary hover:text-highlighted'"
                    >
                        全部成员
                    </NuxtLink>

                    <NuxtLink
                        v-for="creator in creators"
                        :key="creator.id"
                        :to="activeAuthor === creatorKey(creator) ? '/works' : { path: '/works', query: { author: creatorKey(creator) } }"
                        class="inline-flex min-h-9 items-center gap-2 border px-2.5 py-1 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                        :class="activeAuthor === creatorKey(creator) ? 'border-primary bg-primary text-black' : 'border-default text-muted hover:border-primary hover:text-highlighted'"
                    >
                        <img
                            width="24"
                            height="24"
                            :src="creator.avatar"
                            :alt="`${creator.name} avatar`"
                            class="size-6 rounded-full object-cover"
                            loading="lazy"
                            decoding="async"
                        >
                        {{ creator.name }}
                    </NuxtLink>
                </div>
            </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-4 font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
            <span>{{ String(resultCount).padStart(2, '0') }} MATCHES</span>
            <NuxtLink v-if="activeAuthor" to="/works" class="transition-colors hover:text-highlighted">
                CLEAR FILTER
            </NuxtLink>
        </div>
    </section>
</template>
