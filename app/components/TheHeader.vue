<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"
const { navigationLinks } = useAppConfig()

const items = ref<NavigationMenuItem[][]>([navigationLinks])
</script>

<template>
  <header class="flex justify-between items-center py-5 px-4 md:px-0">
    <NuxtLink to="/">
      <section class="flex items-center">
        <Icon name="prop:logo" size="60" />
        <section class="hidden md:block ml-2">
          <div class="font-black text-5xl">prop.show</div>
          <p class="font-bold mt-1">为你传递前端开发的核心属性</p>
        </section>
      </section>
    </NuxtLink>

    <div class="flex-1" />

    <aside class="justify-end hidden md:flex space-x-1">
      <UNavigationMenu color="neutral" :items="items" />
    </aside>

    <aside className="block md:hidden">
      <UDrawer title="导航菜单" direction="top" inset>
        <UButton color="neutral" variant="subtle" trailing-icon="i-tabler-align-justified" />

        <template #body>
          <UNavigationMenu color="neutral" :items="items" orientation="vertical" />
        </template>
      </UDrawer>
    </aside>

    <UColorModeButton />
  </header>
</template>
