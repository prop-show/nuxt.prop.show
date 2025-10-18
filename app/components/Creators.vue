<script lang="ts" setup>
import type { CreatorProp } from "./creator.type"

const creators: CreatorProp[] = [
  {
    avatar: "https://bitmc.uno/picgo/126662463_p2.jpg",
    creator: "Whbbit1999",
    href: "https://github.com/Whbbit1999",
  },
  {
    avatar: "https://bitmc.uno/picgo/Himavanta.jpeg",
    creator: "Himavanta",
    href: "https://github.com/himavanta",
  },
]
</script>

<template>
  <div class="text-center my-8">
    <h2 class="text-2xl font-bold mb-2">创作团队</h2>
    <p class="text-muted mb-6">热爱前端技术的创作者们</p>

    <section class="flex justify-center items-center flex-wrap gap-4">
      <span class="font-black text-2xl">频道主播:</span>

      <div class="flex items-center gap-2 flex-wrap" v-for="(creator, index) in creators" :key="index">
        <Creator :avatar="creator.avatar" :creator="creator.creator" :href="creator.href" />
        <Icon name="i-tabler-letter-x-small" size="40" v-if="index !== creators.length - 1" />
      </div>
    </section>
  </div>
</template>
