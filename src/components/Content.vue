<script lang="ts" setup>
defineProps<{
    value: { html: string }
}>()
</script>

<template>
    <div class="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-black prose-a:text-primary prose-a:decoration-primary/40">
        <div v-html="value.html" />
    </div>
</template>
