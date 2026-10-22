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
    <section class="my-8 md:my-10">
        <SectionHeading title="作品目录">
            <span class="text-sm text-muted">
                共 {{ total }} 件作品
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
