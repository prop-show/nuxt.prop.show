<script lang="ts" setup>
import type { NewsCollectionItem } from "@nuxt/content"

defineProps<{
  news: NewsCollectionItem[]
}>()
</script>

<template>
  <section class="space-y-4">
    <UCard v-for="item in news" :key="item.id">
      <template #header>
        <h3 class="text-lg font-bold">{{ item.title }}</h3>
      </template>
      <ContentRenderer :value="item.meta" />
    </UCard>
  </section>
</template>
