<script lang="ts" setup>
const techLogos = [
  { icon: "i-tabler-brand-react", title: "React", href: "https://react.dev" },
  { icon: "i-tabler-brand-nextjs", title: "Next.js", href: "https://nextjs.org" },
  { icon: "i-tabler-brand-vue", title: "Vue.js", href: "https://vuejs.org/" },
  { icon: "i-tabler-brand-nuxt", title: "Nuxt.js", href: "https://nuxt.com/" },
  {
    icon: "i-tabler-brand-typescript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    icon: "i-tabler-brand-tailwind",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { icon: "i-tabler-brand-nodejs", title: "Nodejs", href: "https://nodejs.org/" },
]
</script>

<template>
  <section class="my-8">
    <ClientOnly>
      <Vue3Marquee pause-on-hover clone :duration="20">
        <NuxtLink
          v-for="tech in techLogos"
          :key="tech.href"
          :to="tech.href"
          target="_blank"
          class="size-18 inline-block hover:scale-110 transition-transform mx-6"
        >
          <Icon :name="tech.icon" size="60" />
        </NuxtLink>
      </Vue3Marquee>
    </ClientOnly>
  </section>
</template>
