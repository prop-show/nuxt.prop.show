<script setup lang="ts">
defineProps<{
    count: number
    latestDate?: string
}>()

function formatDate(date?: string) {
    if (!date)
        return '--.--'

    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date.replace(' ', 'T')))
}
</script>

<template>
    <header class="my-8 overflow-hidden border border-default bg-default/85 shadow-sm md:my-12">
        <div class="grid lg:grid-cols-[1fr_18rem]">
            <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                <div class="grid-texture absolute inset-0 opacity-45" />

                <div class="relative z-10 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    <span class="inline-flex size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                    PROP.SHOW / NEWSWIRE
                </div>

                <h1 class="relative z-10 mt-8 max-w-3xl text-5xl leading-[0.95] font-black tracking-[-0.065em] sm:text-7xl">
                    前端讯号，
                    <span class="mt-2 block text-primary ">正在接收。</span>
                </h1>

                <p class="relative z-10 mt-7 max-w-2xl text-base leading-7 text-muted">
                    追踪框架、工具与开源社区的变化，整理成简短、直接的前端速报。
                </p>
            </section>

            <aside class="grid grid-cols-2 border-t border-default bg-primary text-black lg:grid-cols-1 lg:border-t-0 lg:border-l">
                <div class="flex min-h-32 flex-col justify-between border-r border-black/15 p-5 lg:border-r-0 lg:border-b">
                    <span class="meta-label-on-primary">SIGNALS LOGGED</span>
                    <strong class="font-mono text-5xl font-black tracking-[-0.1em]">{{ String(count).padStart(2, '0') }}</strong>
                </div>
                <div class="flex min-h-32 flex-col justify-between p-5">
                    <span class="meta-label-on-primary">LATEST UPDATE</span>
                    <strong class="font-mono text-4xl font-black tracking-[-0.08em]">{{ formatDate(latestDate) }}</strong>
                </div>
            </aside>
        </div>
    </header>
</template>
