<script setup lang="ts">
import { Link } from '@void/vue'
import { computed } from 'vue'
import { resolveLink } from '@/navigation'

const props = defineProps<{
    to: string | { path: string, query?: Record<string, unknown> }
    external?: boolean
    preserveScroll?: boolean
    preserveState?: boolean
}>()
const href = computed(() => resolveLink(props.to))
const isExternal = computed(() => props.external || /^(?:https?:|mailto:|#)/.test(href.value) || /\.[a-z]+(?:\?|$)/i.test(href.value))
</script>

<template>
    <a v-if="isExternal" :href="href"><slot /></a>
    <Link v-else :href="href" :preserve-scroll="preserveScroll" :preserve-state="preserveState">
        <slot />
    </Link>
</template>
