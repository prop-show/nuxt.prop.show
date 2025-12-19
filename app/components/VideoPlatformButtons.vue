<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

const { platforms } = defineProps<{
    platforms: VideosCollectionItem['platforms']
}>()

const { platforms: staticPlatforms } = useAppConfig()
</script>

<template>
    <div className="space-y-2 pt-2">
        <div className=" text-white text-sm">
            观看平台：
        </div>
        <div className="flex flex-wrap gap-2 space-x-2">
            <UButton
                v-for="platform in staticPlatforms"
                :key="platform.key"
                :icon="platform.icon"
                variant="outline"
                color="neutral"
                :to="platforms[platform.key as keyof typeof platforms]"
                target="_blank"
            >
                {{ platform.name }}
            </UButton>
        </div>
    </div>
</template>
