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
                    <div class="font-mono text-xs font-bold tracking-[0.2em] text-black/70">
                        EST. FRONTEND
                    </div>
                    <div class="mt-3 text-[2rem] leading-[1.1] font-bold tracking-tight sm:text-[2.5rem]">
                        ABOUT
                    </div>
                </div>
            </aside>

            <section class="relative flex min-h-110 flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-14">
                <div class="grid-texture grid-texture-left absolute inset-0 opacity-45" />

                <div class="relative z-10">
                    <p class="font-mono text-xs font-bold tracking-[0.22em] text-primary">
                        ABOUT US
                    </p>
                    <h1 class="mt-6 max-w-3xl text-[2rem] leading-[1.2] font-black tracking-[-0.025em] sm:text-[2.5rem] lg:text-5xl">
                        记录技术变化，
                        <span class="block text-primary ">分享真实经验。</span>
                    </h1>
                    <p class="mt-7 max-w-2xl text-base leading-8 text-muted">
                        prop.show 由前端开发者共同维护，记录工作中踩过的坑与验证过的方法。
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
