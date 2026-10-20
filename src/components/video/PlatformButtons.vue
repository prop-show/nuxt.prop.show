<script lang="ts" setup>
import type { Video } from '@/content'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'

import { siteConfig } from '@/site-config'

const { platforms, showTitle = true } = defineProps<{
    showTitle?: boolean
    platforms: Video['platforms']
}>()

const { platforms: staticPlatforms } = siteConfig

const availablePlatforms = computed(() => staticPlatforms.flatMap((platform) => {
    const href = platforms[platform.key as keyof typeof platforms]
    return href ? [{ ...platform, href }] : []
}))
</script>

<template>
    <div>
        <h3 v-if="showTitle" class="mb-4 text-lg leading-[1.4] font-bold lg:text-xl">
            观看平台
        </h3>

        <div v-if="platforms" class="grid gap-3 sm:grid-cols-2">
            <SiteLink
                v-for="platform in availablePlatforms"
                :key="platform.key"
                :to="platform.href"
                target="_blank"
                class="group flex items-center justify-between border border-default p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
            >
                <div class="flex items-center gap-3">
                    <span class="flex size-10 items-center justify-center bg-muted">
                        <component :is="platform.icon" class="size-5" aria-hidden="true" />
                    </span>
                    <div>
                        <div class="font-bold">
                            {{ platform.name }}
                        </div>
                    </div>
                </div>
                <IconArrowUpRight aria-hidden="true" class="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </SiteLink>
        </div>
    </div>
</template>
