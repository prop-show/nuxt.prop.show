<script setup lang="ts">
import { PaginationEllipsis, PaginationList, PaginationRoot } from 'reka-ui'
import IconChevronLeft from '~icons/tabler/chevron-left'
import IconChevronRight from '~icons/tabler/chevron-right'
import IconDots from '~icons/tabler/dots'
import { buttonVariants } from '@/components/ui/button'
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

        <PaginationRoot :page="page" :total="total" :items-per-page="pageSize" :sibling-count="1" show-edges aria-label="内容分页">
            <PaginationList v-slot="{ items }" class="flex flex-wrap items-center justify-center gap-1">
                <SiteLink v-if="page > 1" :to="pageLink(page - 1)" :class="buttonVariants({ variant: 'ghost', size: 'icon' })" aria-label="上一页" rel="prev">
                    <IconChevronLeft aria-hidden="true" class="size-4" />
                </SiteLink>
                <template v-for="(item, index) in items" :key="index">
                    <SiteLink
                        v-if="item.type === 'page'"
                        :to="pageLink(item.value)"
                        :class="buttonVariants({ variant: item.value === page ? 'default' : 'ghost', size: 'icon' })"
                        :aria-label="`第 ${item.value} 页`"
                        :aria-current="item.value === page ? 'page' : undefined"
                    >
                        {{ item.value }}
                    </SiteLink>
                    <PaginationEllipsis v-else :index="index" class="flex size-9 items-center justify-center" aria-label="更多页码">
                        <IconDots aria-hidden="true" class="size-4" />
                    </PaginationEllipsis>
                </template>
                <SiteLink v-if="page < Math.ceil(total / pageSize)" :to="pageLink(page + 1)" :class="buttonVariants({ variant: 'ghost', size: 'icon' })" aria-label="下一页" rel="next">
                    <IconChevronRight aria-hidden="true" class="size-4" />
                </SiteLink>
            </PaginationList>
        </PaginationRoot>
    </div>
</template>
