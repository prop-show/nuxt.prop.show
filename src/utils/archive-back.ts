/**
 * 详情页的返回链接：优先回到来源归档（含筛选与页码），直接访问时退回归档首页。
 * 只在同源且路径恰好等于归档路径时采纳，避免从首页、外站或另一篇详情进来时跳错地方。
 */
export function useArchiveBack(fallback: string) {
    const to = ref(fallback)

    onMounted(() => {
        const referrer = document.referrer
        if (!referrer)
            return

        const url = new URL(referrer)
        if (url.origin === location.origin && url.pathname === fallback)
            to.value = `${url.pathname}${url.search}`
    })

    return to
}
