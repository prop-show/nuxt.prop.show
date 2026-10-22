<script lang="ts" setup>
import type { News } from '@/content'
import { site } from '@/config'
import { contentDate } from '@/utils/content-date'

defineProps<{
    news: News[]
    total: number
}>()

function formatDate(date: string) {
    return new Intl.DateTimeFormat('zh-CN', {
        timeZone: site.timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(contentDate(date))
}
</script>

<template>
    <section class="my-8 md:my-12" aria-label="速报列表">
        <div class="mb-4 text-sm text-muted">
            共 {{ total }} 条速报
        </div>

        <div>
            <SiteLink
                v-for="item in news"
                :key="item.stem"
                :to="item.path"
                class="content-link group block border-b border-default px-1 py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-5"
            >
                <time :datetime="contentDate(item.date)?.toISOString()" class="block text-[13px] leading-6 text-muted tabular-nums">
                    {{ formatDate(item.date) }}
                </time>

                <div class="mt-2 min-w-0">
                    <h3 class="text-[22px] leading-[1.4] font-bold text-highlighted transition-colors group-hover:text-primary">
                        {{ item.title }}
                    </h3>
                    <p v-if="item.description" class="mt-2 line-clamp-2 text-base leading-7 text-muted">
                        {{ item.description }}
                    </p>
                </div>
            </SiteLink>
        </div>
    </section>
</template>
