<script setup lang="ts">
import { resolveLink } from '@/navigation'

const props = defineProps<{
    page: number
    pageSize: number
    total: number
    basePath: string
    query?: Record<string, string>
}>()

function pageLink(page: number) {
    const query: Record<string, string | number> = { ...props.query }

    if (page > 1)
        query.page = page
    else
        delete query.page

    return resolveLink({ path: props.basePath, query })
}
</script>

<template>
    <div v-if="total > pageSize" class="mt-8 flex flex-col items-center justify-between gap-4 border-y border-default py-5 sm:flex-row">
        <div class="meta-label">
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
