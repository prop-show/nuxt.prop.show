<script setup lang="ts">
import type { Props } from '@/pages/works/[slug].server'
import IconAlertTriangle from '~icons/tabler/alert-triangle'
import IconArchiveOff from '~icons/tabler/archive-off'
import IconArrowLeft from '~icons/tabler/arrow-left'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconBrandGithub from '~icons/tabler/brand-github'
import IconExternalLink from '~icons/tabler/external-link'
import IconUserQuestion from '~icons/tabler/user-question'

defineProps<Props>()
</script>

<template>
    <main class="mx-auto max-w-3xl">
        <div class="my-8 md:my-12">
            <SiteLink to="/works" class="group inline-flex items-center gap-2 text-sm font-medium tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <IconArrowLeft aria-hidden="true" class="size-4 transition-transform group-hover:-translate-x-1" />
                返回作品
            </SiteLink>
        </div>

        <section v-if="pending" aria-label="正在加载作品" class="mb-12 space-y-5">
            <UiSkeleton class="h-9 w-4/5 sm:h-10 lg:h-13" />
            <UiSkeleton class="h-4 w-24" />
            <UiSkeleton class="h-6 w-full" />
            <UiSkeleton class="h-6 w-2/3" />
            <div class="space-y-3 bg-elevated/60 p-5 sm:p-6">
                <UiSkeleton class="h-6 w-48" />
                <UiSkeleton class="h-5 w-full" />
                <div class="flex flex-wrap gap-3">
                    <UiSkeleton class="h-12 w-full sm:w-36" />
                    <UiSkeleton class="h-12 w-full sm:w-36" />
                </div>
            </div>
            <div class="flex items-center gap-3">
                <UiSkeleton class="size-12 shrink-0" />
                <UiSkeleton class="h-5 w-32" />
            </div>
            <UiSkeleton class="h-6 w-40" />
            <div class="space-y-4 pt-5">
                <UiSkeleton class="h-5 w-full" />
                <UiSkeleton class="h-5 w-full" />
                <UiSkeleton class="h-5 w-5/6" />
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
            <header>
                <h1 class="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.02em] sm:text-[2rem] lg:text-[2.5rem]">
                    {{ work.title }}
                </h1>
                <p class="mt-4 text-sm font-medium text-muted">
                    {{ work.type }}
                </p>
                <p v-if="work.description" class="mt-5 text-base leading-8 text-muted">
                    {{ work.description }}
                </p>

                <div v-if="work.website || work.repository" class="mt-6 bg-elevated/60 p-5 sm:p-6">
                    <h2 class="text-lg font-bold">
                        {{ work.website && work.repository ? '体验作品与查看源码' : work.website ? '体验作品' : '查看项目源码' }}
                    </h2>
                    <p class="mt-2 text-sm leading-6 text-muted">
                        {{ work.website && work.repository ? '前往作品站点或代码仓库，了解实际功能与实现。' : work.website ? '前往作品站点，体验实际功能。' : '前往代码仓库，查看源码与使用说明。' }}下方为作品介绍。
                    </p>
                    <div class="mt-4 flex flex-wrap gap-3">
                        <UiButton
                            v-if="work.website"
                            :to="work.website"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="lg"
                            class="min-h-12 w-full sm:w-auto"
                        >
                            <IconExternalLink aria-hidden="true" />
                            打开作品网站
                        </UiButton>
                        <UiButton
                            v-if="work.repository"
                            :to="work.repository"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="lg"
                            class="min-h-12 w-full sm:w-auto"
                            :variant="work.website ? 'outline' : 'default'"
                        >
                            <IconBrandGithub aria-hidden="true" />
                            打开代码仓库
                        </UiButton>
                    </div>
                </div>
                <div class="mt-6 flex flex-wrap items-center gap-4">
                    <SiteLink
                        v-if="creator"
                        :to="creator.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <CreatorAvatar :creator="creator" size="md" class="shrink-0" />
                        <div class="min-w-0">
                            <span class="flex items-center gap-1 text-sm font-medium group-hover:text-primary">
                                {{ creator.name }}
                                <IconArrowUpRight aria-hidden="true" class="size-4" />
                            </span>
                            <p class="mt-1 text-sm leading-5 text-muted">
                                {{ creator.role }}
                            </p>
                        </div>
                    </SiteLink>
                    <p v-else class="flex items-center gap-2 text-sm text-muted">
                        <IconUserQuestion aria-hidden="true" class="size-5" />
                        未知作者
                    </p>
                </div>

                <TagList v-if="work.tags?.length" :tags="work.tags" size="md" class="mt-6" />
            </header>

            <article class="my-10 min-w-0 wrap-anywhere [&_pre]:max-w-full [&_pre]:overflow-x-auto">
                <Content :value="work" />
            </article>

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
