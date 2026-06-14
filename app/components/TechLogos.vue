<script lang="ts" setup>
const { techLogos } = useAppConfig()
</script>

<template>
    <section class="my-20">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 sm:flex-row sm:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    TECH FREQUENCIES
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    持续关注的技术方向
                </h2>
            </div>
            <span class="font-mono text-xs font-bold tracking-[0.18em] text-dimmed">
                {{ String(techLogos.length).padStart(2, '0') }} TOPICS
            </span>
        </div>

        <div class="grid overflow-hidden border border-default sm:grid-cols-2 lg:grid-cols-4">
            <NuxtLink
                v-for="(tech, index) in techLogos"
                :key="tech.href"
                :to="tech.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex min-h-36 flex-col justify-between border-b border-default p-5 outline-none transition-colors hover:bg-elevated/70 focus-visible:bg-elevated/70 sm:border-r"
            >
                <div class="flex items-start justify-between">
                    <Icon
                        :name="tech.icon"
                        class="size-8 text-toned transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
                    />
                    <span class="font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                </div>

                <div class="flex items-end justify-between gap-3">
                    <div>
                        <div class="text-lg font-black">
                            {{ tech.title }}
                        </div>
                        <div class="mt-1 font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                            ON OUR RADAR
                        </div>
                    </div>
                    <Icon
                        name="i-tabler-arrow-up-right"
                        class="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                </div>
            </NuxtLink>

            <div class="flex min-h-36 flex-col justify-between bg-primary p-5 text-black">
                <Icon name="i-tabler-radar-2" class="size-8" />
                <div>
                    <div class="text-lg font-black">
                        保持扫描
                    </div>
                    <div class="mt-1 font-mono text-[9px] font-bold tracking-[0.18em] text-black/55">
                        MORE TO DISCOVER
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
