<template>
  <button
    class="burger"
    :class="{ _active: $store.state.isMenuOpen }"
    :on:click="toggleMenu"
  ></button>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()

const toggleMenu = () => store.commit('toggleMenu')
</script>

<style lang="sass">
@import ../sass/index
.burger
    display: block
    position: relative
    width: 30px
    height: 15px
    border: none
    background: transparent
    cursor: pointer
    z-index: 10
    @media screen and (min-width: 768px)
        display: none
    &::before
        content: ""
        width: 100%
        position: absolute
        top: 0
        left: 0
        height: 1px
        background: rgb(52, 34, 34)
        transition: $app-transition05
    &._active::before
        top: 7px
        transform: rotate(-45deg)
    &::after
        content: ""
        width: 100%
        position: absolute
        bottom: 0
        right: 0
        height: 1px
        background: rgb(52, 34, 34)
        transition: $app-transition05
    &._active::after
        bottom: 7px
        transform: rotate(45deg)
</style>
