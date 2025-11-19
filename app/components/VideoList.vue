<script lang="ts" setup>
import type { VideosCollectionItem } from "@nuxt/content"

const { videos = [] } = defineProps<{
  videos?: VideosCollectionItem[]
}>()
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <VideoCard v-for="video in videos" :key="video.id" :video="video" />
  </section>
</template>
