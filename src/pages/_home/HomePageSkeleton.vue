<template>
    <div aria-hidden="true" class="flow-root">
        <div class="py-10 sm:py-14 lg:py-16">
            <div class="mb-9 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                <UiSkeleton class="h-[42px] w-full max-w-xl sm:h-[55px] lg:h-[69px]" />
                <div class="w-64 shrink-0 space-y-3 py-1">
                    <UiSkeleton class="h-4 w-full" /><UiSkeleton class="h-4 w-4/5" />
                </div>
            </div>
            <div class="grid overflow-hidden bg-primary lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div class="p-6 sm:p-10 lg:p-12">
                    <div class="mb-5 flex h-5 items-center">
                        <UiSkeleton class="h-3.5 w-36 bg-black/15" />
                    </div>
                    <div class="flex h-9 items-center sm:h-12 lg:h-[58px]">
                        <UiSkeleton class="h-7 w-4/5 bg-black/20 sm:h-9 lg:h-11" />
                    </div>
                    <div class="mt-5 max-w-xl">
                        <div v-for="line in 3" :key="line" class="flex h-8 items-center sm:last:hidden lg:last:flex">
                            <UiSkeleton class="h-4 bg-black/15" :class="line === 3 ? 'w-3/5' : 'w-full'" />
                        </div>
                    </div>
                    <UiSkeleton class="mt-7 h-12 w-48 rounded-none bg-black/25" />
                </div>
                <div class="flex flex-col justify-between gap-5 bg-black/[0.045] p-6 sm:p-10 lg:p-8">
                    <div>
                        <div class="flex h-5 items-center">
                            <UiSkeleton class="h-3.5 w-28 bg-black/15" />
                        </div>
                        <div class="mt-3 space-y-3 py-1">
                            <UiSkeleton class="h-5 w-full bg-black/20" /><UiSkeleton class="h-5 w-2/3 bg-black/20" />
                        </div>
                        <div class="mt-3 space-y-3 py-1">
                            <UiSkeleton class="h-3.5 w-full bg-black/15" /><UiSkeleton class="h-3.5 w-4/5 bg-black/15" />
                        </div>
                    </div>
                    <div class="flex h-11 items-center">
                        <UiSkeleton class="h-3.5 w-32 bg-black/20" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-16 grid gap-12 lg:mb-24 lg:grid-cols-2 lg:gap-16">
            <div v-for="column in 2" :key="column" class="min-w-0">
                <div class="mb-6 flex flex-col justify-between gap-3 sm:h-11 sm:flex-row sm:items-end">
                    <UiSkeleton class="h-8 w-20 lg:h-9" /><UiSkeleton class="h-5 w-28" />
                </div>
                <div class="space-y-1">
                    <div v-for="row in 3" :key="row" class="flex min-h-18 items-center gap-4 py-4">
                        <UiSkeleton class="h-3.5 w-12 shrink-0" /><UiSkeleton class="h-5" :class="row === 2 ? 'w-4/5' : 'w-3/5'" />
                    </div>
                </div>
            </div>
        </div>
        <div class="my-12 md:my-16">
            <UiSkeleton class="mb-6 h-9 w-32" />
            <div class="grid gap-x-12 gap-y-6 md:grid-cols-2">
                <div v-for="member in 2" :key="member" class="flex gap-4 pt-6">
                    <UiSkeleton class="size-14 shrink-0" /><div class="space-y-4">
                        <UiSkeleton class="h-7 w-28" /><UiSkeleton class="h-5 w-40" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
