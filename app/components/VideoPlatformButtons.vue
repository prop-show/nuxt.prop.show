<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

const { platforms, showTitle = true } = defineProps<{
    showTitle?: boolean
    platforms: VideosCollectionItem['platforms']
}>()

const { platforms: staticPlatforms } = useAppConfig()
</script>

<template>
    <div class="space-y-2 pt-2 prose">
        <h3 v-if="showTitle" class=" text-white">
            观看平台：
        </h3>
        <div class="flex flex-wrap gap-2 space-x-2">
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
