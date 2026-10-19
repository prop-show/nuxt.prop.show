<template>
    <main class="my-12 border border-default bg-default/85 p-6 sm:my-20 sm:p-10 lg:p-14">
        <span class="inline-block bg-primary px-4 py-2 font-mono text-3xl font-black text-black">404</span>
        <h1 class="mt-8 text-4xl leading-tight font-black tracking-tight sm:text-6xl">
            页面不存在
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-8 text-muted">
            这个页面可能已被移动或删除。你可以返回首页，或继续浏览视频节目。
        </p>
        <nav class="mt-10 flex flex-wrap gap-3" aria-label="继续浏览">
            <UButton to="/" size="lg" class="text-black">
                返回首页
            </UButton>
            <UButton to="/videos" size="lg" color="neutral" variant="outline">
                浏览视频
            </UButton>
            <UButton to="/news" size="lg" color="neutral" variant="outline">
                阅读速报
            </UButton>
        </nav>
    </main>
</template>
