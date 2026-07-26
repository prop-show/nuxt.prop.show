<script setup lang="ts">
const { designAssets } = useAppConfig()

const assetFacts = [
    { label: 'LOGO VERSIONS', value: String(designAssets.logos.length).padStart(2, '0') },
    { label: 'CORE COLORS', value: String(designAssets.colors.length).padStart(2, '0') },
    { label: 'FILE FORMAT', value: 'SVG' },
]
</script>

<template>
    <header class="my-8 overflow-hidden border border-default bg-default/85 shadow-sm md:my-12">
        <div class="grid lg:grid-cols-[1.28fr_0.72fr]">
            <section class="relative flex min-h-110 flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-14">
                <div class="asset-grid absolute inset-0 opacity-45" />

                <div class="relative z-10">
                    <p class="font-mono text-xs font-bold tracking-[0.22em] text-primary">
                        PROP.SHOW / DESIGN ASSETS
                    </p>
                    <h1 class="mt-6 max-w-3xl text-4xl leading-tight font-black tracking-[-0.055em] sm:text-6xl">
                        设计资产，
                        <span class="block text-primary">保持一致。</span>
                    </h1>
                    <p class="mt-7 max-w-2xl text-base leading-8 text-muted">
                        这里收录 prop.show 当前使用的 Logo、品牌主色与基础应用规则。请优先使用 SVG 文件，并根据背景选择对应版本。
                    </p>
                </div>

                <dl class="relative z-10 mt-12 grid gap-5 border-t border-default pt-5 sm:grid-cols-3">
                    <div v-for="fact in assetFacts" :key="fact.label">
                        <dt class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            {{ fact.label }}
                        </dt>
                        <dd class="mt-1 font-mono text-sm font-black">
                            {{ fact.value }}
                        </dd>
                    </div>
                </dl>
            </section>

            <aside class="relative flex min-h-72 items-center justify-center overflow-hidden bg-primary p-10 text-black lg:min-h-110">
                <div class="absolute -right-10 -bottom-20 font-mono text-[15rem] leading-none font-black tracking-[-0.16em] text-black/8">
                    P
                </div>
                <div class="relative z-10 flex flex-col items-center">
                    <img
                        src="/prop-light-transparent.svg"
                        width="200"
                        height="200"
                        alt="prop.show 黑色透明背景 Logo"
                        class="size-44 sm:size-52"
                    >
                    <div class="mt-7 font-mono text-xs font-black tracking-[0.22em]">
                        PROP.SHOW
                    </div>
                    <div class="mt-2 font-mono text-[10px] font-bold tracking-[0.18em] text-black/55">
                        VISUAL IDENTITY / SVG
                    </div>
                </div>
            </aside>
        </div>
    </header>
</template>

<style scoped>
.asset-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to right, black, transparent 92%);
}
</style>
