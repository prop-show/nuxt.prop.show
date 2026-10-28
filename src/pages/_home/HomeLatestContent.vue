<script setup lang="ts">
import type { News, Video } from '@/content'
import IconArrowRight from '~icons/tabler/arrow-right'
import { contentDate, contentDateText } from '@/utils/content-date'

defineProps<{ videos: Video[], news: News[], videoTotal: number, newsTotal: number }>()
</script>

<template>
    <section class="mb-16 grid gap-12 lg:mb-24 lg:grid-cols-2 lg:gap-16" aria-label="最近更新">
        <section class="min-w-0">
            <SectionHeading title="视频">
                <SiteLink to="/videos" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                    全部 {{ videoTotal }} 期 <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </SectionHeading>
            <div v-if="videos.length">
                <SiteLink v-for="video in videos" :key="video.stem" :to="video.path" class="group flex items-start gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span class="w-20 shrink-0 font-mono text-sm leading-7 text-muted tabular-nums">第{{ String(video.order).padStart(2, '0') }}期</span>
                    <span :title="video.title" class="line-clamp-2 min-w-0 text-lg font-semibold transition-colors group-hover:text-primary">{{ video.title }}</span>
                </SiteLink>
            </div>
            <p v-else class="py-6 text-muted">
                暂无视频内容。
            </p>
        </section>
        <section class="min-w-0">
            <SectionHeading title="速报">
                <SiteLink to="/news" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                    全部 {{ newsTotal }} 条 <IconArrowRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </SectionHeading>
            <div v-if="news.length">
                <SiteLink v-for="item in news" :key="item.stem" :to="item.path" class="group flex items-start gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <time :datetime="contentDate(item.date)?.toISOString()" class="w-20 shrink-0 text-sm leading-7 tabular-nums text-muted">{{ contentDateText(item.date) }}</time>
                    <span :title="item.title" class="line-clamp-2 min-w-0 text-lg font-semibold transition-colors group-hover:text-primary">{{ item.title }}</span>
                </SiteLink>
            </div>
            <p v-else class="py-6 text-muted">
                暂无速报内容。
            </p>
        </section>
    </section>
</template>
