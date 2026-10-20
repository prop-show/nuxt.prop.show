<script setup lang="ts">
import '@/assets/css/main.css'
</script>

<template>
    <div class="container mx-auto min-h-svh px-4 md:px-8 lg:px-0">
        <TheHeader />
        <slot />
        <TheFooter />
    </div>
</template>
