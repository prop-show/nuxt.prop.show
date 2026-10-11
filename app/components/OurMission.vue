<script lang="ts" setup>
const missions = [
    {
        number: '01',
        icon: 'i-tabler-route',
        title: '从实践出发',
        description: '不复述文档，只分享真正验证过的路径。',
        content: '选题来自真实项目与团队协作。我们关心一个方案为什么有效，也记录它什么时候并不适用。',
    },
    {
        number: '02',
        icon: 'i-tabler-bulb',
        title: '把原理讲清楚',
        description: '让技术选择拥有上下文，而不只是结论。',
        content: '每一期都回答“为什么”：不只展示代码怎么写，也说明它解决的问题和取舍。',
    },
    {
        number: '03',
        icon: 'i-tabler-radio',
        title: '保持持续输出',
        description: '用长期记录，对抗短暂的信息噪音。',
        content: '框架和工具不断变化，但深入理解始终有价值。我们持续追踪变化，也沉淀经得起时间检验的基础内容。',
    },
    {
        number: '04',
        icon: 'i-tabler-message-circle-2',
        title: '欢迎不同声音',
        description: '技术讨论不需要唯一答案。',
        content: 'prop.show 希望成为开放的交流现场：不同经验、观点和技术路线都可以被认真讨论。',
    },
]
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="OUR PRINCIPLES" title="我们如何制作内容" stack-at="md">
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                四条原则，决定我们选择什么、如何表达。
            </p>
        </SectionHeading>

        <div class="grid gap-6 md:grid-cols-2">
            <UCard
                v-for="mission in missions"
                :key="mission.number"
                class="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-elevated/70 hover:shadow-lg"
                variant="subtle"
            >
                <div class="mb-10 flex items-start justify-between">
                    <div class="flex size-11 items-center justify-center rounded-sm bg-muted">
                        <Icon :name="mission.icon" class="size-6 text-primary" />
                    </div>
                    <span class="font-mono text-5xl font-black tracking-[-0.1em] text-dimmed/35 transition-colors group-hover:text-primary">
                        {{ mission.number }}
                    </span>
                </div>

                <h3 class="text-xl font-black">
                    {{ mission.title }}
                </h3>
                <p class="mt-2 text-sm font-bold text-toned">
                    {{ mission.description }}
                </p>
                <p class="mt-5 max-w-xl text-sm leading-7 text-muted">
                    {{ mission.content }}
                </p>
            </UCard>
        </div>
    </section>
</template>
