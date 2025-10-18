<script lang="ts" setup></script>

<template>
  <header class="my-10" role="banner">
    <div class="flex justify-center">
      <Icon name="prop:logo" :size="300" class="hover:animate-spin" />
    </div>
    <section class="text-center flex justify-center">
      <h1 class="sr-only">prop.show - 前端开发播客与教程</h1>
      <VueBitsBlurText
        text="为你传递前端开发的核心属性"
        :delay="150"
        animateBy="words"
        direction="top"
        class="font-bold mt-4 text-5xl text-center"
      />
    </section>
    <div class="sr-only">
      <p>prop.show 是专注于前端开发的播客与教程平台，提供 React、Vue、Node.js、TypeScript 等技术内容。</p>
    </div>
  </header>
</template>
