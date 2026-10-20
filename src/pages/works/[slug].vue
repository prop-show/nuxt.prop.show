<script setup lang="ts">
import type { Props } from '@/pages/works/[slug].server'
import IconAlertTriangle from '~icons/tabler/alert-triangle'
import IconArchiveOff from '~icons/tabler/archive-off'
import IconArrowLeft from '~icons/tabler/arrow-left'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconBox from '~icons/tabler/box'
import IconBrandGithub from '~icons/tabler/brand-github'
import IconExternalLink from '~icons/tabler/external-link'
import IconUserQuestion from '~icons/tabler/user-question'

defineProps<Props>()
</script>

<template>
    <main>
        <div class="my-8 md:my-12">
            <SiteLink to="/works" class="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <IconArrowLeft aria-hidden="true" class="size-4 transition-transform group-hover:-translate-x-1" />
                返回作品
            </SiteLink>
        </div>

        <section v-if="pending" class="overflow-hidden border border-default">
            <div class="grid lg:grid-cols-[1fr_17rem]">
                <div class="space-y-6 p-6 sm:p-10 lg:p-12">
                    <UiSkeleton class="h-3 w-36" />
                    <UiSkeleton class="h-9 w-4/5 sm:h-11 lg:h-13" />
                    <UiSkeleton class="h-5 w-2/3" />
                </div>
                <UiSkeleton class="min-h-52 rounded-none lg:min-h-full" />
            </div>
        </section>

        <UiAlert
            v-else-if="error"
            class="my-20"
            variant="destructive"
        >
            <IconAlertTriangle aria-hidden="true" />
            <UiAlertTitle>作品资料加载失败</UiAlertTitle>
            <UiAlertDescription>刷新页面重试。</UiAlertDescription>
        </UiAlert>

        <template v-else-if="work">
            <header class="overflow-hidden border border-default bg-default/85 shadow-sm">
                <div class="grid lg:grid-cols-[1fr_17rem]">
                    <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                        <div class="grid-texture absolute inset-0 opacity-45" />

                        <div class="relative z-10 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            <span class="text-primary">TEAM WORK</span>
                            <span>/</span>
                            <span>{{ work.type }}</span>
                        </div>

                        <h1 class="relative z-10 mt-7 max-w-4xl text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.5rem]">
                            {{ work.title }}
                        </h1>

                        <p class="relative z-10 mt-6 max-w-3xl text-base leading-7 text-muted">
                            {{ work.description }}
                        </p>

                        <div class="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs font-bold text-muted">
                            <!-- <time :datetime="work.date">{{ formattedDate }}</time> -->
                            <span class="hidden h-3 w-px bg-default sm:block" />
                            <span>{{ work.type }}</span>
                        </div>
                    </section>

                    <aside class="flex min-h-48 flex-col justify-between border-t border-default bg-primary p-6 text-black lg:min-h-full lg:border-t-0 lg:border-l">
                        <span class="meta-label-on-primary">PROJECT TYPE</span>
                        <div>
                            <IconBox aria-hidden="true" class="mb-5 size-10" />
                            <strong class="block text-lg leading-[1.4] font-bold lg:text-xl">{{ work.type }}</strong>
                        </div>
                    </aside>
                </div>
            </header>

            <section class="mx-auto my-12 grid max-w-5xl gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
                <aside class="border-y border-default py-5 lg:sticky lg:top-6 lg:border lg:p-5">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        CREATED BY
                    </div>

                    <SiteLink
                        v-if="creator"
                        :to="creator.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group mt-4 flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary lg:items-start"
                    >
                        <CreatorAvatar :creator="creator" size="md" class="shrink-0" />
                        <div class="min-w-0">
                            <div class="flex items-center gap-1 font-black group-hover:text-primary">
                                {{ creator.name }}
                                <IconArrowUpRight aria-hidden="true" class="size-4" />
                            </div>
                            <p class="mt-1 text-xs leading-5 text-muted">
                                {{ creator.role }}
                            </p>
                        </div>
                    </SiteLink>

                    <div v-else class="mt-4 flex items-center gap-2 text-sm font-bold text-muted">
                        <IconUserQuestion aria-hidden="true" class="size-5" />
                        未知作者
                    </div>

                    <div v-if="work.website || work.repository" class="mt-6 grid gap-2">
                        <UiButton
                            v-if="work.website"
                            :to="work.website"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconExternalLink aria-hidden="true" />
                            在线查看
                        </UiButton>
                        <UiButton
                            v-if="work.repository"
                            :to="work.repository"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            <IconBrandGithub aria-hidden="true" />
                            查看源码
                        </UiButton>
                    </div>
                </aside>

                <div class="min-w-0 space-y-8">
                    <article class="border-y border-default py-7 sm:border sm:bg-default/55 sm:p-8 lg:p-10">
                        <div class="mb-6 border-b border-default pb-5">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                PROJECT NOTES
                            </div>
                            <h2 class="mt-2 text-lg leading-[1.4] font-bold lg:text-xl">
                                作品说明
                            </h2>
                        </div>

                        <Content :value="work" />
                    </article>

                    <section v-if="work.tags?.length" class="border-t border-default pt-5">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            TECHNOLOGY / TOPICS
                        </div>
                        <TagList :tags="work.tags" size="md" class="mt-4" />
                    </section>
                </div>
            </section>

            <footer class="mb-20 flex justify-end border-y border-default py-5">
                <UiButton to="/works" variant="outline">
                    全部作品
                    <IconArrowRight aria-hidden="true" />
                </UiButton>
            </footer>
        </template>

        <UiEmpty v-else class="my-20">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconArchiveOff aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>作品不存在</UiEmptyTitle>
                <UiEmptyDescription>这份作品资料可能已被移动或删除。</UiEmptyDescription>
            </UiEmptyHeader>
            <UiEmptyContent>
                <UiButton to="/works">
                    返回作品
                </UiButton>
            </UiEmptyContent>
        </UiEmpty>
    </main>
</template>
