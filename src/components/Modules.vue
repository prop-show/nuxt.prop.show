<script lang="ts" setup>
import IconArrowRight from '~icons/tabler/arrow-right'
import IconWaveSine from '~icons/tabler/wave-sine'

const modules = [
    {
        number: 'CH.01',
        title: '构建现场',
        subtitle: '拆解项目中的开发难题',
        accent: 'bg-blue-500',
        tags: ['项目实战', '深度解析'],
    },
    {
        number: 'CH.02',
        title: '工具雷达',
        subtitle: '发现趁手的开发工具',
        accent: 'bg-green-500',
        tags: ['工具插件', '效率技巧'],
    },
    {
        number: 'CH.03',
        title: '开发者会客厅',
        subtitle: '聊聊技术与开发者生活',
        accent: 'bg-purple-500',
        tags: ['开发者访谈', '行业观察'],
    },
]
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="PROGRAM CHANNELS" title="节目频道">
            <IconWaveSine aria-hidden="true" class="hidden size-10 text-primary md:block" />
        </SectionHeading>

        <div class="overflow-hidden border-y border-default">
            <SiteLink
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
                    <h3 class="transition-colors group-hover:text-primary text-lg leading-[1.4] font-bold lg:text-xl">
                        {{ module.title }}
                    </h3>
                    <p class="mt-1 text-sm leading-6 text-muted">
                        {{ module.subtitle }}
                    </p>
                </div>

                <TagList :tags="module.tags" size="md" />

                <div class="hidden size-10 items-center justify-center border border-default text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-black md:flex">
                    <IconArrowRight aria-hidden="true" class="size-5 transition-transform group-hover:translate-x-0.5" />
                </div>
            </SiteLink>
        </div>

        <div class="mt-5 flex justify-end">
            <SiteLink to="/videos" class="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-highlighted">
                查看全部视频
                <IconArrowRight aria-hidden="true" class="size-4 transition-transform group-hover:translate-x-1" />
            </SiteLink>
        </div>
    </section>
</template>
