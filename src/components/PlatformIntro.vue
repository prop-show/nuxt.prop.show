<script lang="ts" setup>
const features = [
    {
        number: '01',
        icon: 'i-tabler-headphones',
        iconColor: 'text-blue-500',
        title: '音频播客',
        description: '通勤时间也能学习前端技术',
    },
    {
        number: '02',
        icon: 'i-tabler-video',
        iconColor: 'text-green-500',
        title: '视频教程',
        description: '可视化的编程实战演示',
    },
    {
        number: '03',
        icon: 'i-tabler-code',
        iconColor: 'text-purple-500',
        title: '技术分享',
        description: '前沿技术与最佳实践',
    },
    {
        number: '04',
        icon: 'i-tabler-users',
        iconColor: 'text-orange-500',
        title: '社区交流',
        description: '与开发者共同成长进步',
    },
]
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="WHAT WE TRANSMIT" title="围绕真实场景讲解" stack-at="md">
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                把复杂技术拆成可以理解、复现、继续探索的内容。
            </p>
        </SectionHeading>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <UCard
                v-for="feature in features"
                :key="feature.number"
                class="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                variant="subtle"
            >
                <div class="mb-12 flex items-start justify-between">
                    <div class="flex size-11 items-center justify-center rounded-sm bg-muted transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                        <Icon :name="feature.icon" size="24" :class="feature.iconColor" />
                    </div>
                    <span class="font-mono text-4xl font-black tracking-[-0.08em] text-dimmed/45 transition-colors group-hover:text-primary">
                        {{ feature.number }}
                    </span>
                </div>
                <h3 class="mb-2 text-lg font-black">
                    {{ feature.title }}
                </h3>
                <p class="text-sm text-muted">
                    {{ feature.description }}
                </p>
            </UCard>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs font-bold tracking-wider text-muted">
            <span>NOW COVERING</span>
            <span class="h-px w-8 bg-default" />
            <span class="text-highlighted">React</span>
            <span>/</span>
            <span class="text-highlighted">Vue</span>
            <span>/</span>
            <span class="text-highlighted">Node.js</span>
            <span>/</span>
            <span class="text-highlighted">TypeScript</span>
        </div>
    </section>
</template>
