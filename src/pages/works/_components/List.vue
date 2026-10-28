<script setup lang="ts">
import type { Creator, Work } from '@/content'
import WorkCard from '@/pages/works/_components/Card.vue'

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
    <section class="mt-10 mb-8 md:mt-16 md:mb-10" aria-label="作品列表">
        <h2 class="sr-only">
            作品列表
        </h2>
        <SectionHeading>
            <span class="text-sm text-muted tabular-nums">
                共 {{ total }} 件
            </span>
        </SectionHeading>

        <TransitionGroup name="archive" tag="div" class="overflow-hidden border-y border-default">
            <WorkCard
                v-for="work in works"
                :key="work.stem"
                :work
                :creator="creatorsByKey.get(work.author)"
            />
        </TransitionGroup>
    </section>
</template>
