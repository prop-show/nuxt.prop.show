<script setup lang="ts">
import type { Props } from '@/pages/news/[slug].server'
import IconArrowLeft from '~icons/tabler/arrow-left'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconExternalLink from '~icons/tabler/external-link'
import IconSatelliteOff from '~icons/tabler/satellite-off'
import { useArchiveBack } from '@/utils/archive-back'

defineProps<Props>()

const backTo = useArchiveBack('/news')
</script>

<template>
    <main class="mx-auto max-w-3xl">
        <div class="my-8 md:my-12">
            <SiteLink :to="backTo" class="group -my-2 inline-flex items-center gap-2 py-2 text-sm font-medium tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <IconArrowLeft aria-hidden="true" class="size-4 transition-transform group-hover:-translate-x-1" />
                返回速报
            </SiteLink>
        </div>

        <section v-if="pending" aria-label="正在加载速报" class="mb-12">
            <UiSkeleton class="h-9 w-4/5 sm:h-10 lg:h-13" />
            <div class="mt-4 flex flex-wrap gap-3">
                <UiSkeleton class="h-4 w-36" />
                <UiSkeleton class="h-4 w-24" />
            </div>
            <div class="mt-8 space-y-4">
                <UiSkeleton class="h-5 w-full" />
                <UiSkeleton class="h-5 w-full" />
                <UiSkeleton class="h-5 w-5/6" />
                <UiSkeleton class="h-5 w-full" />
            </div>
        </section>

        <template v-else-if="letter">
            <header>
                <!-- impeccable-disable-next-line design-system-font-size — 28/32/40 是 DESIGN.md 记录的 Detail Title 响应式三档 -->
                <h1 class="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.5rem]">
                    {{ letter.title }}
                </h1>

                <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted">
                    <time :datetime="letter.date">{{ publishedAt.date }} {{ publishedAt.time }}</time>
                    <SiteLink
                        v-if="letter.source"
                        :to="letter.source"
                        class="inline-flex items-center gap-1 underline decoration-default underline-offset-4 outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        来源
                        <IconExternalLink aria-hidden="true" class="size-3.5" />
                    </SiteLink>
                </div>
            </header>

            <article class="my-8 min-w-0">
                <Content :value="letter" />
            </article>

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
