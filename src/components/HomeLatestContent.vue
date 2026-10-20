<script setup lang="ts">
import type { News, Video } from '@/content'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconPlayerPlayFilled from '~icons/tabler/player-play-filled'

defineProps<{
    videos: Video[]
    news: News[]
    videoTotal: number
    newsTotal: number
}>()
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="LATEST VIDEOS" title="最近更新" />

        <div class="grid border-y border-default lg:grid-cols-1">
            <section class="lg:border-default">
                <div class="flex items-center justify-between border-b border-default px-1 py-4 sm:px-5">
                    <div class="flex items-center gap-3">
                        <IconPlayerPlayFilled aria-hidden="true" class="size-5 text-primary" />
                        <h3 class=" text-lg leading-[1.4] font-bold lg:text-xl">
                            最新视频
                        </h3>
                    </div>
                    <span class="font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
                        {{ String(videoTotal).padStart(2, '0') }} EPISODES
                    </span>
                </div>

                <div v-if="videos.length">
                    <SiteLink
                        v-for="video in videos"
                        :key="video.stem"
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
                        <IconArrowRight aria-hidden="true" class="size-4 text-muted transition-transform group-hover:translate-x-1" />
                    </SiteLink>
                </div>
                <div v-else class="px-1 py-8 text-sm text-muted sm:px-5">
                    暂无视频内容。
                </div>

                <SiteLink to="/videos" class="group flex items-center justify-between border-t border-default px-1 py-4 text-sm font-bold outline-none transition-colors hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5">
                    全部视频
                    <IconArrowRight aria-hidden="true" class="size-4 transition-transform group-hover:translate-x-1" />
                </SiteLink>
            </section>
        </div>
    </section>
</template>
