<script setup lang="ts">
import type { Props } from '@/pages/news/[slug].server'
import IconArrowLeft from '~icons/tabler/arrow-left'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconExternalLink from '~icons/tabler/external-link'
import IconSatelliteOff from '~icons/tabler/satellite-off'

defineProps<Props>()
</script>

<template>
    <main>
        <div class="my-8 md:my-12">
            <SiteLink to="/news" class="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <IconArrowLeft aria-hidden="true" class="size-4 transition-transform group-hover:-translate-x-1" />
                返回速报
            </SiteLink>
        </div>

        <section v-if="pending" class="overflow-hidden border border-default">
            <div class="grid lg:grid-cols-[1fr_15rem]">
                <div class="space-y-6 p-6 sm:p-10 lg:p-12">
                    <UiSkeleton class="h-3 w-36" />
                    <UiSkeleton class="h-9 w-4/5 sm:h-11 lg:h-13" />
                    <UiSkeleton class="h-5 w-48" />
                </div>
                <UiSkeleton class="min-h-48 rounded-none lg:min-h-full" />
            </div>
        </section>

        <template v-else-if="letter">
            <header class="overflow-hidden border border-default bg-default/85 shadow-sm">
                <div class="grid lg:grid-cols-[1fr_15rem]">
                    <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                        <div class="grid-texture absolute inset-0 opacity-45" />

                        <div class="relative z-10 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            <span class="inline-flex items-center gap-2 text-primary">
                                <span class="size-2 rounded-full bg-primary" />
                                NEWS
                            </span>
                        </div>

                        <h1 class="relative z-10 mt-7 max-w-4xl text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.5rem]">
                            {{ letter.title }}
                        </h1>

                        <div class="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs font-bold text-muted">
                            <time :datetime="letter.date">{{ publishedAt.date }}</time>
                            <span class="hidden h-3 w-px bg-default sm:block" />
                            <span>{{ publishedAt.time }}</span>
                        </div>
                    </section>

                    <aside class="flex min-h-44 flex-col justify-between border-t border-default bg-primary p-6 text-black lg:min-h-full lg:border-t-0 lg:border-l">
                        <div class="meta-label-on-primary">
                            ARCHIVE NUMBER
                        </div>
                        <div>
                            <div class="font-mono text-[2rem] leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]">
                                {{ signalNumber }}
                            </div>
                        </div>
                    </aside>
                </div>
            </header>

            <div class="mx-auto my-12 grid max-w-5xl gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-start">
                <aside class="hidden border-t border-default pt-4 lg:block">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        TRANSMISSION
                    </div>
                    <div class="mt-3 flex items-center gap-2 text-sm font-bold">
                        <span class="size-2 rounded-full bg-green-500" />
                        已归档
                    </div>
                    <div class="mt-6 grid gap-4 text-sm">
                        <UiButton
                            v-if="letter.source"
                            :to="letter.source"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            <IconExternalLink aria-hidden="true" />
                            消息来源
                        </UiButton>
                    </div>
                </aside>

                <!-- 只在移动端展示 -->
                <NewsSource :letter />

                <article class="border-y border-default py-7 sm:border sm:bg-default/55 sm:p-8 lg:p-10">
                    <div class="mb-6 border-b border-default pb-5">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                            ARTICLE
                        </div>
                        <h2 class="mt-2 text-lg leading-[1.4] font-bold lg:text-xl">
                            速报正文
                        </h2>
                    </div>

                    <Content :value="letter" />
                </article>
            </div>

            <footer class="mb-20 flex justify-end border-y border-default py-5">
                <UiButton to="/news" variant="outline">
                    全部速报
                    <IconArrowRight aria-hidden="true" />
                </UiButton>
            </footer>
        </template>

        <UiEmpty v-else class="my-20">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                    <IconSatelliteOff aria-hidden="true" />
                </UiEmptyMedia>
                <UiEmptyTitle>速报不存在</UiEmptyTitle>
                <UiEmptyDescription>这条速报可能已被移动或删除。</UiEmptyDescription>
            </UiEmptyHeader>
            <UiEmptyContent>
                <UiButton to="/news">
                    返回速报
                </UiButton>
            </UiEmptyContent>
        </UiEmpty>
    </main>
</template>
