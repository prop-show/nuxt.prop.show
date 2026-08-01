<script setup lang="ts">
defineProps<{
    count: number
}>()
</script>

<template>
    <header class="my-8 overflow-hidden border border-default bg-default/85 md:my-12">
        <div class="grid lg:grid-cols-[1fr_18rem]">
            <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                <div class="series-grid absolute inset-0 opacity-45" />
                <div class="relative z-10 font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                    PROP.SHOW / BUILD SERIES
                </div>
                <h1 class="relative z-10 mt-7 max-w-4xl text-5xl leading-[0.98] font-black tracking-[-0.06em] sm:text-7xl">
                    乙巳：从零构建
                    <span class="block text-primary">完整产品。</span>
                </h1>
                <p class="relative z-10 mt-7 max-w-2xl text-base leading-8 text-muted">
                    围绕一个真实项目，依次完成工程配置、NestJS API、数据库、Vue 前端、JWT 登录与 Redis 缓存。
                </p>
                <UButton to="/videos/ys-00-starter" icon="i-tabler-player-play-filled" size="xl" class="relative z-10 mt-9">
                    从前言开始
                </UButton>
            </section>

            <aside class="relative flex min-h-64 flex-col justify-between overflow-hidden border-t border-default bg-primary p-7 text-black lg:min-h-full lg:border-t-0 lg:border-l">
                <div class="absolute -right-7 -bottom-10 font-mono text-[10rem] leading-none font-black tracking-[-0.14em] text-black/8">
                    乙
                </div>
                <div class="relative z-10 font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">
                    COMPLETE CURRICULUM
                </div>
                <div class="relative z-10">
                    <div class="font-mono text-7xl font-black tracking-[-0.12em]">
                        {{ String(count).padStart(2, '0') }}
                    </div>
                    <div class="mt-2 font-mono text-xs font-bold tracking-[0.18em]">
                        EPISODES / 按顺序更新
                    </div>
                </div>
            </aside>
        </div>
    </header>
</template>

<style scoped>
.series-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to right, black, transparent 92%);
}
</style>
