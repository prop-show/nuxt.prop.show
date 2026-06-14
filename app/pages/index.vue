<script lang="ts" setup>
const { creators } = useAppConfig()

const { data: contentCounts } = useAsyncData(
    'home-content-counts',
    async () => {
        const [videos, news] = await Promise.all([
            queryCollection('videos').all(),
            queryCollection('news').all(),
        ])

        return {
            videos: videos.length,
            news: news.length,
        }
    },
    {
        default: () => ({
            videos: 0,
            news: 0,
        }),
    },
)

useSeoMeta({
    title: '前端开发播客与教程 - prop.show',
    description:
    'prop.show 是专注于前端开发的播客与教程平台，提供 React、Vue、Node.js、TypeScript 等技术内容。包括视频教程、音频播客、新库推荐和框架解析。',
})
</script>

<template>
    <section>
        <PodcastHero
            :video-count="contentCounts.videos"
            :news-count="contentCounts.news"
            :creator-count="creators.length"
        />

        <div class="max-w-6xl mx-auto">
            <SocialLinks />
            <PlatformIntro />
            <LazyTechLogos />
            <LazyCreators />
            <LazyModules />
            <LazyComingSoonPreview />
        </div>
    </section>
</template>
