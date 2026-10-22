<script lang="ts" setup>
import type { Video } from '@/content'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import { siteConfig } from '@/site-config'

const { platforms, showTitle = true } = defineProps<{
    showTitle?: boolean
    platforms: Video['platforms']
}>()

const availablePlatforms = computed(() => siteConfig.platforms.flatMap((platform) => {
    const href = platforms?.[platform.key as keyof NonNullable<Video['platforms']>]
    return href ? [{ ...platform, href }] : []
}))
</script>

<template>
    <div v-if="availablePlatforms.length">
        <h3 v-if="showTitle" class="mb-4 text-lg font-bold">
            观看完整视频
        </h3>
        <div class="flex flex-wrap gap-3">
            <UiButton
                v-for="platform in availablePlatforms"
                :key="platform.key"
                :to="platform.href"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                class="min-h-12 w-full sm:w-auto"
            >
                <component :is="platform.icon" aria-hidden="true" />
                在 {{ platform.name }} 观看
                <IconArrowUpRight aria-hidden="true" />
            </UiButton>
        </div>
    </div>
</template>
