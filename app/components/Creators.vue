<script lang="ts" setup>
const { variant = 'default' } = defineProps<{
    variant?: 'default' | 'directory'
}>()

const { creators } = useAppConfig()
</script>

<template>
    <section v-if="variant === 'directory'" class="my-20">
        <div class="mb-8 flex items-end justify-between border-b border-default pb-5">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    PEOPLE ON AIR
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    节目背后的创作者
                </h2>
            </div>
            <span class="hidden font-mono text-xs font-bold tracking-[0.18em] text-dimmed sm:block">
                {{ String(creators.length).padStart(2, '0') }} CONTRIBUTORS
            </span>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <NuxtLink
                v-for="(creator, index) in creators"
                :key="creator.creator"
                :to="creator.href"
                target="_blank"
                class="group flex items-center gap-5 overflow-hidden border border-default bg-default/70 p-5 outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-elevated/70 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
            >
                <NuxtImg
                    width="88"
                    height="88"
                    :src="creator.avatar"
                    :alt="`${creator.creator} avatar`"
                    class="size-22 rounded-sm object-cover"
                    loading="lazy"
                />

                <div class="min-w-0 flex-1">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        CONTRIBUTOR {{ String(index + 1).padStart(2, '0') }}
                    </div>
                    <div class="mt-2 flex items-center justify-between gap-3">
                        <h3 class="truncate text-2xl font-black">
                            {{ creator.creator }}
                        </h3>
                        <Icon name="i-tabler-arrow-up-right" class="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p class="mt-2 text-sm text-muted">
                        前端开发者 / prop.show 创作者
                    </p>
                </div>
            </NuxtLink>
        </div>
    </section>

    <section v-else class="my-20">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 sm:flex-row sm:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    PEOPLE ON AIR
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    正在发声的人
                </h2>
            </div>
            <NuxtLink to="/about" class="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-highlighted">
                认识创作团队
                <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <NuxtLink
                v-for="creator in creators"
                :key="creator.creator"
                :to="creator.href"
                target="_blank"
                class="group flex items-center gap-4 border border-default bg-default/60 p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-elevated/70 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary"
            >
                <NuxtImg
                    width="64"
                    height="64"
                    :src="creator.avatar"
                    :alt="`${creator.creator} avatar`"
                    class="size-16 rounded-sm object-cover"
                    loading="lazy"
                />

                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="truncate text-xl font-black">
                            {{ creator.creator }}
                        </h3>
                        <Icon name="i-tabler-arrow-up-right" class="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p class="mt-1 text-sm text-muted">
                        前端开发者 / 内容创作者
                    </p>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>
