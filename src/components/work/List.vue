<script setup lang="ts">
import type { Creator, Work } from '@/content'

const props = defineProps<{
    works: Work[]
    creators: readonly Creator[]
    total: number
}>()

const creatorsByKey = computed(() => new Map(
    props.creators.map(creator => [creator.stem.split('/').at(-1) || creator.stem, creator]),
))
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="WORK ARCHIVE" title="团队作品">
            <span class="section-count hidden sm:block">
                {{ String(total).padStart(2, '0') }} WORKS
            </span>
        </SectionHeading>

        <div class="overflow-hidden border-y border-default">
            <WorkCard
                v-for="work in works"
                :key="work.stem"
                :work
                :creator="creatorsByKey.get(work.author)"
            />
        </div>
    </section>
</template>
