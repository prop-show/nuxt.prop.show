<script setup lang="ts">
defineProps<{ path: string }>()
</script>

<template>
    <div class="flow-root" aria-hidden="true">
        <div v-if="path === '/about'" class="mx-auto max-w-5xl">
            <header class="my-8 md:my-12">
                <div class="flex h-[2.4rem] items-center sm:h-12 lg:h-[3.6rem]">
                    <UiSkeleton class="h-8 w-64 max-w-full sm:h-10 lg:h-12" />
                </div>
                <div class="mt-4 flex min-h-7 max-w-2xl items-center">
                    <UiSkeleton class="h-4 w-full max-w-[32rem]" />
                </div>
            </header>

            <section class="my-12 md:my-16">
                <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div class="flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                        <UiSkeleton class="h-6 w-24 lg:h-8" />
                    </div>
                    <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <UiSkeleton class="h-5 w-20" />
                        <div class="flex min-h-11 items-center">
                            <UiSkeleton class="h-4 w-28" />
                        </div>
                    </div>
                </div>
                <div class="grid gap-x-12 gap-y-6 md:grid-cols-2">
                    <div v-for="creator in 2" :key="creator" class="flex min-w-0 items-start gap-4 pt-6">
                        <UiSkeleton class="size-18 shrink-0 rounded-sm" />
                        <div class="min-w-0 flex-1">
                            <div class="flex h-7 items-center">
                                <UiSkeleton class="h-5 w-28 max-w-full" />
                            </div>
                            <div class="mt-2 flex h-6 items-center">
                                <UiSkeleton class="h-4 w-40 max-w-full" />
                            </div>
                            <div class="mt-2 flex flex-wrap items-center gap-x-5">
                                <div v-for="link in 2" :key="link" class="flex min-h-11 items-center">
                                    <UiSkeleton class="h-4 w-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="my-12 md:my-16">
                <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div class="flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                        <UiSkeleton class="h-6 w-24 lg:h-8" />
                    </div>
                    <div class="flex min-h-11 items-center">
                        <UiSkeleton class="h-4 w-20" />
                    </div>
                </div>
                <div class="mb-8 flex min-h-16 max-w-2xl flex-col justify-center gap-4 sm:min-h-8">
                    <UiSkeleton class="h-4 w-full" />
                    <UiSkeleton class="h-4 w-2/3 sm:hidden" />
                </div>
                <div class="grid gap-6 md:grid-cols-3 md:gap-8">
                    <div v-for="channel in 3" :key="channel" class="min-w-0 bg-elevated/60 p-5 sm:p-6">
                        <div class="flex h-8 items-center justify-between gap-3">
                            <UiSkeleton class="h-5 w-20" />
                            <UiSkeleton class="size-4 shrink-0" />
                        </div>
                        <div class="mt-3 flex h-7 items-center">
                            <UiSkeleton class="h-4 w-full" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="my-12 md:my-16">
                <div class="mb-6 flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                    <UiSkeleton class="h-6 w-24 lg:h-8" />
                </div>
                <div class="grid gap-x-12 gap-y-8 md:grid-cols-2">
                    <div v-for="principle in 4" :key="principle" class="space-y-2">
                        <div class="flex h-8 items-center">
                            <UiSkeleton class="h-5 w-28" />
                        </div>
                        <div class="flex min-h-16 max-w-2xl flex-col justify-center gap-4">
                            <UiSkeleton class="h-4 w-full" />
                            <UiSkeleton class="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div v-else-if="path === '/design-assets'">
            <header class="my-8 md:my-12">
                <div class="flex h-9 items-center sm:h-[2.7rem] lg:h-[3.6rem]">
                    <UiSkeleton class="h-7 w-32 sm:h-9 sm:w-36 lg:h-12 lg:w-48" />
                </div>
                <div class="mt-5 flex min-h-8 max-w-2xl items-center">
                    <UiSkeleton class="h-4 w-96 max-w-full" />
                </div>
                <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    <div v-for="item in 3" :key="item" class="flex min-h-11 items-center">
                        <UiSkeleton class="h-4 w-14" />
                    </div>
                </div>
            </header>

            <section class="my-12 md:my-16">
                <div class="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div class="flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                        <UiSkeleton class="h-6 w-28 lg:h-8" />
                    </div>
                    <div class="flex h-6 max-w-md items-center">
                        <UiSkeleton class="h-4 w-28" />
                    </div>
                </div>
                <div class="grid gap-8 md:grid-cols-2">
                    <div v-for="surface in ['bg-white', 'bg-black']" :key="surface" class="min-w-0">
                        <div class="flex min-h-56 items-center justify-center border border-default p-8 sm:min-h-64" :class="surface">
                            <UiSkeleton class="size-36 rounded-none bg-neutral-200 sm:size-40" :class="surface === 'bg-black' ? 'bg-neutral-800' : ''" />
                        </div>
                        <div class="py-5">
                            <div class="flex items-start justify-between gap-4">
                                <div class="flex h-7 items-center">
                                    <UiSkeleton class="h-5 w-28" />
                                </div>
                                <div class="flex h-5 items-center">
                                    <UiSkeleton class="h-3 w-20" />
                                </div>
                            </div>
                            <div class="mt-5 grid gap-3 sm:grid-cols-2">
                                <div v-for="download in 2" :key="download" class="flex min-h-12 items-center justify-between gap-4 border border-default px-4">
                                    <UiSkeleton class="h-4 w-24 max-w-full" />
                                    <UiSkeleton class="size-4 shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="my-12 md:my-16">
                <div class="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div class="flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                        <UiSkeleton class="h-6 w-24 lg:h-8" />
                    </div>
                    <div class="flex min-h-6 w-full max-w-md items-center">
                        <UiSkeleton class="h-4 w-full" />
                    </div>
                </div>
                <div class="border-y border-default">
                    <div v-for="color in 3" :key="color" class="grid w-full border-b border-default last:border-b-0 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
                        <UiSkeleton class="min-h-20 rounded-none sm:min-h-32" />
                        <div class="flex flex-col justify-center px-5 py-5">
                            <div class="flex h-7 items-center">
                                <UiSkeleton class="h-5 w-20" />
                            </div>
                            <div class="mt-2 flex min-h-6 items-center">
                                <UiSkeleton class="h-4 w-full" />
                            </div>
                            <div class="mt-5 flex h-5 items-center">
                                <UiSkeleton class="h-3 w-28" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between gap-6 border-t border-default px-5 py-4 sm:border-t-0">
                            <UiSkeleton class="h-4 w-16" />
                            <UiSkeleton class="size-5" />
                        </div>
                    </div>
                </div>
                <div class="mt-3 min-h-6" />
            </section>

            <section class="my-12 md:my-16">
                <div class="mb-6 flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                    <UiSkeleton class="h-6 w-24 lg:h-8" />
                </div>
                <div class="grid gap-x-12 gap-y-8 md:grid-cols-2">
                    <div v-for="rule in 4" :key="rule" class="min-w-0">
                        <div class="flex size-8 items-center justify-center">
                            <UiSkeleton class="size-5" />
                        </div>
                        <div class="mt-3 flex h-[1.575rem] items-center lg:h-7">
                            <UiSkeleton class="h-5 w-28" />
                        </div>
                        <div class="mt-3 flex min-h-16 max-w-xl flex-col justify-center gap-4">
                            <UiSkeleton class="h-4 w-full" />
                            <UiSkeleton class="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div v-else-if="path === '/series/yisi'">
            <header class="my-8 md:my-12">
                <div class="flex min-h-[4.875rem] max-w-3xl flex-col justify-center gap-3 sm:min-h-[2.925rem] lg:min-h-[3.9rem]">
                    <UiSkeleton class="h-8 w-full max-w-[36rem] sm:h-9 lg:h-12 lg:max-w-[42rem]" />
                    <UiSkeleton class="h-8 w-2/5 sm:hidden" />
                </div>
                <div class="mt-5 flex min-h-16 max-w-2xl flex-col justify-center gap-4">
                    <UiSkeleton class="h-4 w-full" />
                    <UiSkeleton class="h-4 w-2/3" />
                </div>
                <div class="mt-6 flex flex-wrap items-center gap-5">
                    <UiSkeleton class="h-12 w-44" />
                    <UiSkeleton class="h-5 w-44" />
                    <div class="flex min-h-11 items-center">
                        <UiSkeleton class="h-4 w-28" />
                    </div>
                </div>
            </header>
            <section class="my-8 md:my-10">
                <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div class="flex h-[1.95rem] items-center lg:h-[2.4375rem]">
                        <UiSkeleton class="h-6 w-36 lg:h-8" />
                    </div>
                    <UiSkeleton class="h-5 w-24" />
                </div>
                <div class="overflow-hidden border-y border-default">
                    <div v-for="episode in 5" :key="episode" class="border-b border-default px-1 py-7 last:border-b-0 sm:px-5">
                        <div class="flex min-h-[1.925rem] items-center">
                            <UiSkeleton class="h-6 w-3/5" />
                        </div>
                        <div class="mt-2 flex h-6 items-center">
                            <UiSkeleton class="h-3 w-48 max-w-full" />
                        </div>
                        <div class="mt-2 flex min-h-14 flex-col justify-center gap-3">
                            <UiSkeleton class="h-4 w-full" />
                            <UiSkeleton class="h-4 w-4/5" />
                        </div>
                        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <UiSkeleton v-for="platform in 3" :key="platform" class="h-4 w-16" />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div v-else class="mx-auto my-12 max-w-3xl sm:my-20">
            <div class="flex h-5 items-center">
                <UiSkeleton class="h-3 w-7" />
            </div>
            <div class="mt-8 flex h-[2.4rem] items-center sm:h-12 lg:h-[3.6rem]">
                <UiSkeleton class="h-8 w-48 max-w-full sm:h-10 lg:h-12 lg:w-60" />
            </div>
            <div class="mt-6 flex min-h-8 max-w-2xl items-center">
                <UiSkeleton class="h-4 w-96 max-w-full" />
            </div>
            <div class="mt-10 flex flex-wrap gap-3">
                <UiSkeleton v-for="action in 3" :key="action" class="h-10 w-26" />
            </div>
        </div>
    </div>
</template>
