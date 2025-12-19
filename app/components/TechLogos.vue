<script lang="ts" setup>
const { techLogos } = useAppConfig()
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
