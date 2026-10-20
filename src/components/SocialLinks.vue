<script lang="ts" setup>
import IconAntennaBars5 from '~icons/tabler/antenna-bars-5'
import { siteConfig } from '@/site-config'

const { socials } = siteConfig
</script>

<template>
    <section class="my-8 flex flex-col items-center justify-between gap-4 border-y border-default px-1 py-4 sm:flex-row">
        <div class="flex items-center gap-3">
            <span class="flex size-9 items-center justify-center bg-primary text-black">
                <IconAntennaBars5 aria-hidden="true" class="size-5" />
            </span>
            <div>
                <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                    FOLLOW US
                </div>
                <div class="text-sm font-bold">
                    在这些平台关注我们
                </div>
            </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            <UiButton
                v-for="social in socials"
                :key="social.platform"
                variant="ghost"
                :to="social.href"
                target="_blank"
                class="font-mono text-xs"
            >
                <component :is="social.icon" aria-hidden="true" />
                {{ social.platform }}
            </UiButton>
        </div>
    </section>
</template>
