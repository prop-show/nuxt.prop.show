<script setup lang="ts">
import type { CreatorsCollectionItem, WorksCollectionItem } from '@nuxt/content'

const props = defineProps<{
    works: WorksCollectionItem[]
    creators: CreatorsCollectionItem[]
    total: number
}>()

const creatorsByKey = computed(() => new Map(
    props.creators.map(creator => [creator.stem.split('/').at(-1) || creator.stem, creator]),
))
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex items-end justify-between border-b border-default pb-5">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    WORK ARCHIVE
                </div>
                <h2 class="text-3xl font-black md:text-4xl">
                    团队作品
                </h2>
            </div>
            <span class="hidden font-mono text-xs font-bold tracking-[0.18em] text-dimmed sm:block">
                {{ String(total).padStart(2, '0') }} WORKS
            </span>
        </div>

        <div class="overflow-hidden border-y border-default">
            <WorkCard
                v-for="work in works"
                :key="work.id"
                :work
                :creator="creatorsByKey.get(work.author)"
            />
        </div>
    </section>
</template>
