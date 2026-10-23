<script setup lang="ts">
import type { Creator, Work } from '@/content'
import IconArrowRight from '~icons/tabler/arrow-right'
import IconUserQuestion from '~icons/tabler/user-question'

defineProps<{
    work: Work
    creator?: Creator
}>()
</script>

<template>
    <SiteLink
        :to="work.path"
        class="group grid gap-5 border-b border-default px-1 py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-5 lg:grid-cols-[minmax(0,1fr)_14rem_1.25rem] lg:items-center"
    >
        <div class="min-w-0">
            <div class="text-[13px] leading-6 text-muted">
                {{ work.type }}
            </div>
            <h3 class="mt-2 text-[22px] leading-[1.4] font-bold text-highlighted transition-colors group-hover:text-primary">
                {{ work.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-base leading-7 text-muted">
                {{ work.description }}
            </p>

            <div v-if="work.tags?.length" class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] leading-6 text-muted">
                <span v-for="tag in work.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
            </div>
        </div>

        <div>
            <div v-if="creator" class="flex items-center gap-3">
                <CreatorAvatar :creator="creator" />
                <div class="min-w-0">
                    <div class="truncate text-sm font-medium text-highlighted">
                        {{ creator.name }}
                    </div>
                    <div class="mt-0.5 truncate text-[13px] leading-6 text-muted">
                        {{ creator.role }}
                    </div>
                </div>
            </div>
            <div v-else class="flex items-center gap-2 text-sm text-muted">
                <IconUserQuestion aria-hidden="true" class="size-5" />
                未知作者
            </div>
        </div>

        <div class="hidden text-muted transition-colors group-hover:text-primary lg:block">
            <IconArrowRight aria-hidden="true" class="size-5 transition-transform group-hover:translate-x-1" />
        </div>
    </SiteLink>
</template>
