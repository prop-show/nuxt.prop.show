<script lang="ts" setup>
const { data: videos, pending } = useAsyncData(() => queryCollection('videos').order('date', 'DESC').all(), {
  default: () => [],
})

useSeoMeta({
  title: '视频 - prop.show',
  description: '观看 prop.show 前端开发视频，包含项目实战、技术解析、工具使用等高质量内容。',
})

defineOgImageComponent('NuxtSeo', {
  headline: 'prop.show',
  title: '视频 🎥',
  description: '观看 prop.show 前端开发视频，包含项目实战、技术解析、工具使用等高质量内容。',
  theme: '#F0DB4F',
  colorMode: 'dark',
})
</script>

<template>
  <main>
    <PageHeader title="视频教程" description="通过高质量的视频内容，学习前端开发技能和最佳实践" />
    <section className="mb-16" />

    <section v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="i in 6" :key="i" class="group hover:shadow-lg transition-all">
        <USkeleton class="h-auto w-full aspect-video mb-2" />

        <USkeleton class="h-8 w-2/5 mb-2" />

        <section class="space-y-2">
          <USkeleton v-for="index in 2" :key="index" class="h-4 w-full" />
        </section>
      </UCard>
    </section>

    <UEmpty
      v-else-if="!videos.length"
      icon="i-tabler-player-play"
      title="暂无视频"
      description="精彩内容即将上线，敬请期待！"
    />

    <VideoList v-else :videos />
  </main>
</template>
