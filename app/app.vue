<template>
    <NuxtLoadingIndicator
        color="var(--ui-primary)"
        error-color="var(--ui-color-error-500)"
        :height="2"
    />

    <UApp>
        <NuxtLayout name="default">
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
