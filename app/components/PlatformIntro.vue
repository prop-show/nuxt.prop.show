<script lang="ts" setup>
const features = [
  {
    icon: "i-tabler-headphones",
    color: "blue",
    title: "音频播客",
    description: "通勤时间也能学习前端技术",
  },
  {
    icon: "i-tabler-video",
    color: "green",
    title: "视频教程",
    description: "可视化的编程实战演示",
  },
  {
    icon: "i-tabler-code",
    color: "purple",
    title: "技术分享",
    description: "前沿技术与最佳实践",
  },
  {
    icon: "i-tabler-users",
    color: "orange",
    title: "社区交流",
    description: "与开发者共同成长进步",
  },
]
</script>

<template>
  <section class="my-12">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold mb-2">为什么选择 prop.show</h2>
      <p class="text-muted max-w-2xl mx-auto">我们致力于打造最优质的前端学习平台，帮助开发者掌握核心技能</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="(feature, index) in features" :key="index">
        <div class="flex justify-center mb-4">
          <div class="p-3 rounded-full flex items-center bg-muted group-hover:scale-110 transition-transform">
            <Icon :name="feature.icon" size="24" :class="`text-${feature.color}-500`" />
          </div>
        </div>
        <h3 class="font-semibold mb-2">{{ feature.title }}</h3>
        <p class="text-sm text-muted">{{ feature.description }}</p>
      </UCard>
    </div>

    <div class="text-center mt-8">
      <p class="text-lg font-medium text-muted">
        🚀 现已覆盖 <span class="text-foreground font-bold">React</span>、
        <span class="text-foreground font-bold">Vue</span>、 <span class="text-foreground font-bold">Node.js</span>、
        <span class="text-foreground font-bold">TypeScript</span> 等热门技术栈
      </p>
    </div>
  </section>
</template>
