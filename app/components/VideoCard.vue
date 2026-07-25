<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

const props = withDefaults(defineProps<{
    video: VideosCollectionItem
    numbering?: 'global' | 'series'
}>(), {
    numbering: 'global',
})

const displayEpisode = computed(() => props.numbering === 'series'
    ? props.video.episode ?? props.video.order
    : props.video.order)

function getCategoryColor(category: string) {
    switch (category) {
        case '构建现场':
            return 'bg-blue-500'
        case '工具雷达':
            return 'bg-green-500'
        case '开发者会客厅':
            return 'bg-purple-500'
        default:
            return 'bg-gray-500'
    }
}

const { platforms: platformOptions } = useAppConfig()
</script>

<template>
    <NuxtLink
        :to="video.path"
        class="group grid gap-5 border-b border-default px-1 py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5 lg:grid-cols-[7rem_1fr_12rem_2.5rem] lg:items-center"
    >
        <div>
            <div class="font-mono text-2xl font-black tracking-[-0.06em] transition-colors group-hover:text-primary">
                EP.{{ String(displayEpisode).padStart(2, '0') }}
            </div>
            <div class="mt-2 flex items-center gap-2">
                <span class="size-2 rounded-full" :class="getCategoryColor(video.category)" />
                <span class="font-mono text-[10px] font-bold tracking-[0.14em] text-dimmed">
                    {{ video.category }}
                    <template v-if="video.series">
                        / {{ video.series }}
                    </template>
                </span>
            </div>
        </div>

        <div class="min-w-0">
            <h3 class="text-lg font-black transition-colors group-hover:text-primary md:text-xl">
                {{ video.series && `${video.series}:` || '' }}
                {{ video.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                {{ video.description }}
            </p>

            <div v-if="video.tags?.length" class="mt-3 flex flex-wrap gap-2">
                <span
                    v-for="tag in video.tags.slice(0, 4)"
                    :key="tag"
                    class="border border-default px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-toned"
                >
                    {{ tag }}
                </span>
            </div>
        </div>

        <div>
            <div class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                AVAILABLE ON
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
                <span
                    v-for="platform in platformOptions"
                    :key="platform.key"
                    class="flex size-8 items-center justify-center border border-default text-muted transition-colors group-hover:text-highlighted"
                    :class="{ 'opacity-25': !video.platforms[platform.key as keyof typeof video.platforms] }"
                    :title="platform.name"
                >
                    <Icon :name="platform.icon" class="size-4" />
                </span>
            </div>
        </div>

        <div class="hidden size-10 items-center justify-center border border-default text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black lg:flex">
            <Icon name="i-tabler-player-play-filled" class="size-5 transition-transform group-hover:scale-110" />
        </div>
    </NuxtLink>
</template>
