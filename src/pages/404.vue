<template>
    <main class="my-12 border border-default bg-default/85 p-6 sm:my-20 sm:p-10 lg:p-14">
        <span class="inline-block bg-primary px-4 py-2 font-mono text-2xl font-bold text-black">404</span>
        <h1 class="mt-8 text-[2rem] leading-[1.2] font-black tracking-[-0.025em] sm:text-[2.5rem] lg:text-5xl">
            页面不存在
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-8 text-muted">
            页面可能已移动或删除，请从下方继续浏览。
        </p>
        <nav class="mt-10 flex flex-wrap gap-3" aria-label="继续浏览">
            <UiButton to="/" size="lg" class="text-black">
                返回首页
            </UiButton>
            <UiButton to="/videos" size="lg" variant="outline">
                浏览视频
            </UiButton>
            <UiButton to="/news" size="lg" variant="outline">
                阅读速报
            </UiButton>
        </nav>
    </main>
</template>
