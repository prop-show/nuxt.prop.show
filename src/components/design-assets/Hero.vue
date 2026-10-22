<template>
    <header class="my-8 md:my-12">
        <h1 class="text-3xl leading-[1.2] font-bold tracking-tight sm:text-4xl lg:text-5xl">
            设计资产
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-8 text-muted">
            下载 prop.show 标志，复制品牌色，了解使用规则。
        </p>
        <nav aria-label="设计资产目录" class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a v-for="item in [['logo-assets-heading', '下载标志'], ['brand-colors-heading', '品牌色'], ['usage-rules-heading', '使用规则']]" :key="item[0]" :href="`#${item[0]}`" class="inline-flex min-h-11 items-center outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">
                {{ item[1] }}
            </a>
        </nav>
    </header>
</template>
