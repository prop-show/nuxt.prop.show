<script setup lang="ts">
import IconDownload from '~icons/tabler/download'
import { siteConfig } from '@/site-config'

const { designAssets } = siteConfig
</script>

<template>
    <section class="my-12 md:my-16" aria-labelledby="logo-assets-heading">
        <SectionHeading title="Logo 版本" title-id="logo-assets-heading" stack-at="md">
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                按背景选择版本。
            </p>
        </SectionHeading>

        <div class="grid gap-8 md:grid-cols-2">
            <article
                v-for="logo in designAssets.logos"
                :key="logo.key"
                class="min-w-0"
            >
                <div
                    class="flex min-h-56 items-center justify-center border border-default p-8 sm:min-h-64"
                    :style="{ backgroundColor: logo.surfaceColor }"
                >
                    <img
                        :src="logo.transparentAsset"
                        width="200"
                        height="200"
                        :alt="`prop.show ${logo.label} Logo`"
                        class="size-36 sm:size-40"
                    >
                </div>

                <div class="py-5">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h3 class="text-xl font-bold">
                                {{ logo.label }}
                            </h3>
                        </div>
                        <span class="text-sm text-dimmed">
                            200 × 200
                        </span>
                    </div>

                    <div class="mt-5 grid gap-3 sm:grid-cols-2">
                        <a
                            :href="logo.asset"
                            :download="logo.asset.slice(1)"
                            class="group flex min-h-12 items-center justify-between border border-default px-4 text-sm font-medium outline-none transition-colors hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            下载带底 SVG
                            <IconDownload aria-hidden="true" class="size-4 text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-primary" />
                        </a>
                        <a
                            :href="logo.transparentAsset"
                            :download="logo.transparentAsset.slice(1)"
                            class="group flex min-h-12 items-center justify-between border border-default px-4 text-sm font-medium outline-none transition-colors hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            下载透明 SVG
                            <IconDownload aria-hidden="true" class="size-4 text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-primary" />
                        </a>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
