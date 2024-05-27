<template>
  <nav class="nav" :class="[{ _active: props.isOpen }, props.location]">
    <ul class="nav__list" :class="props.location">
      <li v-for="link in menuLinks" :key="link.id">
        <a
          :href="typeof link.path === 'object' ? '#service' : `${link.path}`"
          class="nav__link"
          :class="props.location"
          @click="handleClickLink(link.id)"
          >{{ link.title }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import menuLinks from '@/data/menu.js'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: 'modal'
  }
})

const openCurrentService = (id) => store.commit('openCurrentService', id)
const toggleMenu = () => store.commit('toggleMenu')

function handleClickLink(id) {
  /* if (id !== "911400") {
    setTimeout(() => {
      this.$store.state.services = this.$store.state.services.map((s) => {
        return (s = { ...s, isOpened: false });
      });
    }, 800);
  } */
  openCurrentService(id)
  const headerHeight = document.getElementById('header').clientHeight
  let offset = 10
  const container = document.getElementById(id)
  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = container.getBoundingClientRect().top
  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - headerHeight - offset
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  props.location === 'modal' && toggleMenu()
  const body = document.querySelector('.body')
  body.style.overflow = 'auto'
}
</script>

<style lang="sass">
@import @/sass/index
.nav
  position: relative
  top: 20vw
  left: -100vw
  opacity: 0
  transition: $app-transition05
  &._active
    transition: $app-transition05
    transition-delay: 0.5s
    left: 5vw
    opacity: 1
  &.header
    padding: 0
    top: 0
    @media screen and (max-width: 768px)
      display: none
  &__list
    position: relative
    padding: 0
    list-style: none
    display: flex
    &.header
      flex-direction: row
      gap: min(30px, 3vw)
      padding: 0
    &.modal
      flex-direction: column
      gap: 6vw
  &__link
    font-family: 'RobotoCondensed'
    font-size: min(30px, 7vw)
    font-weight: 400
    text-decoration: none
    color: $base-black-color
    cursor: pointer
    padding: 20px
    &.header
      padding: 10px 0
      font-size: min(18px, 7vw)
  &__button
    font-family: 'RobotoCondensed'
    font-size: min(18px, 7vw)
    font-weight: 400
    padding: 0
    border: none
    background: transparent
    cursor: pointer
</style>
