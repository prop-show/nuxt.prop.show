<script lang="ts" setup>
const { creators } = useAppConfig()
</script>

<template>
    <div class="text-center my-8">
        <h2 class="text-2xl font-bold mb-2">
            创作团队
        </h2>
        <p class="text-muted mb-6">
            热爱前端技术的创作者们
        </p>

        <section class="flex justify-center items-center flex-wrap gap-4">
            <!-- <span class="font-black text-2xl">频道主播:</span> -->

            <div v-for="(creator, index) in creators" :key="index" class="flex items-center gap-2 flex-wrap">
                <Creator :avatar="creator.avatar" :creator="creator.creator" :href="creator.href" />
                <Icon v-if="index !== creators.length - 1" name="i-tabler-letter-x-small" size="40" />
            </div>
        </section>
    </div>
</template>
