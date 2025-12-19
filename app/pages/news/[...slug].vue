<script lang="ts" setup>
const route = useRoute()
const { data: letter } = useAsyncData(
    route.path,
    () => queryCollection('news').path(route.path).first(),
)

useSeoMeta({
    title: () => letter.value ? letter.value.title : '速报 - prop.show',
    description: () => letter.value ? letter.value.description : '第一时间获得前端库和工具的最新动态和更新消息。',
})
</script>

<template>
    <div v-if="letter" class="prose dark:prose-invert mx-auto ">
        <h1>
            {{ letter.title }}
        </h1>

        <ContentRenderer v-if="letter" :value="letter" />
    </div>
</template>
