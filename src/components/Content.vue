<script lang="ts" setup>
defineProps<{
    value: { html: string }
}>()
</script>

<template>
    <div class="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-2xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-primary prose-a:decoration-primary/40">
        <div v-html="value.html" />
    </div>
</template>
