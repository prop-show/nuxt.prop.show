<script setup lang="ts">
import { useRouter } from '@void/vue'
import IconMenu2 from '~icons/tabler/menu-2'
import { siteConfig } from '@/site-config'

const { navigationLinks } = siteConfig
const router = useRouter()
const mobileMenuOpen = ref(false)

function isActive(to?: string) {
    if (!to)
        return false

    if (to === '/')
        return router.url.pathname === '/'

    return router.url.pathname.startsWith(to)
}
</script>

<template>
    <header class="relative z-40 border-b border-default">
        <div class="flex min-h-18 items-center gap-4">
            <SiteLink to="/" aria-label="Prop.show — 首页" class="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span class="flex size-9 items-center justify-center">
                    <img
                        src="/prop-light-transparent.svg" alt=""
                        width="34" height="34"
                        class="dark:hidden"
                    >
                    <img
                        src="/prop-dark-transparent.svg" alt=""
                        width="34" height="34"
                        class="hidden dark:block"
                    >
                </span>
                <span class="text-xl font-black tracking-tight text-highlighted">prop.show</span>
            </SiteLink>

            <div class="flex-1" />

            <nav class="hidden items-center gap-1 md:flex" aria-label="主要导航">
                <SiteLink
                    v-for="link in navigationLinks"
                    :key="link.label"
                    :to="link.to"
                    :aria-current="isActive(link.to) ? 'page' : undefined"
                    class="flex min-h-11 items-center px-3 text-sm font-medium outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary lg:px-4"
                    :class="isActive(link.to) ? 'font-bold text-highlighted underline decoration-primary decoration-2 underline-offset-8' : 'text-muted'"
                >
                    {{ link.label }}
                </SiteLink>
            </nav>

            <div class="flex items-center gap-2">
                <ColorModeButton
                    class="size-11 justify-center"
                />

                <UiSheet
                    v-model:open="mobileMenuOpen"
                >
                    <UiSheetTrigger as-child>
                        <UiButton
                            variant="ghost"
                            aria-label="打开导航菜单"
                            class="size-11 justify-center md:hidden"
                        >
                            <IconMenu2 aria-hidden="true" />
                        </UiButton>
                    </UiSheetTrigger>

                    <UiSheetContent side="top">
                        <UiSheetHeader>
                            <UiSheetTitle>站点导航</UiSheetTitle>
                            <UiSheetDescription>首页、视频、速报、作品与关于我们</UiSheetDescription>
                        </UiSheetHeader>

                        <div class="mx-auto w-full max-w-6xl px-4 pb-5 sm:px-6 lg:px-8">
                            <nav class="flex flex-col gap-1" aria-label="移动端导航">
                                <SiteLink
                                    v-for="link in navigationLinks"
                                    :key="link.label"
                                    :to="link.to"
                                    :aria-current="isActive(link.to) ? 'page' : undefined"
                                    class="flex min-h-12 items-center px-3 text-base outline-none transition-colors hover:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-primary"
                                    :class="isActive(link.to) ? 'font-bold text-primary' : 'text-highlighted'"
                                    @click="mobileMenuOpen = false"
                                >
                                    {{ link.label }}
                                </SiteLink>
                            </nav>
                        </div>
                    </UiSheetContent>
                </UiSheet>
            </div>
        </div>
    </header>
</template>
