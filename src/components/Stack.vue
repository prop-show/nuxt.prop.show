<script lang="ts" setup>
import IconCode from '~icons/tabler/code'
import IconGitBranch from '~icons/tabler/git-branch'
import { siteConfig } from '@/site-config'

const { stacks } = siteConfig
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="BUILT WITH" title="本站技术栈" />

        <div class="grid overflow-hidden border border-default sm:grid-cols-2 lg:grid-cols-4">
            <div
                v-for="(stack, index) in stacks"
                :key="stack.name"
                class="group flex min-h-36 flex-col justify-between border-b border-default p-5 transition-colors hover:bg-elevated/70 sm:border-r"
            >
                <div class="flex items-start justify-between">
                    <span v-if="stack.logo" class="flex h-7 items-center" aria-hidden="true">
                        <img :src="stack.logo" alt="" :width="stack.darkLogo ? 130 : 28" :height="28" class="h-7 w-auto" :class="{ 'dark:hidden': stack.darkLogo }">
                        <img v-if="stack.darkLogo" :src="stack.darkLogo" alt="" width="130" height="28" class="hidden h-7 w-auto dark:block">
                    </span>
                    <component :is="stack.icon || IconCode" v-else class="size-7 text-toned transition-colors group-hover:text-primary" aria-hidden="true" />
                    <span class="meta-label">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                </div>
                <div>
                    <div class="text-lg leading-[1.4] font-bold lg:text-xl">
                        {{ stack.name }}
                    </div>
                </div>
            </div>

            <div class="flex min-h-36 flex-col justify-between bg-primary p-5 text-black">
                <IconGitBranch aria-hidden="true" class="size-7" />
                <div>
                    <div class="text-lg leading-[1.4] font-bold lg:text-xl">
                        持续改进
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
