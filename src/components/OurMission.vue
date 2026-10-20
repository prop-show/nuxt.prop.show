<script lang="ts" setup>
import IconBulb from '~icons/tabler/bulb'
import IconMessageCircle2 from '~icons/tabler/message-circle-2'
import IconRadio from '~icons/tabler/radio'
import IconRoute from '~icons/tabler/route'

const missions = [
    {
        number: '01',
        icon: IconRoute,
        title: '从实践出发',
        content: '从项目与协作中选题，分享验证过的方法与适用范围。',
    },
    {
        number: '02',
        icon: IconBulb,
        title: '把原理讲清楚',
        content: '演示怎么写，也说明解决了什么、做了哪些取舍。',
    },
    {
        number: '03',
        icon: IconRadio,
        title: '持续记录',
        content: '记录新工具与新变化，也回顾值得反复学习的基础知识。',
    },
    {
        number: '04',
        icon: IconMessageCircle2,
        title: '欢迎不同声音',
        content: '讨论不同经验、观点与技术路线，不求唯一答案。',
    },
]
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="PRINCIPLES" title="制作原则" />

        <div class="grid gap-6 md:grid-cols-2">
            <UiCard
                v-for="mission in missions"
                :key="mission.number"
                class="group relative gap-0 overflow-hidden rounded-sm bg-elevated/50 py-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:bg-elevated/70 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none sm:py-6"
            >
                <UiCardContent class="px-4 sm:px-6">
                    <div class="mb-10 flex items-start justify-between">
                        <div class="flex size-11 items-center justify-center rounded-sm bg-muted">
                            <component :is="mission.icon" class="size-6 text-primary" aria-hidden="true" />
                        </div>
                        <span class="font-mono text-xl font-bold tracking-tight lg:text-2xl text-dimmed/35 transition-colors group-hover:text-primary">
                            {{ mission.number }}
                        </span>
                    </div>

                    <h3 class="text-lg leading-[1.4] font-bold lg:text-xl">
                        {{ mission.title }}
                    </h3>
                    <p class="mt-3 max-w-xl text-sm leading-7 text-muted">
                        {{ mission.content }}
                    </p>
                </UiCardContent>
            </UiCard>
        </div>
    </section>
</template>
