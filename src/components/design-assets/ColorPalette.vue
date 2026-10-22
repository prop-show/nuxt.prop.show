<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import IconCheck from '~icons/tabler/check'
import IconCopy from '~icons/tabler/copy'

import { siteConfig } from '@/site-config'

const { designAssets } = siteConfig

const copiedColor = shallowRef<string | null>(null)
const copyStatus = shallowRef('')
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyColor(hex: string) {
    if (typeof navigator === 'undefined')
        return

    try {
        await navigator.clipboard.writeText(hex)
        copiedColor.value = hex
        copyStatus.value = `已复制 ${hex}`
    }
    catch {
        copiedColor.value = null
        copyStatus.value = `无法自动复制，请手动复制 ${hex}`
    }

    if (resetTimer)
        clearTimeout(resetTimer)

    resetTimer = setTimeout(() => {
        copiedColor.value = null
        copyStatus.value = ''
    }, 2400)
}

onBeforeUnmount(() => {
    if (resetTimer)
        clearTimeout(resetTimer)
})
</script>

<template>
    <section class="my-12 md:my-16" aria-labelledby="brand-colors-heading">
        <SectionHeading title="品牌主色" title-id="brand-colors-heading" stack-at="md">
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                黄色用于强调，黑白构成基础表面。点击复制 HEX 色值。
            </p>
        </SectionHeading>

        <div class="border-y border-default">
            <button
                v-for="color in designAssets.colors"
                :key="color.hex"
                type="button"
                class="group grid w-full border-b border-default text-left outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:grid-cols-[6rem_minmax(0,1fr)_auto]"
                :aria-label="`复制 ${color.name} 色值 ${color.hex}`"
                @click="copyColor(color.hex)"
            >
                <span
                    class="flex min-h-20 items-end p-5 text-sm font-medium sm:min-h-32"
                    :style="{ backgroundColor: color.hex, color: color.textColor }"
                />

                <span class="flex flex-col justify-center px-5 py-5">
                    <span class="text-xl font-bold">{{ color.name }}</span>
                    <span class="mt-2 text-sm leading-6 text-muted">{{ color.description }}</span>
                    <span class="mt-5 text-sm tabular-nums text-dimmed">
                        RGB {{ color.rgb }}
                    </span>
                </span>

                <span class="flex items-center justify-between gap-6 border-t border-default px-5 py-4 text-sm font-medium tabular-nums sm:border-t-0 sm:px-5">
                    {{ color.hex }}
                    <component
                        :is="copiedColor === color.hex ? IconCheck : IconCopy"
                        class="size-5 text-muted transition-colors group-hover:text-primary"
                        :class="{ 'text-primary': copiedColor === color.hex }"
                        aria-hidden="true"
                    />
                </span>
            </button>
        </div>

        <p class="mt-3 min-h-6 text-sm text-muted" aria-live="polite">
            {{ copyStatus }}
        </p>
    </section>
</template>
