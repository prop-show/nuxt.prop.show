<script lang="ts" setup>
import type { Creator } from '@/content'
import { useShared } from '@void/vue'
import { shallowRef } from 'vue'
import IconAlertTriangle from '~icons/tabler/alert-triangle'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconUsers from '~icons/tabler/users'

const { variant = 'default' } = defineProps<{
    variant?: 'default' | 'directory'
}>()

const { creators } = useShared<{ creators: Creator[] }>()
const pending = false
const error = shallowRef<Error | null>(null)
</script>

<template>
    <section v-if="pending" class="my-20">
        <div class="mb-8 border-b border-default pb-5">
            <UiSkeleton class="mb-2 h-3 w-28" />
            <UiSkeleton class="h-8 w-64 lg:h-10" />
        </div>
        <div class="grid gap-5 md:grid-cols-2">
            <div v-for="index in 2" :key="index" class="flex items-center gap-5 border border-default p-5">
                <UiSkeleton :class="variant === 'directory' ? 'size-22' : 'size-16'" />
                <div class="flex-1 space-y-3">
                    <UiSkeleton class="h-3 w-24" />
                    <UiSkeleton class="h-7 w-32" />
                    <UiSkeleton class="h-4 w-48" />
                </div>
            </div>
        </div>
    </section>

    <UiAlert
        v-else-if="error"
        class="my-20"
        variant="destructive"
    >
        <IconAlertTriangle aria-hidden="true" />
        <UiAlertTitle>创作者资料加载失败</UiAlertTitle>
        <UiAlertDescription>刷新页面重试。</UiAlertDescription>
    </UiAlert>

    <UiEmpty
        v-else-if="!creators.length"
        class="my-20"
    >
        <UiEmptyHeader>
            <UiEmptyMedia variant="icon">
                <IconUsers aria-hidden="true" />
            </UiEmptyMedia>
            <UiEmptyTitle>暂无创作者资料</UiEmptyTitle>
            <UiEmptyDescription>成员资料整理中。</UiEmptyDescription>
        </UiEmptyHeader>
    </UiEmpty>

    <section v-else-if="variant === 'directory'" class="my-20">
        <SectionHeading eyebrow="CREATORS" title="创作团队">
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span class="section-count hidden md:block">
                    {{ String(creators.length).padStart(2, '0') }} CONTRIBUTORS
                </span>
                <SiteLink to="/works" class="group inline-flex items-center gap-2 text-sm font-bold text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    查看团队作品
                    <IconArrowRight aria-hidden="true" class="size-4 transition-transform group-hover:translate-x-1" />
                </SiteLink>
            </div>
        </SectionHeading>

        <div class="grid gap-5 md:grid-cols-2">
            <SiteLink
                v-for="(creator, index) in creators"
                :key="creator.stem"
                :to="creator.href"
                target="_blank"
                class="group flex items-center gap-5 overflow-hidden border border-default bg-default/70 p-5 outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-elevated/70 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
            >
                <CreatorAvatar :creator="creator" size="xl" />

                <div class="min-w-0 flex-1">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        CONTRIBUTOR {{ String(index + 1).padStart(2, '0') }}
                    </div>
                    <div class="mt-2 flex items-center justify-between gap-3">
                        <h3 class="truncate text-lg leading-[1.4] font-bold lg:text-xl">
                            {{ creator.name }}
                        </h3>
                        <IconArrowUpRight aria-hidden="true" class="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p class="mt-2 text-sm text-muted">
                        {{ creator.role }}
                    </p>
                </div>
            </SiteLink>
        </div>
    </section>

    <section v-else class="my-20">
        <SectionHeading eyebrow="CREATORS" title="创作团队">
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <SiteLink to="/about" class="group inline-flex items-center gap-2 text-sm font-bold text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    认识团队
                    <IconArrowRight aria-hidden="true" class="size-4 transition-transform group-hover:translate-x-1" />
                </SiteLink>
                <SiteLink to="/works" class="group inline-flex items-center gap-2 text-sm font-bold text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    查看团队作品
                    <IconArrowRight aria-hidden="true" class="size-4 transition-transform group-hover:translate-x-1" />
                </SiteLink>
            </div>
        </SectionHeading>

        <div class="grid gap-4 md:grid-cols-2">
            <SiteLink
                v-for="creator in creators"
                :key="creator.stem"
                :to="creator.href"
                target="_blank"
                class="group flex items-center gap-4 border border-default bg-default/60 p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-elevated/70 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary"
            >
                <CreatorAvatar :creator="creator" size="lg" />

                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="truncate text-lg leading-[1.4] font-bold lg:text-xl">
                            {{ creator.name }}
                        </h3>
                        <IconArrowUpRight aria-hidden="true" class="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p class="mt-1 text-sm text-muted">
                        {{ creator.role }}
                    </p>
                </div>
            </SiteLink>
        </div>
    </section>
</template>
