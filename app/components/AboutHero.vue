<script setup lang="ts">
const facts = [
    { label: 'FOCUS', value: '前端开发' },
    { label: 'FORMAT', value: '视频 / 播客 / 速报' },
    { label: 'STATUS', value: '持续更新' },
]
</script>

<template>
    <header class="my-8 overflow-hidden border border-default bg-default/85 shadow-sm md:my-12">
        <div class="grid lg:grid-cols-[0.72fr_1.28fr]">
            <aside class="relative flex min-h-72 flex-col justify-between overflow-hidden bg-primary p-6 text-black sm:p-10 lg:min-h-110">
                <div class="absolute -right-14 -bottom-20 font-mono text-[15rem] leading-none font-black tracking-[-0.16em] text-black/8">
                    P
                </div>

                <div class="relative z-10 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em]">
                    <span class="size-2 rounded-full bg-black" />
                    PROP.SHOW / PROFILE
                </div>

                <div class="relative z-10">
                    <div class="font-mono text-xs font-bold tracking-[0.2em] text-black/55">
                        EST. FRONTEND
                    </div>
                    <div class="mt-3 text-6xl font-black tracking-[-0.09em] sm:text-7xl">
                        ABOUT
                    </div>
                </div>
            </aside>

            <section class="relative flex min-h-110 flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-14">
                <div class="about-grid absolute inset-0 opacity-45" />

                <div class="relative z-10">
                    <p class="font-mono text-xs font-bold tracking-[0.22em] text-primary">
                        WHY WE KEEP BROADCASTING
                    </p>
                    <h1 class="mt-6 max-w-3xl text-4xl leading-tight font-black tracking-[-0.055em] sm:text-6xl">
                        记录技术变化，
                        <span class="block text-yellow-600 dark:text-yellow-400">分享真实经验。</span>
                    </h1>
                    <p class="mt-7 max-w-2xl text-base leading-8 text-muted">
                        prop.show 是一个由前端开发者共同维护的内容项目。我们从实际工作出发，把踩过的坑、验证过的方法和正在发生的技术变化，整理成值得反复观看的内容。
                    </p>
                </div>

                <div class="relative z-10 mt-12 grid gap-5 border-t border-default pt-5 sm:grid-cols-3">
                    <div v-for="fact in facts" :key="fact.label">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            {{ fact.label }}
                        </div>
                        <div class="mt-1 text-sm font-black">
                            {{ fact.value }}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </header>
</template>

<style scoped>
.about-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to left, black, transparent 92%);
}
</style>
