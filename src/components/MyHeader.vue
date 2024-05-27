<script setup>
import ScrollIndicator from '@/components/ScrollIndicator.vue'
import MyNavigation from '@/components/MyNavigation.vue'
import MyBurger from '@/components/MyBurger.vue'
</script>

<template>
  <header class="header" id="header">
    <ScrollIndicator />
    <div class="header__wrapper">
      <h2 class="header__logo">П</h2>
      <MyNavigation :isOpen="true" location="header" />
      <MyBurger />
    </div>
  </header>
</template>

<style lang="sass">
@import ../sass/index
.header
  position: sticky
  top: 0
  padding: 0 min(150px, 4vw)
  z-index: 6
  background: $base-white-color
  box-sizing: border-box
  &__wrapper
    display: flex
    justify-content: space-between
    align-items: center
    height: $header-height
  &__logo
    font-family: 'PacificoRegular'
    font-weight: 700
    font-size: 25px
    margin: 0
    padding: 0
</style>
