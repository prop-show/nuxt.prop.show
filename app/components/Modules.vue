<script lang="ts" setup>
const modules = [
    {
        number: 'CH.01',
        title: '构建现场',
        subtitle: '从真实项目出发，拆解开发中的核心问题',
        accent: 'bg-blue-500',
        tags: ['项目实战', '深度解析'],
    },
    {
        number: 'CH.02',
        title: '工具雷达',
        subtitle: '发现趁手工具，让开发过程更高效',
        accent: 'bg-green-500',
        tags: ['工具插件', '效率技巧'],
    },
    {
        number: 'CH.03',
        title: '开发者会客厅',
        subtitle: '聊聊代码之外，开发者正在关心的事情',
        accent: 'bg-purple-500',
        tags: ['开发者访谈', '行业观察'],
    },
]
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex items-end justify-between border-b border-default pb-5">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    PROGRAM CHANNELS
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    三个频道，持续更新
                </h2>
            </div>
            <Icon name="i-tabler-wave-sine" class="hidden size-10 text-primary md:block" />
        </div>

        <div class="overflow-hidden border-y border-default">
            <NuxtLink
                v-for="module in modules"
                :key="module.number"
                to="/videos"
                class="group grid gap-5 border-b border-default px-1 py-6 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5 md:grid-cols-[6rem_1fr_auto_2.5rem] md:items-center"
            >
                <div class="flex items-center gap-3">
                    <span class="size-2 rounded-full" :class="module.accent" />
                    <span class="font-mono text-xs font-bold tracking-[0.16em] text-dimmed">
                        {{ module.number }}
                    </span>
                </div>

                <div>
                    <h3 class="text-xl font-black transition-colors group-hover:text-primary md:text-2xl">
                        {{ module.title }}
                    </h3>
                    <p class="mt-1 text-sm leading-6 text-muted">
                        {{ module.subtitle }}
                    </p>
                </div>

                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="tag in module.tags"
                        :key="tag"
                        class="border border-default px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-toned"
                    >
                        {{ tag }}
                    </span>
                </div>

                <div class="hidden size-10 items-center justify-center border border-default text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black md:flex">
                    <Icon name="i-tabler-arrow-right" class="size-5 transition-transform group-hover:translate-x-0.5" />
                </div>
            </NuxtLink>
        </div>

        <div class="mt-5 flex justify-end">
            <NuxtLink to="/videos" class="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-highlighted">
                查看全部视频
                <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
        </div>
    </section>
</template>
