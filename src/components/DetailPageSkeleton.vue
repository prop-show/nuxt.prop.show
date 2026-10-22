<script setup lang="ts">
const { path } = defineProps<{ path: string }>()
const video = computed(() => path.startsWith('/videos/'))
const news = computed(() => path.startsWith('/news/'))
</script>

<template>
    <main aria-hidden="true" class="flow-root mx-auto max-w-3xl">
        <div class="my-8 md:my-12">
            <div class="inline-flex h-5 items-center gap-2 align-middle">
                <UiSkeleton class="size-4" />
                <UiSkeleton class="h-3.5 w-16" />
            </div>
        </div>

        <header>
            <div>
                <div class="flex h-[2.275rem] items-center sm:h-[2.6rem] lg:h-13">
                    <UiSkeleton class="h-7 w-full sm:h-8 sm:w-4/5 lg:h-10" />
                </div>
                <div class="flex h-[2.275rem] items-center sm:hidden">
                    <UiSkeleton class="h-7 w-3/5" />
                </div>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div class="flex h-5 items-center">
                    <UiSkeleton class="h-3.5" :class="news ? 'w-36' : 'w-16'" />
                </div>
                <template v-if="video">
                    <div class="flex h-5 items-center">
                        <UiSkeleton class="h-3.5 w-24" />
                    </div>
                    <div class="flex h-5 items-center">
                        <UiSkeleton class="h-3.5 w-16" />
                    </div>
                </template>
            </div>

            <template v-if="!news">
                <div class="mt-5">
                    <div v-for="line in 2" :key="line" class="flex h-8 items-center">
                        <UiSkeleton class="h-4" :class="line === 2 ? 'w-3/4' : 'w-full'" />
                    </div>
                </div>

                <section class="mt-6 bg-elevated/60 p-5 sm:p-6" :class="video ? 'space-y-4' : ''">
                    <div class="flex items-center" :class="video ? 'h-[1.575rem] lg:h-7' : 'h-7'">
                        <UiSkeleton class="h-[1.125rem]" :class="video ? 'w-28 lg:h-5' : 'w-44'" />
                    </div>
                    <div class="flex min-h-12 flex-col justify-center gap-2 sm:min-h-6" :class="video ? '' : 'mt-2'">
                        <UiSkeleton class="h-3.5 w-full max-w-96" />
                        <UiSkeleton class="h-3.5 w-2/3 sm:hidden" />
                    </div>
                    <div class="flex flex-wrap gap-3" :class="video ? '' : 'mt-4'">
                        <UiSkeleton class="h-12 w-full sm:w-48" />
                        <UiSkeleton class="h-12 w-full sm:w-40" />
                    </div>
                </section>

                <div v-if="!video" class="mt-6 flex flex-wrap items-center gap-4">
                    <div class="inline-flex items-center gap-3">
                        <UiSkeleton class="size-12 shrink-0 rounded-sm" />
                        <div>
                            <div class="flex h-5 items-center">
                                <UiSkeleton class="h-3.5 w-24" />
                            </div>
                            <div class="mt-1 flex h-5 items-center">
                                <UiSkeleton class="h-3.5 w-32" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex flex-wrap gap-2">
                    <div v-for="tag in 3" :key="tag" class="flex h-7 items-center px-2.5">
                        <UiSkeleton class="h-3.5" :class="tag === 2 ? 'w-16' : 'w-12'" />
                    </div>
                </div>
            </template>
        </header>

        <article class="min-w-0" :class="news ? 'my-8' : 'my-10'">
            <div :class="video ? 'border-t border-default pt-7' : ''">
                <div v-if="video" class="mb-6 flex h-[1.575rem] items-center lg:h-7">
                    <UiSkeleton class="h-[1.125rem] w-20 lg:h-5" />
                </div>
                <div class="space-y-6 sm:space-y-7">
                    <div v-for="paragraph in 3" :key="paragraph">
                        <div v-for="line in 3" :key="line" class="flex h-8 items-center sm:h-9">
                            <UiSkeleton class="h-4 sm:h-[1.125rem]" :class="line === 3 ? (paragraph === 2 ? 'w-2/3' : 'w-5/6') : 'w-full'" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </main>
</template>
