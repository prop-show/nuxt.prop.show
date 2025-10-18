<script lang="ts" setup>
import type { CreatorProp } from "./creator.type"

const { avatar, creator, href } = defineProps<CreatorProp>()
</script>

<template>
  <div class="flex items-center gap-2">
    <img width="40" height="40" :src="avatar" alt="whbbit-avatar" class="size-[40px] rounded-full object-cover" />
    <NuxtLink :to="href" target="_blank" class="flex items-center gap-1 border-b-1 border-primary">
      <IconLink />
      <Icon name="i-tabler-link" size="24" />
      <span class="font-black text-xl">{{ creator }}</span>
    </NuxtLink>
  </div>
</template>
