<script lang="ts" setup>
const socials: { href: string; platform: string; icon: string }[] = [
  { href: "https://github.com/prop-show", platform: "GitHub", icon: "i-tabler-brand-github" },
  { href: "https://space.bilibili.com/104376935", platform: "哔哩哔哩", icon: "i-tabler-brand-bilibili" },
  { href: "https://www.youtube.com/@PropShowFM", platform: "YouTube", icon: "i-tabler-brand-youtube" },
]
</script>

<template>
  <UAlert
    class="my-4 max-w-[500px] mx-auto"
    color="neutral"
    variant="subtle"
    title="点击链接收看最新节目"
    icon="i-tabler-pointer-filled"
  >
    <template #description>
      <section class="flex flex-wrap items-center gap-2 mt-2">
        <UButton
          color="neutral"
          variant="outline"
          v-for="social in socials"
          :key="social.platform"
          :href="social.href"
          :icon="social.icon"
          target="_blank"
        >
          {{ social.platform }}
        </UButton>
      </section>
    </template>
  </UAlert>
</template>
