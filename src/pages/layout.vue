<script setup lang="ts">
import ui from '@nuxt/ui/vue-plugin'
import { getCurrentInstance } from 'vue'
import '@/assets/css/main.css'

const app = getCurrentInstance()!.appContext.app
if (!app.config.globalProperties.$propUiInstalled) {
    app.use(ui)
    app.config.globalProperties.$propUiInstalled = true
}
</script>

<template>
    <UApp>
        <div class="container mx-auto min-h-svh px-4 md:px-8 lg:px-0">
            <TheHeader />
            <slot />
            <TheFooter />
        </div>
    </UApp>
</template>
