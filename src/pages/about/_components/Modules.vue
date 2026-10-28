<script lang="ts" setup>
import IconArrowRight from '~icons/tabler/arrow-right'

const modules = [
    {
        title: '构建现场',
        to: { path: '/videos', query: { category: '构建现场' } },
        subtitle: '拆解项目中的开发难题',
    },
    {
        title: '工具雷达',
        to: { path: '/videos', query: { category: '工具雷达' } },
        subtitle: '发现趁手的开发工具',
    },
    {
        title: '编程技巧',
        to: { path: '/videos', query: { category: '编程技巧' } },
        subtitle: '解决日常开发中的具体问题',
    },
]
</script>

<template>
    <section class="my-12 md:my-16">
        <SectionHeading title="节目频道">
            <SiteLink to="/videos" class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring">
                全部视频 <IconArrowRight aria-hidden="true" class="size-4" />
            </SiteLink>
        </SectionHeading>
        <p class="mb-8 max-w-2xl text-base leading-8 text-muted">
            用视频演示开发过程，从项目实践到日常技巧。<SiteLink to="/news" class="inline-flex min-h-6 items-center underline decoration-default underline-offset-4 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
                技术速报
            </SiteLink>记录框架、工具与开源动态。
        </p>
        <ul class="grid gap-6 md:grid-cols-3 md:gap-8">
            <li v-for="module in modules" :key="module.title" class="min-w-0">
                <SiteLink :to="module.to" class="group block bg-elevated/60 p-5 outline-none transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-ring sm:p-6">
                    <h3 class="flex items-center justify-between gap-3 text-lg leading-8 font-semibold">
                        {{ module.title }} <IconArrowRight aria-hidden="true" class="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </h3>
                    <p class="mt-3 text-base leading-7 text-muted">
                        {{ module.subtitle }}
                    </p>
                </SiteLink>
            </li>
        </ul>
    </section>
</template>
