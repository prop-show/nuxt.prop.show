<script lang="ts" setup>
import { p } from "#build/ui/prose"
import type { VideosCollectionItem } from "@nuxt/content"

const { platforms } = defineProps<{
  platforms: VideosCollectionItem["platforms"]
}>()

const platformInfo = {
  bilibili: { key: "bilibili", name: "BiliBili", icon: "i-tabler-brand-bilibili" },
  douyin: { key: "douyin", name: "抖音", icon: "i-tabler-brand-tiktok" },
  youtube: { key: "youtube", name: "YouTube", icon: "i-tabler-brand-youtube" },
} as const
</script>

<template>
  <div className="space-y-2 pt-2">
    <div className=" text-white text-sm">观看平台：</div>
    <div className="flex flex-wrap gap-2">
      <UButton
        v-for="platform in platformInfo"
        :icon="platform.icon"
        variant="outline"
        color="neutral"
        :to="platforms[platform.key]"
        target="_blank"
      >
        {{ platform.name }}
      </UButton>
    </div>
  </div>
</template>
