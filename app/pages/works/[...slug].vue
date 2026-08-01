<script setup lang="ts">
const route = useRoute()

const { data: pageData, pending, error } = useAsyncData(
    route.path,
    async () => {
        const work = await queryCollection('works').path(route.path).first()

        if (!work)
            return { work: null, creator: null }

        const creator = await queryCollection('creators')
            .where('stem', '=', `creators/${work.author}`)
            .first()

        return { work, creator }
    },
)

const work = computed(() => pageData.value?.work)
const creator = computed(() => pageData.value?.creator)

useSeoMeta({
    title: () => work.value ? `${work.value.title} - prop.show` : '团队作品 - prop.show',
    description: () => work.value?.description || '浏览 prop.show 团队成员完成的网站、产品、工具与开源项目。',
})
</script>

<template>
    <main>
        <div class="my-8 md:my-12">
            <NuxtLink to="/works" class="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.16em] text-muted transition-colors hover:text-highlighted">
                <Icon name="i-tabler-arrow-left" class="size-4 transition-transform group-hover:-translate-x-1" />
                BACK TO WORK ARCHIVE
            </NuxtLink>
        </div>

        <section v-if="pending" class="overflow-hidden border border-default">
            <div class="grid lg:grid-cols-[1fr_17rem]">
                <div class="space-y-6 p-6 sm:p-10 lg:p-12">
                    <USkeleton class="h-3 w-36" />
                    <USkeleton class="h-14 w-4/5" />
                    <USkeleton class="h-5 w-2/3" />
                </div>
                <USkeleton class="min-h-52 rounded-none lg:min-h-full" />
            </div>
        </section>

        <UAlert
            v-else-if="error"
            color="error"
            variant="subtle"
            icon="i-tabler-alert-triangle"
            title="作品资料加载失败"
            description="请稍后刷新页面重试。"
        />

        <template v-else-if="work">
            <header class="overflow-hidden border border-default bg-default/85 shadow-sm">
                <div class="grid lg:grid-cols-[1fr_17rem]">
                    <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                        <div class="work-detail-grid absolute inset-0 opacity-45" />

                        <div class="relative z-10 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            <span class="text-primary">TEAM WORK</span>
                            <span>/</span>
                            <span>{{ work.type }}</span>
                        </div>

                        <h1 class="relative z-10 mt-7 max-w-4xl text-4xl leading-tight font-black sm:text-6xl">
                            {{ work.title }}
                        </h1>

                        <p class="relative z-10 mt-6 max-w-3xl text-base leading-7 text-muted">
                            {{ work.description }}
                        </p>

                        <div class="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs font-bold text-muted">
                            <!-- <time :datetime="work.date">{{ formattedDate }}</time> -->
                            <span class="hidden h-3 w-px bg-default sm:block" />
                            <span>{{ work.type }}</span>
                        </div>
                    </section>

                    <aside class="flex min-h-48 flex-col justify-between border-t border-default bg-primary p-6 text-black lg:min-h-full lg:border-t-0 lg:border-l">
                        <span class="font-mono text-[10px] font-bold tracking-[0.2em] text-black/55">PROJECT TYPE</span>
                        <div>
                            <Icon name="i-tabler-box" class="mb-5 size-10" />
                            <strong class="block text-3xl leading-tight font-black">{{ work.type }}</strong>
                        </div>
                    </aside>
                </div>
            </header>

            <section class="mx-auto my-12 grid max-w-5xl gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
                <aside class="border-y border-default py-5 lg:sticky lg:top-6 lg:border lg:p-5">
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        CREATED BY
                    </div>

                    <NuxtLink
                        v-if="creator"
                        :to="creator.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group mt-4 flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary lg:items-start"
                    >
                        <img
                            width="48"
                            height="48"
                            :src="creator.avatar"
                            :alt="`${creator.name} avatar`"
                            class="size-12 shrink-0 rounded-sm object-cover"
                            decoding="async"
                        >
                        <div class="min-w-0">
                            <div class="flex items-center gap-1 font-black group-hover:text-primary">
                                {{ creator.name }}
                                <Icon name="i-tabler-arrow-up-right" class="size-4" />
                            </div>
                            <p class="mt-1 text-xs leading-5 text-muted">
                                {{ creator.role }}
                            </p>
                        </div>
                    </NuxtLink>

                    <div v-else class="mt-4 flex items-center gap-2 text-sm font-bold text-muted">
                        <Icon name="i-tabler-user-question" class="size-5" />
                        未知作者
                    </div>

                    <div v-if="work.website || work.repository" class="mt-6 grid gap-2">
                        <UButton
                            v-if="work.website"
                            :to="work.website"
                            target="_blank"
                            rel="noopener noreferrer"
                            icon="i-tabler-external-link"
                        >
                            在线查看
                        </UButton>
                        <UButton
                            v-if="work.repository"
                            :to="work.repository"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="neutral"
                            variant="outline"
                            icon="i-tabler-brand-github"
                        >
                            查看源码
                        </UButton>
                    </div>
                </aside>

                <div class="min-w-0 space-y-8">
                    <article class="border-y border-default py-7 sm:border sm:bg-default/55 sm:p-8 lg:p-10">
                        <div class="mb-6 border-b border-default pb-5">
                            <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                                PROJECT NOTES
                            </div>
                            <h2 class="mt-2 text-2xl font-black">
                                作品说明
                            </h2>
                        </div>

                        <Content :value="work" />
                    </article>

                    <section v-if="work.tags?.length" class="border-t border-default pt-5">
                        <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                            TECHNOLOGY / TOPICS
                        </div>
                        <div class="mt-4 flex flex-wrap gap-2">
                            <span
                                v-for="tag in work.tags"
                                :key="tag"
                                class="border border-default bg-default/55 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-toned"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </section>
                </div>
            </section>

            <footer class="mb-20 flex flex-col justify-between gap-5 border-y border-default py-5 sm:flex-row sm:items-center">
                <div>
                    <div class="font-mono text-[10px] font-bold tracking-[0.2em] text-dimmed">
                        END OF PROJECT FILE
                    </div>
                    <p class="mt-1 text-sm font-bold">
                        继续浏览团队归档中的其他作品。
                    </p>
                </div>
                <UButton to="/works" color="neutral" variant="outline" trailing-icon="i-tabler-arrow-right">
                    返回作品索引
                </UButton>
            </footer>
        </template>

        <UEmpty
            v-else
            icon="i-tabler-file-unknown"
            title="作品不存在"
            description="这份作品资料可能已被移动或删除。"
        >
            <template #actions>
                <UButton to="/works">
                    返回作品归档
                </UButton>
            </template>
        </UEmpty>
    </main>
</template>

<style scoped>
.work-detail-grid {
    background-image:
        linear-gradient(to right, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 65%, transparent) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to right, black, transparent 92%);
}
</style>
