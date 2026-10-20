<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { cn } from "cn"
import { Primitive } from "reka-ui"
import SiteLink from "@/components/SiteLink.vue"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  /** Renders the button as a SiteLink (client-side navigation) instead of a plain <button>. */
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <SiteLink
    v-if="to"
    :to="to"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </SiteLink>
  <Primitive
    v-else
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
