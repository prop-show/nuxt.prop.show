<script lang="ts" setup>
import NewsLine from "~/components/NewsLine.vue"

const { data: news, pending } = useAsyncData(() => queryCollection("news").order("date", "DESC").all(), {
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

    <section v-if="pending">
      <UCard class="space-y-4 mb-4" v-for="i in 4" :key="i">
        <template #header>
          <USkeleton class="h-8 w-[250px]" />
        </template>
        <section class="space-y-2">
          <USkeleton class="h-4" v-for="i in 3" :key="i" />
        </section>
      </UCard>
    </section>

    <UEmpty
      v-else-if="!news.length"
      icon="i-tabler-hourglass-empty"
      title="还没有东西哦"
      description="暂时没有新的速报内容。请稍后再来看看！"
    />

    <NewsLine :news v-else />
  </main>
</template>
