<script lang="ts" setup>
interface PageHeaderProps {
  title: string
  description?: string
}

defineProps<PageHeaderProps>()
</script>

<template>
  <header class="text-center mb-12">
    <VueBitsBlurText
      :text="title"
      :delay="150"
      animateBy="words"
      direction="top"
      class="font-bold items-center justify-center mx-auto text-4xl md:text-5xl mb-4"
    />
    <p v-if="description" class="text-lg text-muted-foreground max-w-2xl mx-auto">{{ description }}</p>
  </header>
</template>
