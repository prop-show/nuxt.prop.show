<script lang="ts" setup>
const { stacks } = useAppConfig()

const stackIcons: Record<string, string> = {
    'Nuxt.js': 'i-tabler-brand-nuxt',
    'Vue': 'i-tabler-brand-vue',
    'TypeScript': 'i-tabler-brand-typescript',
    'Tailwind CSS': 'i-tabler-brand-tailwind',
    'Nuxt UI': 'i-tabler-components',
    'Vue Bits': 'i-tabler-sparkles',
    'Vercel': 'i-tabler-brand-vercel',
}
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 md:flex-row md:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    BUILT WITH
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    支撑本站的技术栈
                </h2>
            </div>
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                这个网站本身也是我们的实验场，用熟悉的前端工具持续迭代内容体验。
            </p>
        </div>

        <div class="grid overflow-hidden border border-default sm:grid-cols-2 lg:grid-cols-4">
            <div
                v-for="(stack, index) in stacks"
                :key="stack.name"
                class="group flex min-h-36 flex-col justify-between border-b border-default p-5 transition-colors hover:bg-elevated/70 sm:border-r"
            >
                <div class="flex items-start justify-between">
                    <Icon :name="stackIcons[stack.name] || 'i-tabler-code'" class="size-7 text-toned transition-colors group-hover:text-primary" />
                    <span class="font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                </div>
                <div>
                    <div class="text-lg font-black">
                        {{ stack.name }}
                    </div>
                    <div class="mt-1 font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
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
