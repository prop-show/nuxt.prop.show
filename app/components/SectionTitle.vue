<script lang="ts" setup>
interface SectionTitleProps {
  title: string
  centered?: boolean
  size?: "sm" | "md" | "lg"
}
const { title, centered = true, size = "md" } = defineProps<SectionTitleProps>()

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
}
</script>

<template>
  <h2
    class="font-bold mb-6"
    :class="{
      'text-center': centered,
      [sizeClasses[size]]: true,
    }"
  >
    {{ title }}
  </h2>
</template>
