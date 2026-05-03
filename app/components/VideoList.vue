<script lang="ts" setup>
import type { VideosCollectionItem } from '@nuxt/content'

defineProps<{
    videos: VideosCollectionItem[]
}>()
</script>

<template>
    <section class="grid gap-6">
        <template v-for="video in videos" :key="video.id">
            <NuxtLink :to="video.path">
                <VideoCard :video="video" />
            </NuxtLink>
        </template>
    </section>
</template>
