<script lang="ts" setup>
const { stacks } = useAppConfig()
</script>

<template>
    <section class="mb-12 max-w-md mx-auto">
        <SectionTitle title="技术栈" />

        <UCard>
            <template #header>
                <div>
                    <h2>本站技术栈</h2>
                </div>
                <p>prop.show 使用的技术和工具</p>
                <div class="flex flex-wrap gap-2 my-4">
                    <UBadge v-for="stack in stacks" :key="stack.name" color="neutral" variant="outline" :label="stack.name" />
                </div>
            </template>
        </UCard>
    </section>
</template>
