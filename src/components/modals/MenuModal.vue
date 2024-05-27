<template>
  <section class="menu-modal" :class="{ _active: props.isOpen }">
    <MyNavigation :isOpen="props.isOpen" location="modal" />
  </section>
</template>

<script setup>
import MyNavigation from '@/components/MyNavigation.vue'

const props = defineProps({
  isOpen: {
      type: Boolean,
      default: false,
    },
})
</script>

<style lang="sass">
@import ../../sass/index
.menu-modal
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $base-white-color
  opacity: 0
  pointer-events: none
  z-index: 5
  transition: $app-transition05
  transition-delay: 0.3s
  &._active
    transition: $app-transition05
    pointer-events: all
    opacity: 1
</style>
