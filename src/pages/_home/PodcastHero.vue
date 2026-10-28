<script setup lang="ts">
import type { Video } from '@/content'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconPlayerPlayFilled from '~icons/tabler/player-play-filled'
import { seriesConfig } from '@/series-config'

defineProps<{ video?: Video }>()

const series = seriesConfig.yisi
</script>

<template>
    <header class="py-10 sm:py-14 lg:py-16">
        <div class="mb-9 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <h1 class="max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl">
                前端实践，持续记录。
            </h1>
            <p class="max-w-xs text-base leading-7 text-muted">
                开发者共创的视频与技术速报。<br>从真实项目中，找到下一步。
            </p>
        </div>

        <article v-if="video" class="grid overflow-hidden bg-primary text-black lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div class="min-w-0 p-6 sm:p-10 lg:p-12">
                <p class="mb-5 text-sm font-medium text-black/70">
                    最新节目 · {{ video.category }}
                </p>
                <h2 class="max-w-3xl text-3xl leading-[1.2] font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    <SiteLink :to="video.path" class="outline-none hover:underline decoration-2 underline-offset-8 focus-visible:ring-2 focus-visible:ring-black">
                        {{ video.title }}
                    </SiteLink>
                </h2>
                <p class="mt-5 max-w-xl text-base leading-8 text-black/80">
                    {{ video.description }}
                </p>
                <SiteLink :to="video.path" class="motion-button group mt-7 inline-flex min-h-12 items-center gap-3 bg-black px-5 text-sm font-bold text-white outline-none transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
                    <IconPlayerPlayFilled aria-hidden="true" class="size-4" />
                    观看完整节目 <IconArrowRight aria-hidden="true" class="size-4 transition-transform group-hover:translate-x-1" />
                </SiteLink>
            </div>
            <aside class="flex flex-col justify-between gap-5 bg-black/[0.045] p-6 sm:p-10 lg:p-8">
                <div>
                    <p class="text-sm text-black/70">
                        项目实战系列
                    </p>
                    <h3 class="mt-3 text-xl leading-8 font-bold">
                        {{ series.title }}
                    </h3>
                    <p class="mt-3 text-sm leading-7 text-black/75">
                        {{ series.description }}
                    </p>
                </div>
                <SiteLink :to="series.path" class="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold outline-none hover:underline focus-visible:ring-2 focus-visible:ring-black">
                    查看课程目录 <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </aside>
        </article>
        <p v-else class="text-base text-muted">
            节目正在整理中，先看看<SiteLink to="/news" class="underline underline-offset-4">
                技术速报
            </SiteLink>。
        </p>
    </header>
</template>
