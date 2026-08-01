<script lang="ts" setup>
const route = useRoute()

const { data: pageData, pending } = useAsyncData(
    route.path,
    async () => {
        const [letter, news] = await Promise.all([
            queryCollection('news').path(route.path).first(),
            queryCollection('news').order('date', 'DESC').all(),
        ])

        const index = news.findIndex(item => item.path === route.path)

        return {
            letter,
            signalNumber: index >= 0 ? news.length - index : 0,
        }
    },
)

const letter = computed(() => pageData.value?.letter)
const signalNumber = computed(() => String(pageData.value?.signalNumber || 0).padStart(2, '0'))

const publishedAt = computed(() => {
    if (!letter.value?.date)
        return { date: '--', time: '--' }

    const value = new Date(letter.value.date.replace(' ', 'T'))

    return {
        date: new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(value),
        time: new Intl.DateTimeFormat('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(value),
    }
})

useSeoMeta({
    title: () => letter.value ? letter.value.title : '速报 - prop.show',
    description: () => letter.value ? letter.value.description : '第一时间获得前端库和工具的最新动态和更新消息。',
})
</script>

<template>
    <main>
        <div class="my-8 md:my-12">
            <NuxtLink to="/news" class="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <Icon name="i-tabler-arrow-left" class="size-4 transition-transform group-hover:-translate-x-1" />
                BACK TO SIGNAL ARCHIVE
            </NuxtLink>
        </div>

        <section v-if="pending" class="overflow-hidden border border-default">
            <div class="grid lg:grid-cols-[1fr_15rem]">
                <div class="space-y-6 p-6 sm:p-10 lg:p-12">
                    <USkeleton class="h-3 w-36" />
                    <USkeleton class="h-14 w-4/5" />
                    <USkeleton class="h-5 w-48" />
                </div>
                <USkeleton class="min-h-48 rounded-none lg:min-h-full" />
            </div>
        </section>

        <template v-else-if="letter">
            <header class="overflow-hidden border border-default bg-default/85 shadow-sm">
                <div class="grid lg:grid-cols-[1fr_15rem]">
                    <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                        <div class="signal-grid absolute inset-0 opacity-45" />

                        <div class="relative z-10 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            <span class="inline-flex items-center gap-2 text-primary">
                                <span class="size-2 rounded-full bg-primary" />
                                SIGNAL RECEIVED
                            </span>
                            <span>/</span>
                            <span>FRONTEND NEWS</span>
                        </div>

                        <h1 class="relative z-10 mt-7 max-w-4xl text-4xl leading-tight font-black tracking-[-0.045em] sm:text-6xl">
                            {{ letter.title }}
                        </h1>

                        <div class="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs font-bold text-muted">
                            <time :datetime="letter.date">{{ publishedAt.date }}</time>
                            <span class="hidden h-3 w-px bg-default sm:block" />
                            <span>{{ publishedAt.time }}</span>
                            <span class="hidden h-3 w-px bg-default sm:block" />
                            <span>PROP.SHOW NEWSWIRE</span>
                        </div>
                    </section>

                    <aside class="flex min-h-44 flex-col justify-between border-t border-default bg-primary p-6 text-black lg:min-h-full lg:border-t-0 lg:border-l">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">
                            ARCHIVE NUMBER
                        </div>
                        <div>
                            <div class="font-mono text-6xl font-black tracking-[-0.12em]">
                                {{ signalNumber }}
                            </div>
                            <div class="mt-2 font-mono text-xs font-bold tracking-[0.18em]">
                                SIG.{{ signalNumber }}
                            </div>
                        </div>
                    </aside>
                </div>
            </header>

            <div class="mx-auto my-12 grid max-w-5xl gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-start">
                <aside class="hidden border-t border-default pt-4 lg:block">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        TRANSMISSION
                    </div>
                    <div class="mt-3 flex items-center gap-2 text-sm font-bold">
                        <span class="size-2 rounded-full bg-green-500" />
                        已归档
                    </div>
                    <div class="mt-6 font-mono text-[10px] font-bold leading-5 tracking-[0.14em] text-dimmed">
                        READ<br>
                        VERIFY<br>
                        CONTINUE
                    </div>

                    <div class="mt-6 grid gap-4 text-sm">
                        <UButton
                            v-if="letter.source"
                            :to="letter.source"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="neutral"
                            variant="outline"
                            icon="i-tabler-external-link"
                        >
                            消息来源
                        </UButton>
                    </div>
                </aside>

                <!-- 只在移动端展示 -->
                <NewsSource :letter />

                <article class="border-y border-default py-7 sm:border sm:bg-default/55 sm:p-8 lg:p-10">
                    <div class="mb-6 border-b border-default pb-5">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                            NEWSLETTER CONTENT
                        </div>
                        <h2 class="mt-2 text-2xl font-black">
                            讯号内容
                        </h2>
                    </div>

                    <Content :value="letter" />
                </article>
            </div>

            <footer class="mb-20 flex flex-col justify-between gap-5 border-y border-default py-5 sm:flex-row sm:items-center">
                <div>
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        END OF TRANSMISSION
                    </div>
                    <p class="mt-1 text-sm font-bold">
                        讯号已归档，继续浏览其他前端动态。
                    </p>
                </div>
                <UButton to="/news" color="neutral" variant="outline" trailing-icon="i-tabler-arrow-right">
                    返回速报索引
                </UButton>
            </footer>
        </template>

        <UEmpty
            v-else
            icon="i-tabler-satellite-off"
            title="讯号不存在"
            description="这条速报可能已被移动或删除。"
        >
            <template #actions>
                <UButton to="/news">
                    返回速报
                </UButton>
            </template>
        </UEmpty>
    </main>
</template>

<style scoped>
.signal-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to right, black, transparent 92%);
}
</style>
