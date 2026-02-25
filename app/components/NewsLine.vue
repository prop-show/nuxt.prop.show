<script lang="ts" setup>
import type { NewsCollectionItem } from '@nuxt/content'

defineProps<{
    news: NewsCollectionItem[]
}>()
</script>

<template>
    <section class="space-y-4">
        <UCard v-for="item in news" :key="item.id" variant="subtle" class="hover:scale-101 duration-300">
            <NuxtLink :to="item.path" class="prose dark:prose-invert mx-auto">
                <h2> {{ item.title }} </h2>
                <p>{{ item.description }}</p>

                <div class="flex items-center gap-2 text-sm text-muted">
                    <Icon name="i-tabler-calendar" size="16" />
                    {{ item.date }}
                </div>
            </NuxtLink>
        </UCard>
    </section>
</template>
