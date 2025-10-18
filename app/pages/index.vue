<script lang="ts" setup>
useSeoMeta({
  title: "前端开发播客与教程 - prop.show",
  description:
    "prop.show 是专注于前端开发的播客与教程平台，提供 React、Vue、Node.js、TypeScript 等技术内容。包括视频教程、音频播客、新库推荐和框架解析。",
})
</script>

<template>
  <PodcastHero />

  <div class="max-w-6xl mx-auto">
    <SocialLinks />
    <PlatformIntro />
    <TechLogos />
    <Creators />
    <Modules />
    <ComingSoonPreview />
  </div>
</template>
