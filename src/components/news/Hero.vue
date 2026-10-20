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

                <h1 class="relative z-10 mt-8 max-w-3xl text-[2rem] leading-[1.2] font-black tracking-[-0.025em] sm:text-[2.5rem] lg:text-5xl">
                    前端速报，
                    <span class="mt-2 block text-primary ">及时了解。</span>
                </h1>

                <p class="relative z-10 mt-7 max-w-2xl text-base leading-7 text-muted">
                    速览框架、工具与开源动态。
                </p>
            </section>

            <aside class="grid grid-cols-2 border-t border-default bg-primary text-black lg:grid-cols-1 lg:border-t-0 lg:border-l">
                <div class="flex min-h-32 flex-col justify-between border-r border-black/15 p-5 lg:border-r-0 lg:border-b">
                    <span class="meta-label-on-primary">REPORTS</span>
                    <strong class="font-mono text-[2rem] leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]">{{ String(count).padStart(2, '0') }}</strong>
                </div>
                <div class="flex min-h-32 flex-col justify-between p-5">
                    <span class="meta-label-on-primary">LATEST UPDATE</span>
                    <strong class="font-mono text-2xl font-bold tracking-tight sm:text-[1.75rem]">{{ formatDate(latestDate) }}</strong>
                </div>
            </aside>
        </div>
    </header>
</template>
