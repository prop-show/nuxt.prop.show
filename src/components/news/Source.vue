<script lang='ts' setup>
import type { News } from '@/content'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconExternalLink from '~icons/tabler/external-link'

defineProps<{
    letter: News
}>()
</script>

<template>
    <section v-if="letter.source" class="border border-default bg-default/55 p-6 sm:p-8 block lg:hidden">
        <div class="mb-6">
            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                SOURCE
            </div>
            <h2 class="mt-2 text-lg leading-[1.4] font-bold lg:text-xl">
                消息来源
            </h2>
        </div>

        <SiteLink
            :to="letter.source"
            target="_blank"
            class="group flex items-center justify-between border border-default p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
        >
            <div class="flex items-center gap-3">
                <span class="flex size-10 items-center justify-center bg-muted">
                    <IconExternalLink aria-hidden="true" class="size-5" />
                </span>
                <div>
                    <div class="font-bold">
                        查看原文
                    </div>
                </div>
            </div>
            <IconArrowUpRight aria-hidden="true" class="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </SiteLink>
    </section>
</template>
