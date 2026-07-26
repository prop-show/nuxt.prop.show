<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'

const { designAssets } = useAppConfig()

const copiedColor = shallowRef<string | null>(null)
const copyStatus = shallowRef('')
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyColor(hex: string) {
    if (!import.meta.client)
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
    <section class="my-20" aria-labelledby="brand-colors-heading">
        <div class="mb-8 flex flex-col justify-between gap-4 border-b border-default pb-5 md:flex-row md:items-end">
            <div>
                <div class="mb-2 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    CORE PALETTE
                </div>
                <h2 id="brand-colors-heading" class="text-3xl font-black tracking-tight md:text-4xl">
                    品牌主色
                </h2>
            </div>
            <p class="max-w-md text-sm leading-6 text-muted md:text-right">
                黄色是唯一品牌强调色，黑与白用于建立清晰的内容层级。点击色值即可复制。
            </p>
        </div>

        <div class="border-y border-default">
            <button
                v-for="color in designAssets.colors"
                :key="color.hex"
                type="button"
                class="group grid w-full border-b border-default text-left outline-none transition-colors last:border-b-0 hover:bg-elevated/55 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset md:grid-cols-[13rem_1fr_auto]"
                :aria-label="`复制 ${color.name} 色值 ${color.hex}`"
                @click="copyColor(color.hex)"
            >
                <span
                    class="flex min-h-36 items-end p-5 font-mono text-[10px] font-black tracking-[0.18em] md:min-h-40"
                    :style="{ backgroundColor: color.hex, color: color.textColor }"
                >
                    {{ color.channel }}
                </span>

                <span class="flex flex-col justify-center px-5 py-6 md:px-8">
                    <span class="text-xl font-black">{{ color.name }}</span>
                    <span class="mt-2 text-sm leading-6 text-muted">{{ color.description }}</span>
                    <span class="mt-5 font-mono text-[10px] font-bold tracking-[0.16em] text-dimmed">
                        RGB {{ color.rgb }}
                    </span>
                </span>

                <span class="flex items-center justify-between gap-6 border-t border-default px-5 py-4 font-mono text-sm font-black md:border-t-0 md:px-8">
                    {{ color.hex }}
                    <Icon
                        :name="copiedColor === color.hex ? 'i-tabler-check' : 'i-tabler-copy'"
                        class="size-5 text-muted transition-colors group-hover:text-primary"
                        :class="{ 'text-primary': copiedColor === color.hex }"
                    />
                </span>
            </button>
        </div>

        <p class="sr-only" aria-live="polite">
            {{ copyStatus }}
        </p>
    </section>
</template>
