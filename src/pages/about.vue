<script setup lang="ts">
import type { Props } from '@/pages/about.server'

defineProps<Props>()
</script>

<template>
    <main class="mx-auto max-w-5xl">
        <AboutHero />

        <Creators variant="directory" />

        <Modules />

        <OurMission />
    </main>
</template>
