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
function profileLabel(href: string) {
    const hostname = new URL(href).hostname
    return hostname === 'github.com' ? 'GitHub' : hostname
}

const pending = false
const error = shallowRef<Error | null>(null)
</script>

<template>
    <section v-if="pending" class="my-12 md:my-16">
        <div class="mb-6">
            <UiSkeleton class="h-8 w-64 lg:h-10" />
        </div>
        <div class="grid gap-5 md:grid-cols-2">
            <div v-for="index in 2" :key="index" class="flex items-start gap-4 pt-6">
                <UiSkeleton :class="variant === 'directory' ? 'size-18' : 'size-14'" />
                <div class="min-w-0 flex-1 space-y-3">
                    <UiSkeleton class="h-7 w-32" />
                    <UiSkeleton class="h-4 w-40 max-w-full" />
                </div>
            </div>
        </div>
    </section>

    <UiAlert
        v-else-if="error"
        class="my-12 md:my-16"
        variant="destructive"
    >
        <IconAlertTriangle aria-hidden="true" />
        <UiAlertTitle>创作者资料加载失败</UiAlertTitle>
        <UiAlertDescription>刷新页面重试。</UiAlertDescription>
    </UiAlert>

    <UiEmpty
        v-else-if="!creators.length"
        class="my-12 md:my-16"
    >
        <UiEmptyHeader>
            <UiEmptyMedia variant="icon">
                <IconUsers aria-hidden="true" />
            </UiEmptyMedia>
            <UiEmptyTitle>暂无创作者资料</UiEmptyTitle>
            <UiEmptyDescription>成员资料整理中。</UiEmptyDescription>
        </UiEmptyHeader>
    </UiEmpty>

    <section v-else class="my-12 md:my-16" aria-labelledby="creators-heading">
        <SectionHeading title="创作团队" title-id="creators-heading">
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span v-if="variant === 'directory'" class="text-sm text-muted">
                    {{ creators.length }} 位创作者
                </span>
                <SiteLink v-else to="/about" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                    认识团队
                    <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
                <SiteLink to="/works" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                    全部团队作品
                    <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </div>
        </SectionHeading>

        <div class="grid gap-x-12 gap-y-6 md:grid-cols-2">
            <article
                v-for="creator in creators"
                :key="creator.stem"
                class="flex min-w-0 items-start gap-4 pt-6"
            >
                <CreatorAvatar :creator="creator" size="lg" class="shrink-0" :style="{ width: variant === 'directory' ? '72px' : '56px', height: variant === 'directory' ? '72px' : '56px' }" />
                <div class="min-w-0 flex-1">
                    <h3 class="text-xl leading-7 font-bold wrap-anywhere">
                        {{ creator.name }}
                    </h3>
                    <p v-if="variant === 'directory'" class="mt-2 text-sm leading-6 text-muted">
                        {{ creator.role }}
                    </p>
                    <div class="mt-2 flex flex-wrap items-center gap-x-5">
                        <SiteLink
                            :to="{ path: '/works', query: { author: creator.slug } }"
                            :aria-label="`查看 ${creator.name} 的作品`"
                            class="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            查看作品 <IconArrowRight aria-hidden="true" class="size-4" />
                        </SiteLink>
                        <SiteLink
                            :to="creator.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="`${creator.name} 的${profileLabel(creator.href)}（新窗口打开）`"
                            class="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {{ profileLabel(creator.href) }} <IconArrowUpRight aria-hidden="true" class="size-4" />
                        </SiteLink>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
