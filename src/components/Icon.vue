<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '@/icons'

const props = defineProps<{ name: string, size?: number | string }>()
const icon = computed(() => {
    const name = props.name.replace(/^i-/, '')
    const key = name.replace(/^(tabler|lucide)[-:]/, '$1:')
    return icons[key]
})
</script>

<template>
    <img v-if="name.startsWith('prop:')" :src="`/${name.slice(5)}.svg`" alt="" :width="size || 24" :height="size || 24" class="shrink-0">
    <svg v-else :width="size || '1em'" :height="size || '1em'" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="inline-block shrink-0" v-html="icon?.body || ''" />
</template>
