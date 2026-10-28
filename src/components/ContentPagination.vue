<script setup lang="ts">
import IconChevronLeft from '~icons/tabler/chevron-left'
import IconChevronRight from '~icons/tabler/chevron-right'
import IconChevronsLeft from '~icons/tabler/chevrons-left'
import IconChevronsRight from '~icons/tabler/chevrons-right'
import IconDots from '~icons/tabler/dots'
import SiteLink from '@/components/SiteLink.vue'
import { buttonVariants } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
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
    <div v-if="total > pageSize" class="flex flex-col items-center justify-between gap-4 border-b border-default py-5 sm:flex-row">
        <div class="text-sm tabular-nums text-muted">
            第 {{ page }} / {{ Math.ceil(total / pageSize) }} 页
        </div>

        <Pagination class="mx-0 w-auto" :page="page" :total="total" :items-per-page="pageSize" :sibling-count="1" show-edges aria-label="内容分页">
            <PaginationContent v-slot="{ items }" class="flex flex-wrap items-center justify-center gap-1">
                <PaginationFirst as-child size="icon" class="hidden size-11 px-0 sm:inline-flex sm:pr-0" aria-label="首页">
                    <component
                        :is="page === 1 ? 'button' : SiteLink"
                        preserve-scroll
                        :to="page === 1 ? undefined : pageLink(1)"
                        :disabled="page === 1"
                        :aria-disabled="page === 1 || undefined"
                    >
                        <IconChevronsLeft aria-hidden="true" class="size-4" />
                    </component>
                </PaginationFirst>
                <PaginationPrevious as-child size="icon" class="size-11 px-0 sm:pr-0" aria-label="上一页">
                    <component
                        :is="page === 1 ? 'button' : SiteLink"
                        preserve-scroll
                        :to="page === 1 ? undefined : pageLink(page - 1)"
                        :disabled="page === 1"
                        :aria-disabled="page === 1 || undefined" rel="prev"
                    >
                        <IconChevronLeft aria-hidden="true" class="size-4" />
                    </component>
                </PaginationPrevious>
                <template v-for="(item, index) in items" :key="index">
                    <PaginationItem
                        v-if="item.type === 'page'"
                        as-child
                        :value="item.value"
                        :class="item.value === page ? `${buttonVariants({ variant: 'default', size: 'icon' })} size-11` : 'inline-flex size-11 items-center justify-center'"
                        :aria-label="`第 ${item.value} 页`"
                    >
                        <SiteLink :to="pageLink(item.value)" preserve-scroll>
                            {{ item.value }}
                        </SiteLink>
                    </PaginationItem>
                    <PaginationEllipsis v-else :index="index" class="hidden size-11 items-center justify-center sm:flex" aria-label="更多页码">
                        <IconDots aria-hidden="true" class="size-4" />
                    </PaginationEllipsis>
                </template>
                <PaginationNext as-child size="icon" class="size-11 px-0 sm:pr-0" aria-label="下一页">
                    <component
                        :is="page === Math.ceil(total / pageSize) ? 'button' : SiteLink"
                        preserve-scroll
                        :to="page === Math.ceil(total / pageSize) ? undefined : pageLink(page + 1)"
                        :disabled="page === Math.ceil(total / pageSize)"
                        :aria-disabled="page === Math.ceil(total / pageSize) || undefined" rel="next"
                    >
                        <IconChevronRight aria-hidden="true" class="size-4" />
                    </component>
                </PaginationNext>
                <PaginationLast as-child size="icon" class="hidden size-11 px-0 sm:inline-flex sm:pr-0" aria-label="末页">
                    <component
                        :is="page === Math.ceil(total / pageSize) ? 'button' : SiteLink"
                        preserve-scroll
                        :to="page === Math.ceil(total / pageSize) ? undefined : pageLink(Math.ceil(total / pageSize))"
                        :disabled="page === Math.ceil(total / pageSize)"
                        :aria-disabled="page === Math.ceil(total / pageSize) || undefined"
                    >
                        <IconChevronsRight aria-hidden="true" class="size-4" />
                    </component>
                </PaginationLast>
            </PaginationContent>
        </Pagination>
    </div>
</template>
