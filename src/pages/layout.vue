<script setup lang="ts">
import { useNavigation, useRouter } from '@void/vue'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import '@/assets/css/main.css'

const navigation = useNavigation()
const router = useRouter()
const showLoading = ref(false)
let loadingTimer: ReturnType<typeof setTimeout> | undefined
const isLoading = computed(() => navigation.state === 'loading')
const targetPath = computed(() => navigation.location?.pathname ?? router.url.pathname)
const changingPage = computed(() => targetPath.value !== router.url.pathname)

watch(isLoading, (loading) => {
    clearTimeout(loadingTimer)
    showLoading.value = false
    if (loading)
        loadingTimer = setTimeout(() => { showLoading.value = true }, 120)
}, { immediate: true })
onBeforeUnmount(() => clearTimeout(loadingTimer))
</script>

<template>
    <div class="mx-auto min-h-svh w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <TheHeader />
        <p class="sr-only" role="status" aria-live="polite">
            {{ showLoading ? '正在加载页面' : '' }}
        </p>
        <div v-if="showLoading" class="fixed inset-x-0 top-0 z-50 h-1 bg-primary" aria-hidden="true" />
        <div :aria-busy="isLoading" class="relative">
            <PageLoadingSkeleton v-if="showLoading && changingPage" :path="targetPath" />
            <Transition name="content-ready">
                <div v-show="!(showLoading && changingPage)">
                    <slot />
                </div>
            </Transition>
        </div>
        <TheFooter />
    </div>
</template>
