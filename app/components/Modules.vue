<script lang="ts" setup></script>

<template>
  <section class="my-12">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold mb-2">内容板块</h2>
      <p class="text-muted">专注前端技术，分享实用经验</p>
    </div>

    <div class="grid gap-6 grid-cols-1 md:grid-cols-3">
      <UCard class="group hover:shadow-lg transition-shadow">
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-tabler-building-broadcast-tower-filled" class="w-5 h-5 text-blue-500" />
            <CardTitle>基石 Prop</CardTitle>
          </div>
          <p class="text-xs text-muted">本频道核心内容</p>
        </template>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            项目实战教程
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            编程经验分享
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            技术深度解析
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            最佳实践指南
          </li>
        </ul>
      </UCard>

      <UCard class="group hover:shadow-lg transition-shadow">
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-tabler-tools" class="w-5 h-5 text-green-500" />
            <CardTitle>酷炫 Prop</CardTitle>
          </div>
          <p class="text-xs text-muted">工具与插件分享</p>
        </template>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            VS Code 插件推荐
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            实用开发工具
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            开源项目介绍
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            效率提升技巧
          </li>
        </ul>
      </UCard>

      <UCard class="group hover:shadow-lg transition-shadow">
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-tabler-message" class="w-5 h-5 text-purple-500" />
            <CardTitle>闲聊 Prop</CardTitle>
          </div>
          <p class="text-xs text-muted">轻松话题分享</p>
        </template>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            程序员日常生活
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            技术圈趣事分享
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            开发者访谈
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            行业观察思考
          </li>
        </ul>
      </UCard>
    </div>
  </section>
</template>
