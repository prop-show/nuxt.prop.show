<script lang="ts" setup>
const { variant = 'default' } = defineProps<{
    variant?: 'default' | 'directory'
}>()

const { data: creators, pending, error } = useAsyncData(
    'creators',
    () => queryCollection('creators').order('order', 'ASC').all(),
    { default: () => [] },
)
</script>

<template>
    <section v-if="pending" class="my-20">
        <div class="mb-8 border-b border-default pb-5">
            <USkeleton class="mb-2 h-3 w-28" />
            <USkeleton class="h-10 w-64" />
        </div>
        <div class="grid gap-5 md:grid-cols-2">
            <div v-for="index in 2" :key="index" class="flex items-center gap-5 border border-default p-5">
                <USkeleton :class="variant === 'directory' ? 'size-22' : 'size-16'" />
                <div class="flex-1 space-y-3">
                    <USkeleton class="h-3 w-24" />
                    <USkeleton class="h-7 w-32" />
                    <USkeleton class="h-4 w-48" />
                </div>
            </div>
        </div>
    </section>

    <UAlert
        v-else-if="error"
        class="my-20"
        color="error"
        variant="subtle"
        icon="i-tabler-alert-triangle"
        title="创作者资料加载失败"
        description="请稍后刷新页面重试。"
    />

    <UEmpty
        v-else-if="!creators.length"
        class="my-20"
        icon="i-tabler-users-off"
        title="暂无创作者资料"
        description="团队成员资料更新后会显示在这里。"
    />

    <section v-else-if="variant === 'directory'" class="my-20">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 sm:flex-row sm:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    PEOPLE ON AIR
                </div>
                <h2 class="text-3xl font-black tracking-tight md:text-4xl">
                    节目背后的创作者
                </h2>
            </div>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span class="hidden font-mono text-xs font-bold tracking-[0.18em] text-dimmed md:block">
                    {{ String(creators.length).padStart(2, '0') }} CONTRIBUTORS
                </span>
                <NuxtLink to="/works" class="group inline-flex items-center gap-2 text-sm font-bold text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    查看团队成员作品
                    <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
            </div>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <NuxtLink
                v-for="(creator, index) in creators"
                :key="creator.id"
                :to="creator.href"
                target="_blank"
                class="group flex items-center gap-5 overflow-hidden border border-default bg-default/70 p-5 outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-elevated/70 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
            >
                <img
                    width="88"
                    height="88"
                    :src="creator.avatar"
                    :alt="`${creator.name} avatar`"
                    class="size-22 rounded-sm object-cover"
                    loading="lazy"
                    decoding="async"
                >

                <div class="min-w-0 flex-1">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        CONTRIBUTOR {{ String(index + 1).padStart(2, '0') }}
                    </div>
                    <div class="mt-2 flex items-center justify-between gap-3">
                        <h3 class="truncate text-2xl font-black">
                            {{ creator.name }}
                        </h3>
                        <Icon name="i-tabler-arrow-up-right" class="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p class="mt-2 text-sm text-muted">
                        {{ creator.role }}
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
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <NuxtLink to="/about" class="group inline-flex items-center gap-2 text-sm font-bold text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    认识创作团队
                    <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
                <NuxtLink to="/works" class="group inline-flex items-center gap-2 text-sm font-bold text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    查看团队作品
                    <Icon name="i-tabler-arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
            </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <NuxtLink
                v-for="creator in creators"
                :key="creator.id"
                :to="creator.href"
                target="_blank"
                class="group flex items-center gap-4 border border-default bg-default/60 p-4 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-elevated/70 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary"
            >
                <img
                    width="64"
                    height="64"
                    :src="creator.avatar"
                    :alt="`${creator.name} avatar`"
                    class="size-16 rounded-sm object-cover"
                    loading="lazy"
                    decoding="async"
                >

                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="truncate text-xl font-black">
                            {{ creator.name }}
                        </h3>
                        <Icon name="i-tabler-arrow-up-right" class="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p class="mt-1 text-sm text-muted">
                        {{ creator.role }}
                    </p>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>
