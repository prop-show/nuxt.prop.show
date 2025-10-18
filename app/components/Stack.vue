<script lang="ts" setup>
const stacks = [
  { name: "Nuxt.js" },
  { name: "Vue" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "Nuxt UI" },
  { name: "Vue Bits" },
  { name: "Vercel" },
]
</script>

<template>
  <section class="mb-12 max-w-md mx-auto">
    <SectionTitle title="技术栈" />

    <UCard>
      <template #header>
        <div>
          <h2>本站技术栈</h2>
        </div>
        <p>prop.show 使用的技术和工具</p>
        <div class="flex flex-wrap gap-2 my-4">
          <UBadge v-for="stack in stacks" :key="stack.name" color="neutral" variant="outline" :label="stack.name" />
        </div>
      </template>
    </UCard>
  </section>
</template>
