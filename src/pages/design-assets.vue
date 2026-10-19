<script setup lang="ts">
import type { Props } from '@/pages/design-assets.server'

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
