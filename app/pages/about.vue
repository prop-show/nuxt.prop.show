<script lang="ts" setup>
useSeoMeta({
    title: '关于我们 - prop.show',
    description: '了解 prop.show 前端开发播客与教程平台，我们的使命、内容和创作团队。',
})

// defineOgImageComponent('NuxtSeo', {
//     headline: 'prop.show',
//     title: '关于我们 😜',
//     description: '了解 prop.show 前端开发播客与教程平台，我们的使命、内容和创作团队。',
//     theme: '#F0DB4F',
//     colorMode: 'dark',
// })
</script>

<template>
    <section>
        <AboutHero />

        <OurMission />

        <Modules />

        <Creators variant="directory" />

        <Stack />
    </section>
</template>
