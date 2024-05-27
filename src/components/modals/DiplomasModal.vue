<template>
  <section class="diplomas-modal" :class="{ _active: props.isOpen }" :on:click="closeDiplomas">
    <!-- <my-navigation :isOpen="isOpen"/> -->
    <button class="diplomas-modal__close" :on:click="closeDiplomas">
      <img :src="close" alt="кнопка закрыть модалку" class="diplomas-modal__close-icon" />
    </button>
    <img
      alt="изображение сертификат"
      class="diplomas-modal__image"
      :src="`${images[`${$store.state.currentDiploma}`]}`"
      @click.stop=""
    />
    <!-- <div class="carousel">
      <carousel
        ref="carousel"
        v-model="currentSlide"
        :items-to-show="itemsToShow"
        :autoplay="0"
        :wrap-around="true"
        :transition="500"
        :pauseAutoplayOnHover="true"
        :currentSlide="currentSlide"
      >
        <slide
          v-for="slide in slides"
          :key="slide.id"
          class="carousel__slide"
          :style="{
            backgroundImage: `url(${images[`${slide.img}`]})`,
          }"
        >
        </slide>
      </carousel>
    </div> -->
  </section>
</template>

<script setup>
import close from '@/assets/images/icons/close.svg'
import images from '@/assets/images/diplomasCarousel/index'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const closeDiplomas = () => store.commit('closeDiplomas')
</script>

<style lang="sass" scoped>
@import ../../sass/index
.diplomas-modal
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: rgba($base-black-color, 0.8)
  opacity: 0
  pointer-events: none
  z-index: 10
  transition: $app-transition05
  transition-delay: 0.3s
  &._active
    transition: $app-transition05
    pointer-events: all
    opacity: 1
  &__close
    background: transparent
    border: none
    margin-bottom: min(30px, 6vw)
    cursor: pointer
    &-icon
      width: min(30px, 6vw)
      height: min(30px, 6vw)
  &__image
    max-width: 90vw
    max-height: 90vh
    border-radius: min(15px, 2vw)
.carousel
  position: relative
  width: 90vw
  height: 300px
  background: white
  &__slide
    width: 80%
    height: 200px
    background: grey
</style>
