<script setup lang="ts">
const props = defineProps<{
    page: number
    pageSize: number
    total: number
    basePath: string
}>()

function pageLink(page: number) {
    return page === 1
        ? props.basePath
        : { path: props.basePath, query: { page } }
}
</script>

<template>
    <div v-if="total > pageSize" class="mt-8 flex flex-col items-center justify-between gap-4 border-y border-default py-5 sm:flex-row">
        <div class="font-mono text-[10px] font-bold tracking-[0.18em] text-dimmed">
            PAGE {{ String(page).padStart(2, '0') }} / {{ String(Math.ceil(total / pageSize)).padStart(2, '0') }}
        </div>

        <UPagination
            :page
            :total
            :items-per-page="pageSize"
            :to="pageLink"
            color="neutral"
            active-color="primary"
            variant="ghost"
            active-variant="solid"
            show-edges
            :sibling-count="1"
            :ui="{
                root: 'gap-1',
                list: 'gap-1',
            }"
        />
    </div>
</template>
