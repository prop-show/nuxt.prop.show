<script setup lang="ts">
import type { Props } from '@/pages/about.server'

defineProps<Props>()
</script>

<template>
    <main>
        <AboutHero />

        <OurMission />

        <Modules />

        <Creators variant="directory" />

        <Stack />
    </main>
</template>
