<script lang="ts" setup>
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import { siteConfig } from '@/site-config'

const { socials, navigationLinks, friendLinks } = siteConfig
const browseLinks = [
    ...navigationLinks.filter(link => link.to !== '/'),
    ...navigationLinks.some(link => link.to === '/works') ? [] : [{ label: '团队作品', to: '/works' }],
]
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="mt-20 border-t border-default pt-10 pb-6 sm:mt-24">
        <div class="grid gap-9 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
            <div>
                <SiteLink to="/" aria-label="Prop.show — 首页" class="inline-flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <img src="/prop-light-transparent.svg" alt="" width="32" height="32" class="dark:hidden">
                    <img src="/prop-dark-transparent.svg" alt="" width="32" height="32" class="hidden dark:block">
                    <span class="text-xl font-bold tracking-tight text-highlighted">prop.show</span>
                </SiteLink>
                <p class="mt-3 max-w-xs text-sm leading-7 text-muted">
                    把前端技术讲明白，记录实践经验。
                </p>
            </div>

            <nav aria-labelledby="footer-browse-heading">
                <h2 id="footer-browse-heading" class="mb-3 text-sm font-semibold">
                    继续浏览
                </h2>
                <ul class="grid grid-cols-2 gap-x-5 md:grid-cols-1">
                    <li v-for="link in browseLinks" :key="link.to">
                        <SiteLink :to="link.to" class="inline-flex min-h-11 items-center text-sm text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                            {{ link.label }}
                        </SiteLink>
                    </li>
                </ul>
            </nav>

            <nav aria-labelledby="footer-follow-heading">
                <h2 id="footer-follow-heading" class="mb-3 text-sm font-semibold">
                    关注与订阅
                </h2>
                <ul class="grid grid-cols-2 gap-x-5 md:grid-cols-1">
                    <li v-for="social in socials" :key="social.platform">
                        <SiteLink
                            :to="social.href"
                            :external="social.href === '/rss.xml'"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex min-h-11 items-center gap-2 text-sm text-muted outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <component :is="social.icon" class="size-4 shrink-0" aria-hidden="true" />
                            {{ social.platform }}
                            <IconArrowUpRight aria-hidden="true" class="size-3.5 shrink-0" />
                        </SiteLink>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="mt-10 space-y-3 text-[13px] leading-6 text-muted">
            <div class="flex flex-wrap items-center gap-x-6 gap-y-1">
                <span>© {{ currentYear }} prop.show</span>
                <SiteLink to="/design-assets" class="inline-flex min-h-11 items-center outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary">
                    设计资产
                </SiteLink>
            </div>
            <nav class="flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="友情链接">
                <span>友情链接</span>
                <SiteLink
                    v-for="link in friendLinks"
                    :key="link.label"
                    :to="link.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-11 items-center gap-1 outline-none transition-colors hover:text-highlighted focus-visible:ring-2 focus-visible:ring-primary"
                >
                    {{ link.label }}
                    <IconArrowUpRight aria-hidden="true" class="size-3.5" />
                </SiteLink>
            </nav>
        </div>
    </footer>
</template>
