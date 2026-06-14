<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

defineProps<{
    videos: VideosCollectionItem[]
}>()
</script>

<template>
    <section class="grid gap-6">
        <template v-for="video in videos" :key="video.id">
            <NuxtLink :to="video.path" class="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default">
                <VideoCard :video="video" />
            </NuxtLink>
        </template>
    </section>
</template>
