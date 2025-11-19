<script lang="ts" setup>
const { data: videos } = useAsyncData(() => queryCollection("videos").order("date", "DESC").all(), {
  default: () => [],
})
useSeoMeta({
  title: "视频 - prop.show",
  description: "观看 prop.show 前端开发视频，包含项目实战、技术解析、工具使用等高质量内容。",
})
</script>

<template>
  <main>
    <PageHeader title="视频教程" description="通过高质量的视频内容，学习前端开发技能和最佳实践" />
    <section className="mb-16"></section>
    <UEmpty
      v-if="!videos.length"
      icon="i-tabler-player-play"
      title="暂无视频"
      description="精彩内容即将上线，敬请期待！"
    />
    <VideoList :videos v-else />
  </main>
</template>
