<script setup lang="ts">
const { path } = defineProps<{ path: string }>()
const detail = computed(() => /^\/(?:videos|news|works)\/[^/]+\/?$/.test(path))
</script>

<template>
    <HomePageSkeleton v-if="path === '/'" />
    <DetailPageSkeleton v-else-if="detail" :path="path" />
    <ArchivePageSkeleton v-else-if="['/videos', '/news', '/works'].includes(path)" :path="path" />
    <StaticPageSkeleton v-else :path="path" />
</template>
