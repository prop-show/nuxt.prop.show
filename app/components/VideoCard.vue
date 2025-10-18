<script lang="ts" setup>
import type { VideosCollectionItem } from "@nuxt/content"

const { video } = defineProps<{
  video: VideosCollectionItem
}>()

const getCategoryColor = (category: string) => {
  switch (category) {
    case "基石 Prop":
      return "bg-blue-500"
    case "酷炫 Prop":
      return "bg-green-500"
    case "闲聊 Prop":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}
</script>

<template>
  <UCard class="group hover:shadow-lg transition-all">
    <div class="relative overflow-hidden rounded-t-lg">
      <div class="aspect-video flex items-center justify-center">
        <img :src="video.thumbnail" :alt="video.title" layout="fill" objectFit="cover" />
      </div>
      <div class="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
        <IconClockHour3 class="size-3" />
        {{ video.duration }}
      </div>
    </div>

    <div class="flex items-start justify-between pt-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <div :class="['w-3 h-3 rounded-full', `${getCategoryColor(video.category)}`]" />
          <span class="text-sm text-muted-foreground">{{ video.category }}</span>
        </div>
        <h3 class="text-lg font-black group-hover:text-primary transition-colors">{{ video.title }}</h3>
      </div>
    </div>

    <p class="line-clamp-3 text-sm text-muted py-2">{{ video.description }}</p>

    <VideoPlatformButtons :platforms="video.platforms" />
  </UCard>
</template>
