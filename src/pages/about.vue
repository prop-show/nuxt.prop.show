<script setup lang="ts">
import type { Props } from '@/pages/about.server'

defineProps<Props>()
</script>

<template>
    <section>
        <AboutHero />

        <OurMission />

        <Modules />

        <Creators variant="directory" />

        <Stack />
    </section>
</template>
