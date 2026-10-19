<script setup lang="ts">
import type { Creator, Work } from '@/content'

defineProps<{
    work: Work
    creator?: Creator
}>()
</script>

<template>
    <SiteLink
        :to="work.path"
        class="group grid gap-5 border-b border-default px-1 py-7 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:px-5 lg:grid-cols-[minmax(0,1fr)_14rem_2.5rem] lg:items-center"
    >
        <div class="min-w-0">
            <div class="font-mono text-[10px] font-bold tracking-[0.14em] text-dimmed">
                {{ work.type }}
            </div>
            <h3 class="mt-2 text-lg font-black transition-colors group-hover:text-primary md:text-xl">
                {{ work.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                {{ work.description }}
            </p>

            <TagList v-if="work.tags?.length" :tags="work.tags" :limit="4" class="mt-3" />
        </div>

        <div>
            <div v-if="creator" class="mt-3 flex items-center gap-3">
                <CreatorAvatar :creator="creator" />
                <div class="min-w-0">
                    <div class="truncate text-sm font-black">
                        {{ creator.name }}
                    </div>
                    <div class="mt-0.5 truncate text-xs text-muted">
                        {{ creator.role }}
                    </div>
                </div>
            </div>
            <div v-else class="mt-3 flex items-center gap-2 text-sm font-bold text-muted">
                <Icon name="i-tabler-user-question" class="size-5" />
                未知作者
            </div>
        </div>

        <div class="hidden size-10 items-center justify-center border border-default text-muted transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-black lg:flex">
            <Icon name="i-tabler-arrow-right" class="size-5 transition-transform group-hover:translate-x-1" />
        </div>
    </SiteLink>
</template>
