<script lang="ts" setup>
import type { Video } from '@/content'
import { siteConfig } from '@/site-config'

import { videoEpisode } from '@/utils/video'

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

const availablePlatforms = computed(() => siteConfig.platforms.filter(platform =>
    props.video.platforms?.[platform.key as keyof NonNullable<Video['platforms']>],
))
</script>

<template>
    <SiteLink
        :to="video.path"
        class="content-link group grid gap-5 border-b border-default py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        :class="video.cover ? 'sm:grid-cols-[minmax(0,1fr)_9rem] sm:items-start' : ''"
    >
        <div class="min-w-0">
            <h3 class="text-[22px] leading-[1.4] font-bold text-highlighted transition-colors group-hover:text-primary">
                {{ video.title }}
            </h3>
            <p class="mt-2 truncate text-[13px] leading-6 text-muted" :title="metaLabel">
                <span class="font-mono">{{ numbering === 'series' ? 'EP.' : '第' }}{{ String(displayEpisode).padStart(2, '0') }}{{ numbering === 'global' ? '期' : '' }}</span>
                <span class="mx-2" aria-hidden="true">·</span>
                {{ metaLabel }}
            </p>
            <p class="mt-2 line-clamp-2 text-base leading-7 text-muted">
                {{ video.description }}
            </p>
            <div v-if="availablePlatforms.length" class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted">
                <span
                    v-for="platform in availablePlatforms"
                    :key="platform.key"
                    class="inline-flex items-center gap-1.5"
                >
                    <component :is="platform.icon" class="size-4" aria-hidden="true" />
                    {{ platform.name }}
                </span>
            </div>
        </div>

        <img
            v-if="video.cover"
            :src="video.cover"
            alt=""
            width="480"
            height="270"
            loading="lazy"
            class="aspect-video w-full bg-elevated object-cover"
        >
    </SiteLink>
</template>
