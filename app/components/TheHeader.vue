<script setup lang="ts">
const { navigationLinks } = useAppConfig()
const route = useRoute()
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)

function isActive(to?: string) {
    if (!to)
        return false

    if (to === '/')
        return route.path === '/'

    return route.path.startsWith(to)
}
</script>

<template>
    <header class="relative z-40 border-b border-default">
        <div class="flex min-h-18 items-center gap-4">
            <NuxtLink to="/" class="group flex shrink-0 items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span class="flex size-10 items-center justify-center border border-default bg-default transition-colors group-hover:border-primary">
                    <Icon
                        :name="colorMode.value === 'light' ? 'prop:prop-light-transparent' : 'prop:prop-dark-transparent'"
                        :size="34"
                    />
                </span>
                <div>
                    <div class="font-mono text-sm font-black tracking-[0.08em]">
                        PROP.SHOW
                    </div>
                    <div class="mt-0.5 flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.16em] text-dimmed">
                        <span class="size-1.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                        ON AIR
                    </div>
                </div>
            </NuxtLink>

            <div class="flex-1" />

            <nav class="hidden items-stretch self-stretch md:flex" aria-label="主要导航">
                <NuxtLink
                    v-for="(link, index) in navigationLinks"
                    :key="link.label"
                    :to="link.to"
                    class="group relative flex min-w-20 items-center justify-center gap-2 px-3 font-bold outline-none transition-colors hover:bg-elevated/55 focus-visible:bg-elevated/55 lg:min-w-24 lg:px-4"
                    :class="isActive(link.to) ? 'text-highlighted' : 'text-muted'"
                >
                    <span class="font-mono text-[9px] font-bold tracking-[0.12em] text-dimmed">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <span class="text-sm">{{ link.label }}</span>
                    <span
                        class="absolute inset-x-3 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300"
                        :class="isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
                    />
                </NuxtLink>
            </nav>

            <div class="flex items-center gap-2">
                <UColorModeButton
                    color="neutral"
                    variant="ghost"
                    class="size-10 justify-center rounded-none border border-default hover:border-primary"
                />

                <UDrawer v-model:open="mobileMenuOpen" title="站点导航" description="浏览 prop.show 的节目、速报与团队档案" direction="top" inset>
                    <UButton
                        color="neutral"
                        variant="ghost"
                        icon="i-tabler-menu-2"
                        aria-label="打开导航菜单"
                        class="size-10 justify-center rounded-none border border-default hover:border-primary md:hidden"
                    />

                    <template #body>
                        <div class="mx-auto w-full max-w-6xl px-4 pb-5">
                            <div class="mb-5 flex items-center justify-between border-b border-default pb-4">
                                <div>
                                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                        PROP.SHOW / NAVIGATION
                                    </div>
                                    <div class="mt-1 text-xl font-black">
                                        选择频道
                                    </div>
                                </div>
                                <span class="font-mono text-xs font-bold text-dimmed">ON AIR</span>
                            </div>

                            <nav class="grid sm:grid-cols-2" aria-label="移动端导航">
                                <NuxtLink
                                    v-for="(link, index) in navigationLinks"
                                    :key="link.label"
                                    :to="link.to"
                                    class="group flex items-center justify-between border-b border-default p-4 outline-none transition-colors hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:odd:border-r"
                                    @click="mobileMenuOpen = false"
                                >
                                    <div class="flex items-center gap-4">
                                        <span class="font-mono text-xs font-bold text-dimmed">
                                            {{ String(index + 1).padStart(2, '0') }}
                                        </span>
                                        <span class="text-lg font-black" :class="{ 'text-primary': isActive(link.to) }">
                                            {{ link.label }}
                                        </span>
                                    </div>
                                    <Icon name="i-tabler-arrow-right" class="size-5 text-muted transition-transform group-hover:translate-x-1" />
                                </NuxtLink>
                            </nav>
                        </div>
                    </template>
                </UDrawer>
            </div>
        </div>
    </header>
</template>
