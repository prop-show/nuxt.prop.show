<script setup lang="ts">
import IconPlayerPlayFilled from '~icons/tabler/player-play-filled'

defineProps<{ count: number }>()
</script>

<template>
    <header class="my-8 md:my-12">
        <h1 class="max-w-3xl text-3xl leading-[1.3] font-bold tracking-tight sm:text-4xl lg:text-5xl">
            乙巳：从零构建完整产品
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-8 text-muted">
            通过一个项目，学习工程配置、NestJS API、数据库、Vue 前端、JWT 登录与 Redis 缓存。
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-5">
            <UiButton v-if="count" to="/videos/ys-00-starter" size="lg" class="min-h-12">
                <IconPlayerPlayFilled aria-hidden="true" />
                从前言开始学习
            </UiButton>
            <span class="text-sm text-muted">共 {{ count }} 集 · 按目录顺序学习</span>
            <a href="#curriculum" class="inline-flex min-h-11 items-center text-sm outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">浏览课程目录 ↓</a>
        </div>
    </header>
</template>
