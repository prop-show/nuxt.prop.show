<script lang="ts" setup>
const { creators } = useAppConfig()

const { data: homeContent } = useAsyncData(
    'home-content',
    async () => {
        const [videoTotal, newsTotal, videos, news] = await Promise.all([
            queryCollection('videos').count('*'),
            queryCollection('news').count('*'),
            queryCollection('videos').order('order', 'DESC').limit(3).all(),
            queryCollection('news').order('date', 'DESC').limit(3).all(),
        ])

        return {
            videoTotal,
            newsTotal,
            videos,
            news,
        }
    },
    {
        default: () => ({
            videoTotal: 0,
            newsTotal: 0,
            videos: [],
            news: [],
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
            :video-count="homeContent.videoTotal"
            :news-count="homeContent.newsTotal"
            :creator-count="creators.length"
        />

        <div class="mx-auto max-w-6xl">
            <HomeLatestContent
                :videos="homeContent.videos"
                :news="homeContent.news"
                :video-total="homeContent.videoTotal"
                :news-total="homeContent.newsTotal"
            />
            <SocialLinks />
            <PlatformIntro />
            <LazyTechLogos />
            <LazyCreators />
            <LazyModules />
            <LazyComingSoonPreview />
        </div>
    </section>
</template>
