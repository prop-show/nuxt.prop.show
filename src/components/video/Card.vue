<script lang="ts" setup>
import type { Video } from '@/content'
import IconPlayerPlayFilled from '~icons/tabler/player-play-filled'
import { siteConfig } from '@/site-config'

import { videoCategoryColor, videoEpisode } from '@/utils/video'

const props = withDefaults(defineProps<{
    video: Video
    numbering?: 'global' | 'series'
}>(), {
    numbering: 'global',
})

const displayEpisode = computed(() => props.numbering === 'series'
    ? videoEpisode(props.video)
    : props.video.order)

// 全局归档里的序号是全局节目号，所以旁边要带上系列自己的集数，避免读成系列集数。
const metaLabel = computed(() => {
    if (!props.video.series)
        return props.video.category

    const label = `${props.video.category} / ${props.video.series}`

    return props.numbering === 'series'
        ? label
        : `${label} EP.${String(videoEpisode(props.video)).padStart(2, '0')}`
})

const { platforms: platformOptions } = siteConfig
</script>

<template>
    <SiteLink
        :to="video.path"
        class="group grid gap-5 border-b border-default px-1 py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5 lg:grid-cols-[7rem_1fr_12rem_2.5rem] lg:items-center"
    >
        <div>
            <div class="font-mono text-xl font-bold tracking-tight lg:text-2xl transition-colors group-hover:text-primary">
                EP.{{ String(displayEpisode).padStart(2, '0') }}
            </div>
            <div class="mt-2 flex items-center gap-2">
                <span class="size-2 rounded-full" :class="videoCategoryColor(video.category)" />
                <span class="font-mono text-[10px] font-bold tracking-[0.14em] text-dimmed">
                    {{ metaLabel }}
                </span>
            </div>
        </div>

        <div class="min-w-0">
            <h3 class="transition-colors group-hover:text-primary text-lg leading-[1.4] font-bold lg:text-xl">
                {{ video.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                {{ video.description }}
            </p>

            <TagList v-if="video.tags?.length" :tags="video.tags" :limit="4" class="mt-3" />
        </div>

        <div>
            <div class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                AVAILABLE ON
            </div>
            <div v-if="video.platforms" class="mt-3 flex flex-wrap gap-2">
                <span
                    v-for="platform in platformOptions"
                    :key="platform.key"
                    class="flex size-8 items-center justify-center border border-default text-muted transition-colors group-hover:text-highlighted"
                    :class="{ 'opacity-25': !video.platforms[platform.key as keyof typeof video.platforms] }"
                    :title="platform.name"
                >
                    <component :is="platform.icon" class="size-4" aria-hidden="true" />
                </span>
            </div>
        </div>

        <div class="hidden size-10 items-center justify-center border border-default text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black lg:flex">
            <IconPlayerPlayFilled aria-hidden="true" class="size-5 transition-transform group-hover:scale-110" />
        </div>
    </SiteLink>
</template>
