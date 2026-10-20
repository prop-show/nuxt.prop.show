<script lang="ts" setup>
import IconArrowUpRight from '~icons/tabler/arrow-up-right'
import IconRadar2 from '~icons/tabler/radar-2'
import { siteConfig } from '@/site-config'

const { techLogos } = siteConfig
</script>

<template>
    <section class="my-20">
        <SectionHeading eyebrow="TOPICS" title="关注的技术">
            <span class="section-count">
                {{ String(techLogos.length).padStart(2, '0') }} TOPICS
            </span>
        </SectionHeading>

        <div class="grid overflow-hidden border border-default sm:grid-cols-2 lg:grid-cols-4">
            <SiteLink
                v-for="(tech, index) in techLogos"
                :key="tech.href"
                :to="tech.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex min-h-36 flex-col justify-between border-b border-default p-5 outline-none transition-colors hover:bg-elevated/70 focus-visible:bg-elevated/70 sm:border-r"
            >
                <div class="flex items-start justify-between">
                    <component
                        :is="tech.icon"
                        class="size-8 text-toned transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
                        aria-hidden="true"
                    />
                    <span class="font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>
                </div>

                <div class="flex items-end justify-between gap-3">
                    <div>
                        <div class="text-lg leading-[1.4] font-bold lg:text-xl">
                            {{ tech.title }}
                        </div>
                    </div>
                    <IconArrowUpRight
                        aria-hidden="true"
                        class="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                </div>
            </SiteLink>

            <div class="flex min-h-36 flex-col justify-between bg-primary p-5 text-black">
                <IconRadar2 aria-hidden="true" class="size-8" />
                <div>
                    <div class="text-lg leading-[1.4] font-bold lg:text-xl">
                        继续探索
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
