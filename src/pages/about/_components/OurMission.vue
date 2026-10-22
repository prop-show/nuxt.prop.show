<script lang="ts" setup>
const missions = [
    {
        title: '从实践出发',
        content: '从项目与协作中选题，分享验证过的方法与适用范围。',
    },
    {
        title: '把原理讲清楚',
        content: '演示怎么写，也说明解决了什么、做了哪些取舍。',
    },
    {
        title: '持续记录',
        content: '记录新工具与新变化，也回顾值得反复学习的基础知识。',
    },
    {
        title: '欢迎不同声音',
        content: '讨论不同经验、观点与技术路线，不求唯一答案。',
    },
]
</script>

<template>
    <section class="my-12 md:my-16">
        <SectionHeading title="制作原则" />

        <dl class="grid gap-x-12 gap-y-8 md:grid-cols-2">
            <div v-for="mission in missions" :key="mission.title" class="space-y-2">
                <dt class="text-lg leading-8 font-semibold">
                    {{ mission.title }}
                </dt>
                <dd class="max-w-2xl text-base leading-8 text-muted">
                    {{ mission.content }}
                </dd>
            </div>
        </dl>
    </section>
</template>
