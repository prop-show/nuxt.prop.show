<script lang="ts" setup>
interface FeatureCardProps {
  title: string
  description: string
}

defineProps<FeatureCardProps>()
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <h2>{{ title }}</h2>
      </div>
      <p class="text-sm text-muted">{{ description }}</p>

      <div class="text-muted mt-2">
        <slot></slot>
      </div>
    </template>
  </UCard>
</template>
