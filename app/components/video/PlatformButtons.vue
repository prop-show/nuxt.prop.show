<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

const { platforms, showTitle = true } = defineProps<{
    showTitle?: boolean
    platforms: VideosCollectionItem['platforms']
}>()

const { platforms: staticPlatforms } = useAppConfig()

const availablePlatforms = computed(() => staticPlatforms.filter(platform =>
    platforms && platforms[platform.key as keyof typeof platforms],
))
</script>

<template>
    <div>
        <h3 v-if="showTitle" class="mb-4 text-xl font-black">
            观看平台
        </h3>

        <div v-if="platforms" class="grid gap-3 sm:grid-cols-2">
            <NuxtLink
                v-for="platform in availablePlatforms"
                :key="platform.key"
                :to="platforms[platform.key as keyof typeof platforms]"
                target="_blank"
                class="group flex items-center justify-between border border-default p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
            >
                <div class="flex items-center gap-3">
                    <span class="flex size-10 items-center justify-center bg-muted">
                        <Icon :name="platform.icon" class="size-5" />
                    </span>
                    <div>
                        <div class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                            WATCH ON
                        </div>
                        <div class="mt-1 font-black">
                            {{ platform.name }}
                        </div>
                    </div>
                </div>
                <Icon name="i-tabler-arrow-up-right" class="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </NuxtLink>
        </div>
    </div>
</template>
