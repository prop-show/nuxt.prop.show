<script lang="ts" setup>
const { socials } = useAppConfig()
</script>

<template>
    <UAlert
        class="my-4 max-w-125 mx-auto"
        color="neutral"
        variant="subtle"
        title="点击链接收看最新节目"
        icon="i-tabler-pointer-filled"
    >
        <template #description>
            <section class="flex flex-wrap items-center gap-2 mt-2">
                <UButton
                    v-for="social in socials"
                    :key="social.platform"
                    color="neutral"
                    variant="outline"
                    :href="social.href"
                    :icon="social.icon"
                    target="_blank"
                >
                    {{ social.platform }}
                </UButton>
            </section>
        </template>
    </UAlert>
</template>
