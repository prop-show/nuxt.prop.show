<script lang="ts" setup>
import NewsLine from "~/components/NewsLine.vue"

const { data: news } = useAsyncData(() => queryCollection("news").order("date", "DESC").all(), {
  default: () => [],
})

useSeoMeta({
  title: "速报 - prop.show",
  description: "第一时间获得前端库和工具的最新动态和更新消息。",
})
</script>

<template>
  <main>
    <PageHeader title="速报" description="一些库和工具的最新动态和更新消息" />
    <section className="mb-16"></section>
    <UEmpty
      v-if="!news.length"
      icon="i-tabler-hourglass-empty"
      title="还没有东西哦"
      description="暂时没有新的速报内容。请稍后再来看看！"
    />
    <NewsLine :news v-else />
  </main>
</template>
