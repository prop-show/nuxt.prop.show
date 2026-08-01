<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

const route = useRoute()

const { data: pageData, pending } = useAsyncData(
    route.path,
    async () => {
        const video = await queryCollection('videos').path(route.path).first()

        if (!video)
            return { video, previous: undefined, next: undefined }

        const videos = video.series
            ? await queryCollection('videos')
                    .where('series', '=', video.series)
                    .all()
            : await queryCollection('videos').order('order', 'ASC').all()

        if (video.series)
            videos.sort((a, b) => (a.episode ?? a.order!) - (b.episode ?? b.order!))

        const index = videos.findIndex(item => item.path === route.path)

        return {
            video,
            previous: index > 0 ? videos[index - 1] : undefined,
            next: index >= 0 && index < videos.length - 1 ? videos[index + 1] : undefined,
        }
    },
)

const video = computed(() => pageData.value?.video)
const previousVideo = computed(() => pageData.value?.previous)
const nextVideo = computed(() => pageData.value?.next)
const isYisiSeries = computed(() => video.value?.series === '乙巳')
const displayEpisode = computed(() => video.value?.series
    ? video.value.episode ?? video.value.order
    : video.value?.order)

function episodeNumber(item: VideosCollectionItem) {
    return item.series ? item.episode ?? item.order : item.order
}

function seoTitle(item: VideosCollectionItem) {
    return item.series
        ? `${item.series} EP.${String(episodeNumber(item)).padStart(2, '0')}：${item.title}`
        : item.title
}

function getCategoryColor(category?: string) {
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
const { platforms } = useAppConfig()

useSeoMeta({
    title: () => video.value ? seoTitle(video.value) : '视频 - prop.show',
    description: () => video.value ? video.value.description : '观看 prop.show 前端开发视频。',
})
</script>

<template>
    <main>
        <div class="my-8 md:my-12">
            <NuxtLink to="/videos" class="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <Icon name="i-tabler-arrow-left" class="size-4 transition-transform group-hover:-translate-x-1" />
                BACK TO PROGRAM ARCHIVE
            </NuxtLink>
        </div>

        <section v-if="pending" class="overflow-hidden border border-default">
            <div class="grid lg:grid-cols-[1fr_23rem]">
                <div class="space-y-6 p-6 sm:p-10 lg:p-12">
                    <USkeleton class="h-3 w-40" />
                    <USkeleton class="h-14 w-4/5" />
                    <USkeleton class="h-5 w-full" />
                    <div class="flex gap-2">
                        <USkeleton class="h-6 w-16" />
                        <USkeleton class="h-6 w-20" />
                    </div>
                </div>
                <USkeleton class="aspect-video rounded-none lg:aspect-auto lg:min-h-full" />
            </div>
        </section>

        <template v-else-if="video">
            <header class="overflow-hidden border border-default bg-default/85 shadow-sm">
                <div class="grid lg:grid-cols-[1fr_23rem]">
                    <section class="relative flex min-h-105 flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-12">
                        <div class="program-grid absolute inset-0 opacity-45" />

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

                            <h1 class="mt-7 max-w-4xl text-4xl leading-tight font-black tracking-[-0.045em] sm:text-6xl">
                                {{ video.title }}
                            </h1>

                            <p class="mt-7 max-w-3xl text-base leading-8 text-muted">
                                {{ video.description }}
                            </p>
                        </div>

                        <div class="relative z-10 mt-10 flex flex-wrap items-center gap-2">
                            <span
                                v-for="tag in video.tags"
                                :key="tag"
                                class="border border-default bg-default/50 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-toned"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </section>

                    <aside class="relative flex min-h-72 flex-col justify-between overflow-hidden border-t border-default bg-primary text-black lg:min-h-full lg:border-t-0 lg:border-l">
                        <div class="absolute inset-5 border border-black/15" />

                        <div class="relative z-10 flex items-center justify-between p-7 font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">
                            <span>EPISODE FILE</span>
                            <span class="size-2 rounded-full" :class="getCategoryColor(video.category)" />
                        </div>

                        <div class="relative z-10 p-7">
                            <div class="font-mono text-7xl font-black tracking-[-0.12em]">
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
                    <div class="mt-6 font-mono text-[10px] font-bold leading-5 tracking-[0.14em] text-dimmed">
                        SELECT<br>
                        PLATFORM<br>
                        PLAY
                    </div>

                    <div class="mt-6 grid gap-4 text-sm">
                        <UButton
                            v-if="video.repository"
                            :to="video.repository"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="neutral"
                            variant="outline"
                            icon="i-tabler-brand-github"
                        >
                            查看源码
                        </UButton>

                        <h2 class="font-bold">
                            观看平台
                        </h2>

                        <UButton
                            v-if="video.platforms?.bilibili"
                            :to="video.platforms.bilibili"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="neutral"
                            variant="outline"
                            :icon="platforms.find(p => p.key === 'bilibili')?.icon"
                        >
                            哔哩哔哩
                        </UButton>
                        <UButton
                            v-if="video.platforms?.youtube"
                            :to="video.platforms.youtube"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="neutral"
                            variant="outline"
                            :icon="platforms.find(p => p.key === 'youtube')?.icon"
                        >
                            Youtube
                        </UButton>
                        <UButton
                            v-if="video.platforms?.douyin"
                            :to="video.platforms.douyin"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="neutral"
                            variant="outline"
                            :icon="platforms.find(p => p.key === 'douyin')?.icon"
                        >
                            抖音
                        </UButton>
                    </div>
                </aside>

                <div class="min-w-0 space-y-8">
                    <NuxtLink
                        v-if="isYisiSeries"
                        to="/series/yisi"
                        class="group flex items-center justify-between border border-default bg-default/55 p-5 font-bold outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <span>
                            <span class="block font-mono text-[10px] tracking-[0.18em] text-primary">PART OF YISI SERIES</span>
                            <span class="mt-1 block">查看「{{ video.series }}」完整课程目录</span>
                        </span>
                        <Icon name="i-tabler-route" class="size-5 text-muted transition-transform group-hover:translate-x-1" />
                    </NuxtLink>

                    <!-- 只在移动端展示 -->
                    <section v-if="video.platforms" class="border border-default bg-default/55 p-6 sm:p-8 block lg:hidden">
                        <div class="mb-6">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                WATCH PROGRAM
                            </div>
                            <h2 class="mt-2 text-2xl font-black">
                                选择观看平台
                            </h2>
                        </div>

                        <VideoPlatformButtons :platforms="video.platforms" :show-title="false" />
                    </section>
                    <section v-if="video.repository" class="border border-default bg-default/55 p-6 sm:p-8 block lg:hidden">
                        <div class="mb-6">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                SOURCE CODE
                            </div>
                            <h2 class="mt-2 text-2xl font-black">
                                查看源码
                            </h2>
                        </div>

                        <NuxtLink
                            :to="video.repository"
                            target="_blank"
                            class="group flex items-center justify-between border border-default p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <div class="flex items-center gap-3">
                                <span class="flex size-10 items-center justify-center bg-muted">
                                    <Icon name="i-tabler-brand-github" class="size-5" />
                                </span>
                                <div>
                                    <div class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                                        WATCH ON
                                    </div>
                                    <div class="mt-1 font-black">
                                        GitHub
                                    </div>
                                </div>
                            </div>
                            <Icon name="i-tabler-arrow-up-right" class="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                        </NuxtLink>
                    </section>

                    <article class="border-y border-default py-7 sm:border sm:bg-default/55 sm:p-8">
                        <div class="mb-6 border-b border-default pb-5">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                EPISODE NOTES
                            </div>
                            <h2 class="mt-2 text-2xl font-black">
                                节目说明
                            </h2>
                        </div>

                        <p class="text-base leading-8 text-muted">
                            {{ video.description }}
                        </p>

                        <Content :value="video" />
                    </article>
                </div>
            </section>

            <nav class="mb-20 grid border-y border-default md:grid-cols-2">
                <NuxtLink
                    v-if="previousVideo"
                    :to="previousVideo.path"
                    class="group flex min-h-32 flex-col justify-between border-b border-default p-5 transition-colors hover:bg-elevated/55 md:border-r md:border-b-0"
                >
                    <div class="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
                        <Icon name="i-tabler-arrow-left" class="size-4 transition-transform group-hover:-translate-x-1" />
                        PREVIOUS EPISODE
                    </div>
                    <div>
                        <div class="font-mono text-xs font-bold text-primary">
                            EP.{{ String(episodeNumber(previousVideo)).padStart(2, '0') }}
                        </div>
                        <div class="mt-1 line-clamp-1 font-black">
                            {{ previousVideo.title }}
                        </div>
                    </div>
                </NuxtLink>
                <div v-else class="hidden min-h-32 border-r border-default md:block" />

                <NuxtLink
                    v-if="nextVideo"
                    :to="nextVideo.path"
                    class="group flex min-h-32 flex-col items-end justify-between p-5 text-right transition-colors hover:bg-elevated/55"
                >
                    <div class="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
                        NEXT EPISODE
                        <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div>
                        <div class="font-mono text-xs font-bold text-primary">
                            EP.{{ String(episodeNumber(nextVideo)).padStart(2, '0') }}
                        </div>
                        <div class="mt-1 line-clamp-1 font-black">
                            {{ nextVideo.title }}
                        </div>
                    </div>
                </NuxtLink>
            </nav>
        </template>

        <UEmpty
            v-else
            icon="i-tabler-video-off"
            title="节目不存在"
            description="这期节目可能已被移动或删除。"
        >
            <template #actions>
                <UButton to="/videos">
                    返回节目档案
                </UButton>
            </template>
        </UEmpty>
    </main>
</template>

<style scoped>
.program-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to right, black, transparent 92%);
}
</style>
