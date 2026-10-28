<script setup lang="ts">
import type { Props } from '@/pages/index.server'
import HomeLatestContent from '@/pages/_home/HomeLatestContent.vue'
import PodcastHero from '@/pages/_home/PodcastHero.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <PodcastHero :video="homeContent.videos[0]" />

        <HomeLatestContent
            :videos="homeContent.videos"
            :news="homeContent.news"
            :video-total="homeContent.videoTotal"
            :news-total="homeContent.newsTotal"
        />
        <Creators />
    </main>
</template>
