<script setup lang="ts">
import type { Props } from '@/pages/videos/[slug].server'
import IconArrowLeft from '~icons/tabler/arrow-left'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconBrandBilibili from '~icons/tabler/brand-bilibili'
import IconBrandGithub from '~icons/tabler/brand-github'
import IconBrandTiktok from '~icons/tabler/brand-tiktok'
import IconBrandYoutube from '~icons/tabler/brand-youtube'
import IconRoute from '~icons/tabler/route'
import IconVideoOff from '~icons/tabler/video-off'

import { videoCategoryColor, videoEpisode } from '@/utils/video'

defineProps<Props>()
</script>

<template>
    <main>
        <div class="my-8 md:my-12">
            <SiteLink to="/videos" class="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <IconArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" />
                返回视频
            </SiteLink>
        </div>

        <section v-if="pending" class="overflow-hidden border border-default">
            <div class="grid lg:grid-cols-[1fr_23rem]">
                <div class="space-y-6 p-6 sm:p-10 lg:p-12">
                    <UiSkeleton class="h-3 w-40" />
                    <UiSkeleton class="h-9 w-4/5 sm:h-11 lg:h-13" />
                    <UiSkeleton class="h-5 w-full" />
                    <div class="flex gap-2">
                        <UiSkeleton class="h-6 w-16" />
                        <UiSkeleton class="h-6 w-20" />
                    </div>
                </div>
                <UiSkeleton class="aspect-video rounded-none lg:aspect-auto lg:min-h-full" />
            </div>
        </section>

        <template v-else-if="video">
            <header class="overflow-hidden border border-default bg-default/85 shadow-sm">
                <div class="grid lg:grid-cols-[1fr_23rem]">
                    <section class="relative flex flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-12">
                        <div class="grid-texture absolute inset-0 opacity-45" />

                        <div class="relative z-10">
                            <div class="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                                <span class="inline-flex items-center gap-2 text-primary">
                                    <span class="size-2 rounded-full bg-primary" />
                                    PROGRAM READY
                                </span>
                                <span>/</span>
                                <span>{{ video.category }}</span>
                                <template v-if="video.series">
                                    <span>/</span>
                                    <span>{{ video.series }} SERIES</span>
                                </template>
                            </div>

                            <h1 class="mt-7 max-w-4xl text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.5rem]">
                                {{ video.title }}
                            </h1>

                            <p class="mt-7 max-w-3xl text-base leading-8 text-muted">
                                {{ video.description }}
                            </p>
                        </div>

                        <TagList :tags="video.tags" size="md" class="relative z-10 mt-10 items-center" />
                    </section>

                    <aside class="relative flex min-h-72 flex-col justify-between overflow-hidden border-t border-default bg-primary text-black lg:min-h-full lg:border-t-0 lg:border-l">
                        <div class="absolute inset-5 border border-black/15" />

                        <div class="relative z-10 flex items-center justify-between p-7 meta-label-on-primary">
                            <span>EPISODE FILE</span>
                            <span class="size-2 rounded-full" :class="videoCategoryColor(video.category)" />
                        </div>

                        <div class="relative z-10 p-7">
                            <div class="font-mono text-[2rem] leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]">
                                {{ String(displayEpisode).padStart(2, '0') }}
                            </div>
                            <div class="mt-2 font-mono text-xs font-bold tracking-[0.2em]">
                                EP.{{ String(displayEpisode).padStart(2, '0') }}
                            </div>
                        </div>
                    </aside>
                </div>
            </header>

            <section class="mx-auto my-12 grid max-w-5xl gap-8 lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-start">
                <aside class="hidden border-t border-default pt-4 lg:block">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        PROGRAM STATUS
                    </div>
                    <div class="mt-3 flex items-center gap-2 text-sm font-bold">
                        <span class="size-2 rounded-full bg-green-500" />
                        可观看
                    </div>
                    <div class="mt-6 grid gap-4 text-sm">
                        <UiButton
                            v-if="video.repository"
                            :to="video.repository"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            <IconBrandGithub aria-hidden="true" />
                            查看源码
                        </UiButton>

                        <h2 class="font-bold">
                            观看平台
                        </h2>

                        <UiButton
                            v-if="video.platforms?.bilibili"
                            :to="video.platforms.bilibili"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            <IconBrandBilibili aria-hidden="true" />
                            哔哩哔哩
                        </UiButton>
                        <UiButton
                            v-if="video.platforms?.youtube"
                            :to="video.platforms.youtube"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            <IconBrandYoutube aria-hidden="true" />
                            Youtube
                        </UiButton>
                        <UiButton
                            v-if="video.platforms?.douyin"
                            :to="video.platforms.douyin"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            <IconBrandTiktok aria-hidden="true" />
                            抖音
                        </UiButton>
                    </div>
                </aside>

                <div class="min-w-0 space-y-8">
                    <SiteLink
                        v-if="isYisiSeries"
                        to="/series/yisi"
                        class="group flex items-center justify-between border border-default bg-default/55 p-5 font-bold outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <span>
                            <span class="block font-mono text-[10px] tracking-[0.18em] text-primary">PART OF YISI SERIES</span>
                            <span class="mt-1 block">查看「{{ video.series }}」课程目录</span>
                        </span>
                        <IconRoute class="size-5 text-muted transition-transform group-hover:translate-x-1" />
                    </SiteLink>

                    <!-- 只在移动端展示 -->
                    <section v-if="video.platforms" class="border border-default bg-default/55 p-6 sm:p-8 block lg:hidden">
                        <div class="mb-6">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                WATCH PROGRAM
                            </div>
                            <h2 class="mt-2 text-lg leading-[1.4] font-bold lg:text-xl">
                                观看视频
                            </h2>
                        </div>

                        <VideoPlatformButtons :platforms="video.platforms" :show-title="false" />
                    </section>
                    <section v-if="video.repository" class="border border-default bg-default/55 p-6 sm:p-8 block lg:hidden">
                        <div class="mb-6">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                SOURCE CODE
                            </div>
                            <h2 class="mt-2 text-lg leading-[1.4] font-bold lg:text-xl">
                                查看源码
                            </h2>
                        </div>

                        <SiteLink
                            :to="video.repository"
                            target="_blank"
                            class="group flex items-center justify-between border border-default p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <div class="flex items-center gap-3">
                                <span class="flex size-10 items-center justify-center bg-muted">
                                    <IconBrandGithub class="size-5" />
                                </span>
                                <div>
                                    <div class="font-bold">
                                        GitHub
                                    </div>
                                </div>
                            </div>
                            <IconArrowUpRight class="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                        </SiteLink>
                    </section>

                    <article class="border-y border-default py-7 sm:border sm:bg-default/55 sm:p-8">
                        <div class="mb-6 border-b border-default pb-5">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                EPISODE NOTES
                            </div>
                            <h2 class="mt-2 text-lg leading-[1.4] font-bold lg:text-xl">
                                节目说明
                            </h2>
                        </div>

                        <Content :value="video" />
                    </article>
                </div>
            </section>

            <nav class="mb-20 grid border-y border-default md:grid-cols-2">
                <SiteLink
                    v-if="previousVideo"
                    :to="previousVideo.path"
                    class="group flex min-h-32 flex-col justify-between border-b border-default p-5 transition-colors hover:bg-elevated/55 md:border-r md:border-b-0"
                >
                    <div class="flex items-center gap-2 meta-label">
                        <IconArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" />
                        PREVIOUS EPISODE
                    </div>
                    <div>
                        <div class="font-mono text-xs font-bold text-primary">
                            EP.{{ String(videoEpisode(previousVideo)).padStart(2, '0') }}
                        </div>
                        <div class="mt-1 line-clamp-1 font-black">
                            {{ previousVideo.title }}
                        </div>
                    </div>
                </SiteLink>
                <div v-else class="hidden min-h-32 border-r border-default md:block" />

                <SiteLink
                    v-if="nextVideo"
                    :to="nextVideo.path"
                    class="group flex min-h-32 flex-col items-end justify-between p-5 text-right transition-colors hover:bg-elevated/55"
                >
                    <div class="flex items-center gap-2 meta-label">
                        NEXT EPISODE
                        <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div>
                        <div class="font-mono text-xs font-bold text-primary">
                            EP.{{ String(videoEpisode(nextVideo)).padStart(2, '0') }}
                        </div>
                        <div class="mt-1 line-clamp-1 font-black">
                            {{ nextVideo.title }}
                        </div>
                    </div>
                </SiteLink>
            </nav>
        </template>

        <UiEmpty v-else class="my-20">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconVideoOff aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>视频不存在</UiEmptyTitle>
                <UiEmptyDescription>该视频可能已移动或删除。</UiEmptyDescription>
            </UiEmptyHeader>
            <UiEmptyContent>
                <UiButton to="/videos">
                    返回视频
                </UiButton>
            </UiEmptyContent>
        </UiEmpty>
    </main>
</template>
