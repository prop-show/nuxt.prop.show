<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import IconMoon from '~icons/tabler/moon'
import IconSun from '~icons/tabler/sun'
import UiButton from '@/components/ui/button/Button.vue'
import { themeStorageKey } from '@/config'

const mode = useColorMode({ storageKey: themeStorageKey })
</script>

<template>
    <UiButton variant="ghost" size="icon" aria-label="切换明暗主题" @click="mode = mode === 'dark' ? 'light' : 'dark'">
        <span class="hidden size-5 dark:block">
            <IconSun aria-hidden="true" class="size-5" />
        </span>
        <span class="size-5 dark:hidden">
            <IconMoon aria-hidden="true" class="size-5" />
        </span>
    </UiButton>
</template>
