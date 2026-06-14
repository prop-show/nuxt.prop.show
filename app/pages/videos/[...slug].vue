<script lang="ts" setup>
const route = useRoute()

const { data: pageData, pending } = useAsyncData(
    route.path,
    async () => {
        const [video, videos] = await Promise.all([
            queryCollection('videos').path(route.path).first(),
            queryCollection('videos').order('order', 'ASC').all(),
        ])

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

useSeoMeta({
    title: () => video.value ? video.value.title : '视频 - prop.show',
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
                                {{ String(video.order).padStart(2, '0') }}
                            </div>
                            <div class="mt-2 font-mono text-xs font-bold tracking-[0.2em]">
                                EP.{{ String(video.order).padStart(2, '0') }}
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
                </aside>

                <div class="min-w-0 space-y-8">
                    <section class="border border-default bg-default/55 p-6 sm:p-8">
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

                        <div class="prose prose-neutral mt-6 max-w-none dark:prose-invert prose-headings:font-black prose-a:text-primary prose-a:decoration-primary/40">
                            <ContentRenderer :value="video" />
                        </div>
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
                            EP.{{ String(previousVideo.order).padStart(2, '0') }}
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
                            EP.{{ String(nextVideo.order).padStart(2, '0') }}
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
