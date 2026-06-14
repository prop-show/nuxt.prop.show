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
                <div class="video-grid absolute inset-0 opacity-45" />

                <div class="relative z-10 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    <span class="inline-flex size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                    PROP.SHOW / PROGRAM LIBRARY
                </div>

                <h1 class="relative z-10 mt-8 max-w-3xl text-5xl leading-[0.95] font-black tracking-[-0.065em] sm:text-7xl">
                    前端节目，
                    <span class="mt-2 block text-primary ">随时开播。</span>
                </h1>

                <p class="relative z-10 mt-7 max-w-2xl text-base leading-7 text-muted">
                    从项目构建到工具发现，用完整演示和真实经验，把每一个前端问题讲清楚。
                </p>
            </section>

            <aside class="grid grid-cols-2 border-t border-default bg-primary text-black lg:grid-cols-1 lg:border-t-0 lg:border-l">
                <div class="flex min-h-32 flex-col justify-between border-r border-black/15 p-5 lg:border-r-0 lg:border-b">
                    <span class="font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">EPISODES / ACTIVE CHANNELS</span>
                    <div class="flex items-end gap-3 font-mono font-black">
                        <strong class="text-5xl tracking-[-0.1em]">{{ String(count).padStart(2, '0') }}</strong>
                        <span class="pb-1 text-sm text-black/55">/ {{ String(channelCount).padStart(2, '0') }}</span>
                    </div>
                </div>

                <div class="flex min-h-32 flex-col justify-between p-5">
                    <span class="font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">LATEST PROGRAM</span>
                    <div>
                        <strong class="font-mono text-4xl font-black tracking-[-0.08em]">EP.{{ String(latestOrder || 0).padStart(2, '0') }}</strong>
                        <p class="mt-2 line-clamp-1 text-xs font-bold">
                            {{ latestTitle || '等待新节目' }}
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    </header>
</template>

<style scoped>
.video-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to right, black, transparent 90%);
}
</style>
