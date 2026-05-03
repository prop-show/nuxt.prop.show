<script lang="ts" setup>
const route = useRoute()
const { data: video } = useAsyncData(
    route.path,
    () => queryCollection('videos').path(route.path).first(),
)

useSeoMeta({
    title: () => video.value ? video.value.title : '速报 - prop.show',
    description: () => video.value ? video.value.description : '第一时间获得前端库和工具的最新动态和更新消息。',
})
</script>

<template>
    <div v-if="video" class="prose dark:prose-invert mx-auto ">
        <!-- <div class="aspect-video flex items-center justify-center">
            <NuxtImg :src="video.thumbnail" :alt="video.title" layout="fill" object-fit="cover" class="w-full" />
        </div> -->

        <h1>
            {{ video.title }}
        </h1>

        <p>
            {{ video.description }}
        </p>

        <div v-if="video.tags?.length" class="flex flex-wrap gap-1 my-3">
            <UBadge v-for="tag in video.tags" :key="tag" variant="outline" color="neutral" class="text-xs">
                {{ tag }}
            </UBadge>
        </div>

        <ContentRenderer v-if="video" :value="video" />

        <VideoPlatformButtons :platforms="video.platforms" />
    </div>
</template>
