<script lang="ts" setup>
import type { NewsCollectionItem } from '@nuxt/content'

defineProps<{
  news: NewsCollectionItem[]
}>()
</script>

<template>
  <section class="space-y-4">
    <template v-for="item in news" :key="item.id">
      <NuxtLink :to="item.path" class="border rounded-md border-primary/40 p-4 block prose dark:prose-invert mx-auto prose:a">
        <h2> {{ item.title }} </h2>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </template>
  </section>
</template>
