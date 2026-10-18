<script setup lang="ts">
import type { Props } from '@/pages/index.server'

defineProps<Props>()
</script>

<template>
    <section>
        <PodcastHero
            :video-count="homeContent.videoTotal"
            :news-count="homeContent.newsTotal"
            :creator-count="homeContent.creatorTotal"
        />

        <div class="mx-auto max-w-6xl">
            <SocialLinks />
            <HomeLatestContent
                :videos="homeContent.videos"
                :news="homeContent.news"
                :video-total="homeContent.videoTotal"
                :news-total="homeContent.newsTotal"
            />
            <PlatformIntro />
            <TechLogos />
            <Creators />
            <Modules />
            <ComingSoonPreview />
        </div>
    </section>
</template>
