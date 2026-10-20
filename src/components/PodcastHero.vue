<script lang="ts" setup>
import IconNews from '~icons/tabler/news'
import IconPlayerPlayFilled from '~icons/tabler/player-play-filled'

const props = defineProps<{
    videoCount: number
    newsCount: number
    creatorCount: number
}>()

const signals = computed(() => [
    {
        label: `${String(props.videoCount).padStart(2, '0')} EPISODES`,
        value: '视频节目',
    },
    {
        label: `${String(props.newsCount).padStart(2, '0')} REPORTS`,
        value: '前端速报',
    },
    {
        label: `${String(props.creatorCount).padStart(2, '0')} CREATORS`,
        value: '创作者',
    },
])
</script>

<template>
    <header class="hero-shell my-8 overflow-hidden border border-default/50 bg-default/85 md:my-12" role="banner">
        <div class="grid lg:grid-cols-[1.35fr_0.65fr]">
            <section class="relative flex min-h-125 flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-14">
                <div class="grid-texture absolute inset-0 opacity-50" />
                <div class="hero-orbit absolute -right-32 top-1/2 size-96 -translate-y-1/2 rounded-full border border-primary/30" />

                <div class="relative z-10">
                    <div class="mb-10 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em] text-muted">
                        <span class="inline-flex size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                        PROP.SHOW / VIDEOS & NEWS
                    </div>

                    <h1 class="max-w-4xl text-4xl leading-[1.15] font-black tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                        看前端视频，
                        <span class="mt-2 block text-primary ">读技术速报。</span>
                    </h1>

                    <p class="mt-8 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                        前端开发者共创，分享项目实践、实用工具与技术动态。
                    </p>

                    <div class="mt-10 flex flex-wrap gap-3">
                        <UiButton to="/videos" size="lg" class="text-black">
                            <IconPlayerPlayFilled aria-hidden="true" />
                            看视频
                        </UiButton>
                        <UiButton to="/news" size="lg" variant="outline">
                            <IconNews aria-hidden="true" />
                            读速报
                        </UiButton>
                    </div>
                </div>

                <div class="relative z-10 mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-default pt-5">
                    <div v-for="signal in signals" :key="signal.label" class="min-w-28">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            {{ signal.label }}
                        </div>
                        <div class="mt-1 text-sm font-bold">
                            {{ signal.value }}
                        </div>
                    </div>
                </div>
            </section>

            <aside class="relative flex min-h-100 items-center justify-center overflow-hidden border-t border-default bg-primary lg:min-h-full lg:border-t-0 lg:border-l">
                <div class="absolute inset-5 border border-black/15" />
                <div class="absolute top-8 right-8 font-mono text-xs font-bold tracking-[0.2em] text-black/70">
                    VIDEOS / REPORTS
                </div>

                <div class="hero-logo relative flex size-72 items-center justify-center rounded-full border border-black/20 sm:size-80">
                    <div class="absolute inset-5 rounded-full border border-dashed border-black/25" />
                    <img
                        src="/prop-light-transparent.svg" alt=""
                        width="230" height="230"
                        class="relative z-10"
                    >
                </div>

                <div class="absolute bottom-8 left-8 right-8 flex items-end justify-between font-mono text-black">
                    <span class="text-xs font-bold tracking-[0.2em]">MADE BY DEVELOPERS</span>
                    <span class="text-[2rem] font-bold tracking-tight">P.</span>
                </div>
            </aside>
        </div>
    </header>
</template>

<style scoped>
.hero-shell {
    border-radius: calc(var(--ui-radius) * 2);
}

.hero-orbit::before,
.hero-orbit::after {
    position: absolute;
    inset: 15%;
    content: '';
    border: 1px solid color-mix(in srgb, var(--ui-primary) 24%, transparent);
    border-radius: 9999px;
}

.hero-orbit::after {
    inset: 30%;
}

.hero-logo {
    animation: hero-float 7s ease-in-out infinite;
    will-change: transform;
    transform: translateZ(0);
}

@keyframes hero-float {
    0%,
    100% {
        transform: translateY(0) rotate(-2deg);
    }

    50% {
        transform: translateY(-10px) rotate(2deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-logo {
        animation: none;
    }
}
</style>
