/**
 * 归档页分页：解析 `?page`、夹取到有效范围，并在越界时用 replace 修正 URL。
 * 供 /videos、/works 这类"取全量 → 前端筛选 → 分页"的列表页使用。
 */
export function useArchivePagination<T>(filtered: Ref<T[]>) {
    const route = useRoute()
    const { paginationPageSize: pageSize } = useAppConfig()

    const requestedPage = computed(() => {
        const page = Number.parseInt(String(route.query.page || '1'), 10)

        return Math.max(Number.isNaN(page) ? 1 : page, 1)
    })

    const currentPage = computed(() => Math.min(
        requestedPage.value,
        Math.max(1, Math.ceil(filtered.value.length / pageSize)),
    ))

    const paginated = computed(() => filtered.value.slice(
        (currentPage.value - 1) * pageSize,
        currentPage.value * pageSize,
    ))

    watch(
        [requestedPage, currentPage],
        async ([requested, page]) => {
            if (page === requested)
                return

            const query = { ...route.query }

            if (page === 1)
                delete query.page
            else
                query.page = String(page)

            await navigateTo({ path: route.path, query }, { replace: true })
        },
        { immediate: true },
    )

    return { currentPage, pageSize, paginated }
}
