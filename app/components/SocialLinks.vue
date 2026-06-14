<script lang="ts" setup>
const { socials } = useAppConfig()
</script>

<template>
    <section class="my-8 flex flex-col items-center justify-between gap-4 border-y border-default px-1 py-4 sm:flex-row">
        <div class="flex items-center gap-3">
            <span class="flex size-9 items-center justify-center bg-primary text-black">
                <Icon name="i-tabler-antenna-bars-5" class="size-5" />
            </span>
            <div>
                <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                    LISTENING TERMINALS
                </div>
                <div class="text-sm font-bold">
                    在你常用的平台继续收听
                </div>
            </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            <UButton
                v-for="social in socials"
                :key="social.platform"
                color="neutral"
                variant="ghost"
                :href="social.href"
                :icon="social.icon"
                target="_blank"
                class="font-mono text-xs"
            >
                {{ social.platform }}
            </UButton>
        </div>
    </section>
</template>
