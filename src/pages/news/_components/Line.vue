<script lang="ts" setup>
import type { News } from '@/content'
import { contentDate, contentDateText } from '@/utils/content-date'

defineProps<{
    news: News[]
    total: number
}>()
</script>

<template>
    <section class="mt-10 mb-8 md:mt-16 md:mb-10" aria-label="速报列表">
        <h2 class="sr-only">
            速报列表
        </h2>
        <SectionHeading>
            <span class="text-sm text-muted tabular-nums">
                共 {{ total }} 条
            </span>
        </SectionHeading>

        <div class="border-y border-default">
            <SiteLink
                v-for="item in news"
                :key="item.stem"
                :to="item.path"
                class="content-link group block border-b border-default py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
                <time :datetime="contentDate(item.date)?.toISOString()" class="block text-[13px] leading-6 text-muted tabular-nums">
                    {{ contentDateText(item.date) }}
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
