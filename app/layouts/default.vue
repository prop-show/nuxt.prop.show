<template>
    <main class="container mx-auto px-4 md:px-8 lg:px-0">
        <div class="fixed -z-1 inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] bg-size-[16px_16px]" />

        <TheHeader />

        <slot />

        <TheFooter />
    </main>
</template>
