<script setup lang="ts">
import type { Props } from '@/pages/design-assets/index.server'
import DesignAssetsColorPalette from '@/pages/design-assets/_components/ColorPalette.vue'
import DesignAssetsHero from '@/pages/design-assets/_components/Hero.vue'
import DesignAssetsLogoGallery from '@/pages/design-assets/_components/LogoGallery.vue'
import DesignAssetsUsageRules from '@/pages/design-assets/_components/UsageRules.vue'

defineProps<Props>()
</script>

<template>
    <main>
        <DesignAssetsHero />
        <DesignAssetsLogoGallery />
        <DesignAssetsColorPalette />
        <DesignAssetsUsageRules />
    </main>
</template>
