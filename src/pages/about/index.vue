<script setup lang="ts">
import type { Props } from '@/pages/about/index.server'
import AboutHero from '@/pages/about/_components/Hero.vue'
import Modules from '@/pages/about/_components/Modules.vue'
import OurMission from '@/pages/about/_components/OurMission.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <AboutHero />

        <Creators variant="directory" />

        <Modules />

        <OurMission />
    </main>
</template>
