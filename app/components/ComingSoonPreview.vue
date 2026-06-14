<script lang="ts" setup>
const upcomingFeatures = [
    {
        number: '01',
        title: '交互式代码练习',
        description: '提供在线编码环境，把节目中的知识直接变成可以动手验证的练习。',
        status: '开发中',
        statusLabel: 'IN DEVELOPMENT',
        accent: 'bg-green-500',
        icon: 'i-tabler-terminal-2',
    },
    {
        number: '02',
        title: '技术问答社区',
        description: '围绕节目与真实项目展开讨论，让经验可以继续补充和交流。',
        status: '设计中',
        statusLabel: 'IN DESIGN',
        accent: 'bg-blue-500',
        icon: 'i-tabler-messages',
    },
    {
        number: '03',
        title: '专属学习路径',
        description: '按照技术方向组织内容，帮助开发者找到更连贯的学习顺序。',
        status: '规划中',
        statusLabel: 'PLANNED',
        accent: 'bg-purple-500',
        icon: 'i-tabler-route',
    },
]
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 sm:flex-row sm:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    NEXT ON THE ROADMAP
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    下一阶段，我们想做这些
                </h2>
            </div>
            <span class="font-mono text-xs font-bold tracking-[0.18em] text-dimmed">
                03 IDEAS IN PROGRESS
            </span>
        </div>

        <div class="grid border-y border-default lg:grid-cols-[1fr_17rem]">
            <div class="lg:border-r lg:border-default">
                <div
                    v-for="feature in upcomingFeatures"
                    :key="feature.number"
                    class="group grid gap-5 border-b border-default px-1 py-7 last:border-b-0 sm:px-5 md:grid-cols-[5rem_1fr_auto] md:items-center"
                >
                    <div class="flex items-center gap-3">
                        <span class="size-2 rounded-full" :class="feature.accent" />
                        <span class="font-mono text-xs font-bold tracking-[0.16em] text-dimmed">
                            {{ feature.number }}
                        </span>
                    </div>

                    <div>
                        <div class="flex items-center gap-3">
                            <Icon :name="feature.icon" class="size-5 text-toned transition-colors group-hover:text-primary" />
                            <h3 class="text-xl font-black">
                                {{ feature.title }}
                            </h3>
                        </div>
                        <p class="mt-2 max-w-2xl text-sm leading-6 text-muted">
                            {{ feature.description }}
                        </p>
                    </div>

                    <div class="md:text-right">
                        <div class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                            {{ feature.statusLabel }}
                        </div>
                        <div class="mt-1 text-sm font-black">
                            {{ feature.status }}
                        </div>
                    </div>
                </div>
            </div>

            <aside class="relative flex min-h-56 flex-col justify-between overflow-hidden bg-primary p-6 text-black">
                <div class="absolute -right-8 -bottom-16 font-mono text-[10rem] leading-none font-black tracking-[-0.16em] text-black/8">
                    ?
                </div>
                <div class="relative z-10">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">
                        HAVE AN IDEA?
                    </div>
                    <h3 class="mt-3 text-2xl font-black">
                        你的建议也可以进入路线图
                    </h3>
                </div>

                <NuxtLink
                    to="https://github.com/prop-show"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative z-10 flex items-center justify-between border border-black/20 p-3 font-bold outline-none transition-colors hover:bg-black hover:text-primary focus-visible:ring-2 focus-visible:ring-black"
                >
                    前往 GitHub
                    <Icon name="i-tabler-arrow-up-right" class="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </NuxtLink>
            </aside>
        </div>
    </section>
</template>
