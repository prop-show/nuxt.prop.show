<script setup lang="ts">
const { designAssets } = useAppConfig()
</script>

<template>
    <section class="my-20" aria-labelledby="logo-assets-heading">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 md:flex-row md:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    LOGO SYSTEM
                </div>
                <h2 id="logo-assets-heading" class="text-3xl font-black tracking-tight md:text-4xl">
                    Logo 版本
                </h2>
            </div>
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                标志的图形与比例保持不变，仅根据背景明度切换版本。
            </p>
        </div>

        <div class="grid border-y border-default lg:grid-cols-2">
            <article
                v-for="(logo, index) in designAssets.logos"
                :key="logo.key"
                class="border-b border-default last:border-b-0 lg:border-b-0 lg:odd:border-r"
            >
                <div
                    class="flex min-h-80 items-center justify-center border-b border-default p-10 sm:min-h-96"
                    :style="{ backgroundColor: logo.surfaceColor }"
                >
                    <img
                        :src="logo.transparentAsset"
                        width="200"
                        height="200"
                        :alt="`prop.show ${logo.label} Logo`"
                        class="size-44 sm:size-52"
                    >
                </div>

                <div class="p-6 sm:p-8">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                                {{ String(index + 1).padStart(2, '0') }} / {{ logo.channel }}
                            </div>
                            <h3 class="mt-2 text-xl font-black">
                                {{ logo.label }}
                            </h3>
                        </div>
                        <span class="font-mono text-[10px] font-bold tracking-[0.14em] text-dimmed">
                            200 × 200
                        </span>
                    </div>

                    <p class="mt-4 max-w-xl text-sm leading-7 text-muted">
                        {{ logo.description }}
                    </p>

                    <div class="mt-6 grid gap-2 sm:grid-cols-2">
                        <a
                            :href="logo.asset"
                            :download="logo.asset.slice(1)"
                            class="group flex min-h-11 items-center justify-between border border-default px-4 text-sm font-black outline-none transition-colors hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            下载带底 SVG
                            <Icon name="i-tabler-download" class="size-4 text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-primary" />
                        </a>
                        <a
                            :href="logo.transparentAsset"
                            :download="logo.transparentAsset.slice(1)"
                            class="group flex min-h-11 items-center justify-between border border-default px-4 text-sm font-black outline-none transition-colors hover:border-primary hover:bg-elevated/70 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            下载透明 SVG
                            <Icon name="i-tabler-download" class="size-4 text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-primary" />
                        </a>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
