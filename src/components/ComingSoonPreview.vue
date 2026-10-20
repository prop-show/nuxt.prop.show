<script lang="ts" setup>
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconMessages from '~icons/tabler/messages'
import IconRoute from '~icons/tabler/route'
import IconTerminal2 from '~icons/tabler/terminal-2'

const upcomingFeatures = [
    {
        number: '01',
        title: '代码练习',
        description: '在线动手，验证节目中的知识。',
        status: '设计中',
        accent: 'bg-green-500',
        icon: IconTerminal2,
    },
    {
        number: '02',
        title: '技术问答',
        description: '讨论节目与项目中的问题。',
        status: '设计中',
        accent: 'bg-blue-500',
        icon: IconMessages,
    },
    {
        number: '03',
        title: '学习路径',
        description: '按技术方向，串联学习顺序。',
        status: '规划中',
        accent: 'bg-purple-500',
        icon: IconRoute,
    },
]
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="ROADMAP" title="接下来想做">
            <span class="section-count">
                03 IDEAS
            </span>
        </SectionHeading>

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
                            <component :is="feature.icon" class="size-5 text-toned transition-colors group-hover:text-primary" aria-hidden="true" />
                            <h3 class=" text-lg leading-[1.4] font-bold lg:text-xl">
                                {{ feature.title }}
                            </h3>
                        </div>
                        <p class="mt-2 max-w-2xl text-sm leading-6 text-muted">
                            {{ feature.description }}
                        </p>
                    </div>

                    <div class="md:text-right">
                        <div class="text-sm font-bold">
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
                    <h3 class="text-lg leading-[1.4] font-bold lg:text-xl">
                        你有什么建议？
                    </h3>
                </div>

                <SiteLink
                    to="https://github.com/prop-show"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative z-10 flex items-center justify-between border border-black/20 p-3 font-bold outline-none transition-colors hover:bg-black hover:text-primary focus-visible:ring-2 focus-visible:ring-black"
                >
                    前往 GitHub
                    <IconArrowUpRight aria-hidden="true" class="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </SiteLink>
            </aside>
        </div>
    </section>
</template>
