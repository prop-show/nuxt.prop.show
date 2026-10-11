<script lang="ts" setup>
import type { NewsCollectionItem } from '@nuxt/content'

defineProps<{
    news: NewsCollectionItem[]
    total: number
    offset: number
}>()

function formatDate(date: string) {
    const value = new Date(date.replace(' ', 'T'))

    return {
        date: new Intl.DateTimeFormat('zh-CN', {
            month: '2-digit',
            day: '2-digit',
        }).format(value),
        year: value.getFullYear(),
    }
}
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="SIGNAL ARCHIVE" title="最新讯号">
            <Icon name="i-tabler-antenna-bars-5" class="hidden size-9 text-primary sm:block" />
        </SectionHeading>

        <div class="overflow-hidden border-y border-default">
            <NuxtLink
                v-for="(item, index) in news"
                :key="item.id"
                :to="item.path"
                class="group grid gap-5 border-b border-default px-1 py-6 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5 md:grid-cols-[8rem_1fr_2.5rem] md:items-center"
            >
                <time :datetime="item.date" class="flex items-baseline gap-2 font-mono">
                    <span class="text-lg font-black">{{ formatDate(item.date).date }}</span>
                    <span class="text-[10px] font-bold text-dimmed">{{ formatDate(item.date).year }}</span>
                </time>

                <div class="min-w-0">
                    <div class="mb-2 flex items-center gap-2">
                        <span v-if="offset === 0 && index === 0" class="bg-primary px-2 py-0.5 font-mono text-[9px] font-black tracking-wider text-black">
                            LATEST
                        </span>
                        <span class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">FRONTEND NEWS</span>
                    </div>
                    <h3 class="text-lg font-black transition-colors group-hover:text-primary md:text-xl">
                        {{ item.title }}
                    </h3>
                    <p v-if="item.description" class="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                        {{ item.description }}
                    </p>
                </div>

                <div class="hidden size-10 items-center justify-center border border-default text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black md:flex">
                    <Icon name="i-tabler-arrow-right" class="size-5 transition-transform group-hover:translate-x-0.5" />
                </div>
            </NuxtLink>
        </div>
    </section>
</template>
