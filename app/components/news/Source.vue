<script lang='ts' setup>
import type { NewsCollectionItem } from '@nuxt/content'

defineProps<{
    letter: NewsCollectionItem
}>()
</script>

<template>
    <section v-if="letter.source" class="border border-default bg-default/55 p-6 sm:p-8 block lg:hidden">
        <div class="mb-6">
            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                SOURCE CODE
            </div>
            <h2 class="mt-2 text-2xl font-black">
                消息来源
            </h2>
        </div>

        <NuxtLink
            :to="letter.source"
            target="_blank"
            class="group flex items-center justify-between border border-default p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
        >
            <div class="flex items-center gap-3">
                <span class="flex size-10 items-center justify-center bg-muted">
                    <Icon name="i-tabler-external-link" class="size-5" />
                </span>
                <div>
                    <div class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                        READ ON
                    </div>
                    <div class="mt-1 font-black">
                        IN DEPTH ARTICLE
                    </div>
                </div>
            </div>
            <Icon name="i-tabler-arrow-up-right" class="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </NuxtLink>
    </section>
</template>
