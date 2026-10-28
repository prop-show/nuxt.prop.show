<script setup lang="ts">
defineProps<{ path: string }>()
</script>

<template>
    <div aria-hidden="true" class="flow-root">
        <div class="my-8 md:my-12">
            <UiSkeleton class="h-[39px] w-40 sm:h-12 lg:h-[58px]" />
            <div class="mt-4 flex h-8 items-center">
                <UiSkeleton class="h-4 w-72 max-w-full" />
            </div>
        </div>
        <div v-if="path === '/videos'">
            <div class="mb-4 flex h-10 items-center">
                <UiSkeleton class="h-4 w-72 max-w-full" />
            </div>
            <div class="flex flex-col gap-2 py-2 sm:flex-row sm:gap-4">
                <div class="flex h-11 items-center">
                    <UiSkeleton class="h-3.5 w-7" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <UiSkeleton v-for="category in 4" :key="category" class="h-9 w-20 rounded-none" />
                </div>
            </div>
            <div class="flex min-h-11 items-center justify-between py-3">
                <UiSkeleton class="h-4 w-28" /><UiSkeleton class="h-3.5 w-16" />
            </div>
            <UiSkeleton class="mt-4 h-5 w-32" />
        </div>
        <div v-else-if="path === '/works'">
            <div class="flex flex-col gap-2 py-2 sm:flex-row sm:gap-4">
                <div class="flex h-11 items-center">
                    <UiSkeleton class="h-3.5 w-7" />
                </div>
                <div class="flex gap-2">
                    <UiSkeleton v-for="author in 3" :key="author" class="h-11 w-24 rounded-none" />
                </div>
            </div>
        </div>
        <div class="mt-10 mb-8 md:mt-16 md:mb-10">
            <div class="mb-6">
                <UiSkeleton class="h-4 w-28" />
            </div>
            <div :class="path === '/news' ? '' : 'border-y border-default'">
                <div v-for="row in 4" :key="row" class="border-b border-default px-1 py-7 last:border-0 sm:px-5" :class="path === '/works' ? 'grid gap-5 lg:grid-cols-[minmax(0,1fr)_14rem_1.25rem] lg:items-center' : ''">
                    <div>
                        <div v-if="path !== '/videos'" class="mb-2 flex h-6 items-center">
                            <UiSkeleton class="h-3.5 w-24" />
                        </div>
                        <div class="flex min-h-[31px] items-center">
                            <UiSkeleton class="h-[22px] w-3/4" />
                        </div>
                        <div v-if="path === '/videos'" class="mt-2 flex h-6 items-center">
                            <UiSkeleton class="h-3.5 w-44 max-w-full" />
                        </div>
                        <div class="mt-2">
                            <div v-for="line in 2" :key="line" class="flex h-7 items-center">
                                <UiSkeleton class="h-4" :class="line === 2 ? 'w-3/5' : 'w-full'" />
                            </div>
                        </div>
                        <div v-if="path !== '/news'" class="mt-3 flex h-6 items-center gap-3">
                            <UiSkeleton class="h-3.5 w-20" /><UiSkeleton class="h-3.5 w-24" />
                        </div>
                    </div>
                    <template v-if="path === '/works'">
                        <div class="flex items-center gap-3">
                            <UiSkeleton class="size-10 shrink-0" /><div class="space-y-2">
                                <UiSkeleton class="h-4 w-20" /><UiSkeleton class="h-3.5 w-32" />
                            </div>
                        </div>
                        <UiSkeleton class="hidden size-5 lg:block" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
