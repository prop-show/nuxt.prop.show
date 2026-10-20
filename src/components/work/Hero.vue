<template>
    <header class="my-8 overflow-hidden border border-default bg-default/85 shadow-sm md:my-12">
        <div class="grid lg:grid-cols-[1fr_19rem]">
            <section class="relative overflow-hidden p-6 sm:p-10 lg:p-12">
                <div class="grid-texture absolute inset-0 opacity-45" />

                <div class="relative z-10 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em] text-primary">
                    <span class="inline-flex size-2 rounded-full bg-primary" />
                    PROP.SHOW / TEAM WORKS
                </div>

                <h1 class="relative z-10 mt-8 max-w-3xl text-[2rem] leading-[1.2] font-black tracking-[-0.025em] sm:text-[2.5rem] lg:text-5xl">
                    团队作品，
                    <span class="mt-2 block text-primary">持续归档。</span>
                </h1>

                <p class="relative z-10 mt-7 max-w-2xl text-base leading-7 text-muted">
                    收录团队项目，记录目标、实现与成果。
                </p>
            </section>

            <aside class="grid grid-cols-2 border-t border-default bg-primary text-black lg:grid-cols-1 lg:border-t-0 lg:border-l">
                <div class="flex min-h-32 flex-col justify-between border-r border-black/15 p-5 lg:border-r-0 lg:border-b">
                    <span class="meta-label-on-primary">ARCHIVE SCOPE</span>
                    <strong class="text-lg leading-[1.4] font-bold lg:text-xl">网站、产品<br>与开源项目</strong>
                </div>

                <div class="flex min-h-32 flex-col justify-between p-5">
                    <span class="meta-label-on-primary">ARCHIVE STATUS</span>
                    <strong class="text-lg leading-[1.4] font-bold lg:text-xl">持续收录<br>定期更新</strong>
                </div>
            </aside>
        </div>
    </header>
</template>
