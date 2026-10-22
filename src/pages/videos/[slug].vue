<script setup lang="ts">
import type { Props } from '@/pages/videos/[slug].server'
import IconArrowLeft from '~icons/tabler/arrow-left'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconBrandGithub from '~icons/tabler/brand-github'
import IconRoute from '~icons/tabler/route'
import IconVideoOff from '~icons/tabler/video-off'

import { videoEpisode } from '@/utils/video'

defineProps<Props>()
</script>

<template>
    <main class="mx-auto max-w-3xl">
        <div class="my-8 md:my-12">
            <SiteLink to="/videos" class="group inline-flex items-center gap-2 text-sm font-medium tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <IconArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" />
                返回视频
            </SiteLink>
        </div>

        <section v-if="pending" aria-label="正在加载视频" class="mb-12">
            <UiSkeleton class="h-9 w-4/5 sm:h-10 lg:h-13" />
            <div class="mt-4 flex flex-wrap gap-3">
                <UiSkeleton class="h-4 w-16" />
                <UiSkeleton class="h-4 w-24" />
                <UiSkeleton class="h-4 w-20" />
            </div>
            <div class="mt-5 space-y-2">
                <UiSkeleton class="h-6 w-full" />
                <UiSkeleton class="h-6 w-3/4" />
            </div>
            <div class="mt-6 space-y-4 bg-elevated/60 p-5 sm:p-6">
                <UiSkeleton class="h-7 w-24" />
                <div class="grid gap-3 sm:grid-cols-2">
                    <UiSkeleton class="h-12 w-full" />
                    <UiSkeleton class="h-12 w-full" />
                </div>
                <UiSkeleton class="h-9 w-28" />
            </div>
            <div class="mt-6 flex gap-2">
                <UiSkeleton class="h-6 w-16" />
                <UiSkeleton class="h-6 w-20" />
            </div>
            <div class="mt-10 space-y-4 border-t border-default pt-7">
                <UiSkeleton class="h-7 w-24" />
                <UiSkeleton class="h-5 w-full" />
                <UiSkeleton class="h-5 w-5/6" />
            </div>
        </section>

        <template v-else-if="video">
            <header>
                <h1 class="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.5rem]">
                    {{ video.title }}
                </h1>

                <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted">
                    <span>EP.{{ String(displayEpisode).padStart(2, '0') }}</span>
                    <time v-if="video.date" :datetime="video.date">{{ video.date.slice(0, 10) }}</time>
                    <span>{{ video.category }}</span>
                    <span v-if="video.series">{{ video.series }}</span>
                </div>

                <p v-if="video.description" class="mt-5 text-base leading-8 text-muted">
                    {{ video.description }}
                </p>

                <section v-if="Object.values(video.platforms || {}).some(Boolean) || video.repository" class="mt-6 space-y-4 bg-elevated/60 p-5 sm:p-6">
                    <template v-if="Object.values(video.platforms || {}).some(Boolean)">
                        <h2 class="text-lg leading-[1.4] font-bold lg:text-xl">
                            观看完整视频
                        </h2>
                        <p class="text-sm leading-6 text-muted">
                            选择平台观看完整节目，下方为节目说明与相关资料。
                        </p>
                        <VideoPlatformButtons :platforms="video.platforms" :show-title="false" />
                    </template>
                    <UiButton
                        v-if="video.repository"
                        :to="video.repository"
                        target="_blank"
                        rel="noopener noreferrer"
                        :variant="Object.values(video.platforms || {}).some(Boolean) ? 'outline' : 'default'"
                        size="lg"
                        class="min-h-12 w-full sm:w-auto"
                    >
                        <IconBrandGithub aria-hidden="true" />
                        打开本期代码仓库
                    </UiButton>
                </section>

                <TagList :tags="video.tags" size="md" class="mt-6 items-center" />
            </header>

            <section class="my-10 space-y-8">
                <SiteLink
                    v-if="isYisiSeries"
                    to="/series/yisi"
                    class="group flex items-center justify-between border border-default bg-default/55 p-5 font-bold outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <span>
                        <span class="block text-sm text-muted">系列学习</span>
                        <span class="mt-1 block">查看「{{ video.series }}」课程目录</span>
                    </span>
                    <IconRoute class="size-5 text-muted transition-transform group-hover:translate-x-1" />
                </SiteLink>

                <article class="min-w-0 border-t border-default pt-7">
                    <h2 class="mb-6 text-lg leading-[1.4] font-bold lg:text-xl">
                        节目说明
                    </h2>
                    <Content :value="video" />
                </article>
            </section>

            <nav class="mb-20 grid border-y border-default md:grid-cols-2">
                <SiteLink
                    v-if="previousVideo"
                    :to="previousVideo.path"
                    class="group flex min-h-32 flex-col justify-between border-b border-default p-5 transition-colors hover:bg-elevated/55 md:border-r md:border-b-0"
                >
                    <div class="flex items-center gap-2 text-sm text-muted">
                        <IconArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" />
                        上一期
                    </div>
                    <div>
                        <div class="text-sm font-medium text-primary">
                            EP.{{ String(videoEpisode(previousVideo)).padStart(2, '0') }}
                        </div>
                        <div class="mt-1 line-clamp-2 font-bold">
                            {{ previousVideo.title }}
                        </div>
                    </div>
                </SiteLink>

                <SiteLink
                    v-if="nextVideo"
                    :to="nextVideo.path"
                    class="group flex min-h-32 flex-col items-end md:col-start-2 justify-between p-5 text-right transition-colors hover:bg-elevated/55"
                >
                    <div class="flex items-center gap-2 text-sm text-muted">
                        下一期
                        <IconArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div>
                        <div class="text-sm font-medium text-primary">
                            EP.{{ String(videoEpisode(nextVideo)).padStart(2, '0') }}
                        </div>
                        <div class="mt-1 line-clamp-2 font-bold">
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
