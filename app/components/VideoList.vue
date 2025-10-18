<script lang="ts" setup>
import type { VideosCollectionItem } from "@nuxt/content"

const { videos = [] } = defineProps<{
  videos?: VideosCollectionItem[]
}>()
</script>

<template>
  <section>
    <div v-if="!videos.length">
      <UCard class="text-center py-12">
        <template #header>
          <Icon name="i-tabler-player-play" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-muted mb-2">暂无视频</h3>
          <p class="text-muted">精彩内容即将上线，敬请期待！</p>
        </template>
      </UCard>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VideoCard v-for="video in videos" :key="video.id" :video="video" />
    </div>
  </section>
</template>
