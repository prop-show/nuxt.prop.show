<script setup lang="ts">
import type { News, Video } from '@/content'
import IconArrowRight from '~icons/tabler/arrow-right'
import { site } from '@/config'
import { contentDate } from '@/utils/content-date'

defineProps<{ videos: Video[], news: News[], videoTotal: number, newsTotal: number }>()

function formatDate(date: string) {
    const value = contentDate(date)
    return value ? new Intl.DateTimeFormat(site.locale, { timeZone: site.timeZone, month: '2-digit', day: '2-digit' }).format(value) : '待定'
}
</script>

<template>
    <section class="mb-16 grid gap-12 lg:mb-24 lg:grid-cols-2 lg:gap-16" aria-label="最近更新">
        <section class="min-w-0">
            <SectionHeading title="视频">
                <SiteLink to="/videos" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    全部 {{ videoTotal }} 期 <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </SectionHeading>
            <div v-if="videos.length" class="space-y-1">
                <SiteLink v-for="video in videos" :key="video.stem" :to="video.path" class="group flex min-h-18 items-center gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <span class="w-12 shrink-0 text-sm tabular-nums text-muted">{{ String(video.order).padStart(2, '0') }}</span>
                    <span :title="video.title" class="min-w-0 truncate text-lg font-semibold transition-colors group-hover:text-primary">{{ video.title }}</span>
                </SiteLink>
            </div>
            <p v-else class="py-6 text-muted">
                暂无视频内容。
            </p>
        </section>
        <section class="min-w-0">
            <SectionHeading title="速报">
                <SiteLink to="/news" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    全部 {{ newsTotal }} 条 <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </SectionHeading>
            <div v-if="news.length" class="space-y-1">
                <SiteLink v-for="item in news" :key="item.stem" :to="item.path" class="group flex min-h-18 items-center gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <time :datetime="contentDate(item.date)?.toISOString()" class="w-12 shrink-0 text-sm tabular-nums text-muted">{{ formatDate(item.date) }}</time>
                    <span :title="item.title" class="min-w-0 truncate text-lg font-semibold transition-colors group-hover:text-primary">{{ item.title }}</span>
                </SiteLink>
            </div>
            <p v-else class="py-6 text-muted">
                暂无速报内容。
            </p>
        </section>
    </section>
</template>
