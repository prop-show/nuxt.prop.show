<script lang="ts" setup>
import IconCode from '~icons/tabler/code'
import IconHeadphones from '~icons/tabler/headphones'
import IconUsers from '~icons/tabler/users'
import IconVideo from '~icons/tabler/video'

const features = [
    {
        number: '01',
        icon: IconHeadphones,
        iconColor: 'text-blue-500',
        title: '音频播客',
        description: '通勤路上，听听前端',
    },
    {
        number: '02',
        icon: IconVideo,
        iconColor: 'text-green-500',
        title: '视频教程',
        description: '跟着演示动手做',
    },
    {
        number: '03',
        icon: IconCode,
        iconColor: 'text-purple-500',
        title: '技术分享',
        description: '分享方法与经验',
    },
    {
        number: '04',
        icon: IconUsers,
        iconColor: 'text-orange-500',
        title: '社区交流',
        description: '交流问题与想法',
    },
]
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="FORMATS" title="从实际问题出发" />

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <UiCard
                v-for="feature in features"
                :key="feature.number"
                class="group relative gap-0 overflow-hidden rounded-sm bg-elevated/50 py-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg sm:py-6 motion-reduce:transform-none motion-reduce:transition-none"
            >
                <UiCardContent class="px-4 sm:px-6">
                    <div class="mb-12 flex items-start justify-between">
                        <div class="flex size-11 items-center justify-center rounded-sm bg-muted transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none">
                            <component :is="feature.icon" width="24" height="24" :class="feature.iconColor" aria-hidden="true" />
                        </div>
                        <span class="font-mono text-xl font-bold tracking-tight lg:text-2xl text-dimmed/45 transition-colors group-hover:text-primary">
                            {{ feature.number }}
                        </span>
                    </div>
                    <h3 class="mb-2 text-lg leading-[1.4] font-bold lg:text-xl">
                        {{ feature.title }}
                    </h3>
                    <p class="text-sm text-muted">
                        {{ feature.description }}
                    </p>
                </UiCardContent>
            </UiCard>
        </div>
    </section>
</template>
