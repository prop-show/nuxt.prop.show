<script setup lang="ts">
import type { NewsCollectionItem, VideosCollectionItem } from '@nuxt/content'

defineProps<{
    videos: VideosCollectionItem[]
    news: NewsCollectionItem[]
    videoTotal: number
    newsTotal: number
}>()

function formatDate(date: string) {
    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date.replace(' ', 'T')))
}
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 sm:flex-row sm:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    LATEST TRANSMISSIONS
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    最近更新
                </h2>
            </div>
            <p class="max-w-md text-sm leading-6 text-muted sm:text-right">
                从最新节目和前端速报开始。
            </p>
        </div>

        <div class="grid border-y border-default lg:grid-cols-2">
            <section class="lg:border-r lg:border-default">
                <div class="flex items-center justify-between border-b border-default px-1 py-4 sm:px-5">
                    <div class="flex items-center gap-3">
                        <Icon name="i-tabler-player-play-filled" class="size-5 text-primary" />
                        <h3 class="text-lg font-black">
                            最新视频
                        </h3>
                    </div>
                    <span class="font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
                        {{ String(videoTotal).padStart(2, '0') }} EPISODES
                    </span>
                </div>

                <div v-if="videos.length">
                    <NuxtLink
                        v-for="video in videos"
                        :key="video.id"
                        :to="video.path"
                        class="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-default px-1 py-5 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5"
                    >
                        <span class="font-mono text-sm font-black text-dimmed transition-colors group-hover:text-primary">
                            EP.{{ String(video.order).padStart(2, '0') }}
                        </span>
                        <div class="min-w-0">
                            <div class="truncate font-black transition-colors group-hover:text-primary">
                                <span v-if="video.series"> {{ `${video.series}:` }}</span>
                                {{ video.title }}
                            </div>
                        </div>
                        <Icon name="i-tabler-arrow-right" class="size-4 text-muted transition-transform group-hover:translate-x-1" />
                    </NuxtLink>
                </div>
                <div v-else class="px-1 py-8 text-sm text-muted sm:px-5">
                    暂无视频内容。
                </div>

                <NuxtLink to="/videos" class="group flex items-center justify-between border-t border-default px-1 py-4 text-sm font-bold outline-none transition-colors hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5">
                    查看节目档案
                    <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
            </section>

            <section>
                <div class="flex items-center justify-between border-b border-default px-1 py-4 sm:px-5">
                    <div class="flex items-center gap-3">
                        <Icon name="i-tabler-news" class="size-5 text-primary" />
                        <h3 class="text-lg font-black">
                            最新速报
                        </h3>
                    </div>
                    <span class="font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
                        {{ String(newsTotal).padStart(2, '0') }} REPORTS
                    </span>
                </div>

                <div v-if="news.length">
                    <NuxtLink
                        v-for="item in news"
                        :key="item.id"
                        :to="item.path"
                        class="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-default px-1 py-5 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5"
                    >
                        <time :datetime="item.date" class="font-mono text-sm font-black text-dimmed">
                            {{ formatDate(item.date) }}
                        </time>
                        <div class="min-w-0 truncate font-black transition-colors group-hover:text-primary">
                            {{ item.title }}
                        </div>
                        <Icon name="i-tabler-arrow-right" class="size-4 text-muted transition-transform group-hover:translate-x-1" />
                    </NuxtLink>
                </div>
                <div v-else class="px-1 py-8 text-sm text-muted sm:px-5">
                    暂无速报内容。
                </div>

                <NuxtLink to="/news" class="group flex items-center justify-between border-t border-default px-1 py-4 text-sm font-bold outline-none transition-colors hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5">
                    查看速报档案
                    <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
            </section>
        </div>
    </section>
</template>
