<script lang="ts" setup>
const upcomingFeatures = [
  {
    title: "交互式代码练习",
    description: "在线编码环境，边学边练",
    status: "开发中",
    icon: "i-tabler-rocket",
  },
  {
    title: "技术问答社区",
    description: "开发者互助交流平台",
    status: "设计中",
    icon: "i-tabler-calendar",
  },
  {
    title: "专属学习路径",
    description: "个性化前端学习规划",
    status: "规划中",
    icon: "i-tabler-star",
  },
]
</script>

<template>
  <section class="my-12">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold mb-2">即将推出</h2>
      <p class="text-muted">更多精彩功能正在路上</p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <UCard v-for="(feature, index) in upcomingFeatures" :key="index">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon :name="feature.icon" class="w-5 h-5" />
              <h3 class="text-lg">{{ feature.title }}</h3>
            </div>
            <UBadge variant="outline" class="text-xs">
              {{ feature.status }}
            </UBadge>
          </div>
          <p class="text-xs text-muted">{{ feature.description }}</p>
        </template>
      </UCard>
    </div>

    <div class="text-center mt-6">
      <p class="text-sm text-muted">
        💡 有建议或想法？欢迎通过
        <a href="https://github.com/prop-show" class="text-blue-500 hover:underline mx-1"> GitHub </a>
        与我们交流
      </p>
    </div>
  </section>
</template>
