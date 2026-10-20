<script lang="ts" setup>
import IconArrowRight from '~icons/tabler/arrow-right'
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import { siteConfig } from '@/site-config'

const { socials, navigationLinks, friendLinks } = siteConfig

const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="mt-24 border-t border-default">
        <div class="grid lg:grid-cols-[1fr_18rem]">
            <section class="grid gap-10 border-b border-default py-10 lg:grid-cols-[1fr_auto] lg:border-r lg:px-0 lg:pr-10">
                <div>
                    <div class="flex items-center gap-3">
                        <span class="flex size-11 items-center justify-center border border-default">
                            <img
                                src="/prop-light-transparent.svg" alt=""
                                width="36" height="36"
                                class="dark:hidden"
                            >
                            <img
                                src="/prop-dark-transparent.svg" alt=""
                                width="36" height="36"
                                class="hidden dark:block"
                            >
                        </span>
                        <div>
                            <div class="font-mono text-sm font-black tracking-[0.08em]">
                                PROP.SHOW
                            </div>
                            <div class="mt-1 flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.16em] text-dimmed">
                                <span class="size-1.5 rounded-full bg-primary" />
                                END OF TRANSMISSION
                            </div>
                        </div>
                    </div>

                    <h2 class="mt-8 max-w-xl text-2xl leading-[1.35] font-bold tracking-[-0.02em] lg:text-[1.75rem]">
                        把前端技术讲明白，
                        <span class="block text-primary ">记录实践经验。</span>
                    </h2>
                    <p class="mt-5 max-w-xl text-sm leading-7 text-muted">
                        订阅更新，或关注我们。
                    </p>
                </div>

                <div>
                    <div class="mb-3 font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        FOLLOW US
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <SiteLink
                            v-for="social in socials"
                            :key="social.platform"
                            :to="social.href"
                            :external="social.href === '/rss.xml'"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group flex size-11 items-center justify-center border border-default text-muted outline-none transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-elevated/70 hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary"
                            :title="social.platform"
                        >
                            <component :is="social.icon" class="size-5" aria-hidden="true" />
                        </SiteLink>
                    </div>
                </div>
            </section>

            <aside class="relative flex min-h-48 flex-col justify-between overflow-hidden border-b border-default bg-primary p-6 text-black">
                <div class="absolute -right-8 -bottom-16 font-mono text-[10rem] leading-none font-black tracking-[-0.16em] text-black/8">
                    P
                </div>
                <div class="relative z-10 meta-label-on-primary">
                    PROP.SHOW
                </div>
                <div class="relative z-10">
                    <div class="flex items-center gap-2 text-lg font-black">
                        <span class="size-2 rounded-full bg-black" />
                        前端开发者共创
                    </div>
                    <div class="mt-2 font-mono text-[10px] font-bold tracking-[0.16em] text-black/70">
                        VIDEOS / NEWS
                    </div>
                </div>
            </aside>
        </div>

        <nav class="grid border-b border-default sm:grid-cols-2 lg:grid-cols-3" aria-label="页脚导航">
            <SiteLink
                v-for="(link, index) in navigationLinks"
                :key="link.label"
                :to="link.to"
                class="group flex min-h-20 items-center justify-between border-b border-default px-5 outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:bg-elevated/55 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
                <div class="flex items-center gap-4">
                    <span class="font-mono text-[10px] font-bold tracking-[0.14em] text-dimmed">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <span class="font-black">{{ link.label }}</span>
                </div>
                <IconArrowRight aria-hidden="true" class="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </SiteLink>
        </nav>

        <div class="flex flex-col gap-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono font-bold tracking-[0.08em]">
                <span>© {{ currentYear }} PROP.SHOW</span>
                <SiteLink
                    to="/design-assets"
                    class="text-[10px] tracking-[0.12em] text-dimmed outline-none transition-colors hover:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                >
                    设计资产
                </SiteLink>
                <SiteLink
                    to="/works"
                    class="text-[10px] tracking-[0.12em] text-dimmed outline-none transition-colors hover:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                >
                    团队作品
                </SiteLink>
            </div>

            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span class="font-mono text-[9px] font-bold tracking-[0.18em] text-dimmed">
                    FRIENDS
                </span>
                <SiteLink
                    v-for="link in friendLinks"
                    :key="link.label"
                    :to="link.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-1.5 font-bold transition-colors hover:text-highlighted"
                >
                    {{ link.label }}
                    <IconArrowUpRight aria-hidden="true" class="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </SiteLink>
            </div>
        </div>
    </footer>
</template>
