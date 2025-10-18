<script lang="ts" setup>
const navigationLinks = [
  { name: "首页", href: "/" },
  { name: "关于我们", href: "/about" },
  { name: "视频", href: "/videos" },
]

const socials: { href: string; platform: string; icon: string }[] = [
  { href: "https://github.com/prop-show", platform: "GitHub", icon: "i-tabler-brand-github" },
  { href: "https://space.bilibili.com/104376935", platform: "哔哩哔哩", icon: "i-tabler-brand-bilibili" },
  { href: "https://www.youtube.com/@PropShowFM", platform: "YouTube", icon: "i-tabler-brand-youtube" },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 bg-muted/20">
    <USeparator />
    <div class="container mx-auto px-4 py-12">
      <!-- {/* 主要内容区域 */} -->
      <div class="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
        <!-- {/* 品牌区域 */} -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-4">
            <Icon name="prop:logo" size="60" />
            <div class="ml-3">
              <div class="font-black text-2xl">prop.show</div>
              <p class="text-muted text-sm mt-1">为你传递前端开发的核心属性</p>
            </div>
          </div>
          <p class="text-muted text-sm mb-4 max-w-md">
            专注于前端开发的播客与教程平台，提供高质量的技术内容分享。 涵盖 React、Vue、Node.js、TypeScript
            等热门技术栈。
          </p>

          <!-- {/* 社交媒体链接 */} -->
          <div class="flex gap-3">
            <NuxtLink
              v-for="(social, index) in socials"
              :key="social.platform"
              :to="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors"
              :title="social.platform"
            >
              <Icon :name="social.icon" size="18" />
            </NuxtLink>
          </div>
        </div>

        <!-- {/* 快速导航 */} -->
        <div>
          <h3 class="font-semibold mb-4">快速导航</h3>
          <ul class="space-y-2">
            <li v-for="link in navigationLinks" :key="link.name">
              <NuxtLink :to="link.href" class="text-muted hover:text-foreground transition-colors text-sm">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- {/* 分割线 */} -->
      <USeparator class="mt-2" />
      <div class="mt-4 pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- {/* 版权信息 */} -->
          <div class="text-sm text-muted">© {{ currentYear }} prop.show. All rights reserved.</div>

          <!-- {/* 友情链接/政策 */} -->
          <div class="flex items-center gap-4 text-sm text-muted">
            <div class="flex items-center gap-1">
              <span>Made with</span>
              <Icon name="i-tabler-heart-filled" class="w-4 h-4 text-red-500 fill-current" />
              <span>by prop.show team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
