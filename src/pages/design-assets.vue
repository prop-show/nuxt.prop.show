<script setup lang="ts">
import type { Props } from '@/pages/design-assets.server'

defineProps<Props>()
</script>

<template>
    <div>
        <DesignAssetsHero />
        <DesignAssetsLogoGallery />
        <DesignAssetsColorPalette />
        <DesignAssetsUsageRules />
    </div>
</template>
