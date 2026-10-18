<script lang="ts" setup>
import { siteConfig } from '@/site-config'

const { stacks } = siteConfig
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="BUILT WITH" title="支撑本站的技术栈" stack-at="md">
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                这个网站也是我们的实验场，用熟悉的前端工具持续迭代。
            </p>
        </SectionHeading>

        <div class="grid overflow-hidden border border-default sm:grid-cols-2 lg:grid-cols-4">
            <div
                v-for="(stack, index) in stacks"
                :key="stack.name"
                class="group flex min-h-36 flex-col justify-between border-b border-default p-5 transition-colors hover:bg-elevated/70 sm:border-r"
            >
                <div class="flex items-start justify-between">
                    <Icon :name="stack.icon || 'i-tabler-code'" class="size-7 text-toned transition-colors group-hover:text-primary" />
                    <span class="meta-label">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                </div>
                <div>
                    <div class="text-lg font-black">
                        {{ stack.name }}
                    </div>
                    <div class="mt-1 meta-label">
                        ACTIVE
                    </div>
                </div>
            </div>

            <div class="flex min-h-36 flex-col justify-between bg-primary p-5 text-black">
                <Icon name="i-tabler-git-branch" class="size-7" />
                <div>
                    <div class="text-lg font-black">
                        持续迭代中
                    </div>
                    <div class="mt-1 font-mono text-[10px] font-bold tracking-[0.18em] text-black/55">
                        NEXT RELEASE
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
