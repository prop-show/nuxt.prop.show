<script setup lang="ts">
defineProps<{
    count: number
    channelCount: number
    latestOrder?: number
    latestTitle?: string
}>()
</script>

<template>
    <header class="my-8 overflow-hidden border border-default bg-default/85 shadow-sm md:my-12">
        <div class="grid lg:grid-cols-[1fr_19rem]">
            <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                <div class="grid-texture absolute inset-0 opacity-45" />

                <div class="relative z-10 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    <span class="inline-flex size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                    PROP.SHOW / PROGRAM LIBRARY
                </div>

                <h1 class="relative z-10 mt-8 max-w-3xl text-[2rem] leading-[1.2] font-black tracking-[-0.025em] sm:text-[2.5rem] lg:text-5xl">
                    前端节目，
                    <span class="mt-2 block text-primary ">随时开播。</span>
                </h1>

                <p class="relative z-10 mt-7 max-w-2xl text-base leading-7 text-muted">
                    用代码演示，分享前端实践。
                </p>
            </section>

            <aside class="grid grid-cols-2 border-t border-default bg-primary text-black lg:grid-cols-1 lg:border-t-0 lg:border-l">
                <div class="flex min-h-32 flex-col justify-between border-r border-black/15 p-5 lg:border-r-0 lg:border-b">
                    <span class="meta-label-on-primary">EPISODES / ACTIVE CHANNELS</span>
                    <div class="flex items-end gap-3 font-mono font-bold">
                        <strong class="text-[2rem] leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]">{{ String(count).padStart(2, '0') }}</strong>
                        <span class="pb-1 text-sm text-black/70">/ {{ String(channelCount).padStart(2, '0') }}</span>
                    </div>
                </div>

                <div class="flex min-h-32 flex-col justify-between p-5">
                    <span class="meta-label-on-primary">LATEST PROGRAM</span>
                    <div>
                        <strong class="font-mono text-2xl font-bold tracking-tight sm:text-[1.75rem]">EP.{{ String(latestOrder || 0).padStart(2, '0') }}</strong>
                        <p class="mt-2 line-clamp-1 text-xs font-bold">
                            {{ latestTitle || '等待新节目' }}
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    </header>
</template>
