<script lang="ts" setup>
import type { NewsCollectionItem } from '@nuxt/content'

defineProps<{
    news: NewsCollectionItem[]
}>()
</script>

<template>
    <section class="space-y-4">
        <UCard v-for="item in news" :key="item.id" variant="subtle">
            <NuxtLink :to="item.path" class="prose dark:prose-invert mx-auto">
                <h2> {{ item.title }} </h2>
                <p>{{ item.description }}</p>
            </NuxtLink>
        </UCard>
    </section>
</template>
