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
        class="group grid gap-5 border-b border-default py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:grid-cols-[minmax(0,1fr)_auto_1.25rem] lg:items-center"
    >
        <div class="min-w-0">
            <h3 class="text-[22px] leading-[1.4] font-bold text-highlighted transition-colors group-hover:text-primary">
                {{ work.title }}
            </h3>
            <p class="mt-2 truncate text-[13px] leading-6 text-muted">
                {{ work.type }}
            </p>
            <p class="mt-2 line-clamp-2 text-base leading-7 text-muted">
                {{ work.description }}
            </p>

            <TagList v-if="work.tags?.length" :tags="work.tags.filter(tag => tag !== work.type)" :limit="4" class="mt-3" />
        </div>

        <div class="min-w-0 lg:max-w-[16rem]">
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
