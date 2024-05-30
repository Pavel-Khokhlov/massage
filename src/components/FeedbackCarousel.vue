<template>
  <section class="carousel">
    <carousel
      ref="carousel"
      v-model="currentSlide"
      :items-to-show="items"
      :autoplay="$store.state.isMenuOpen || $store.state.isDiplomasOpen ? 0 : 5000"
      :wrap-around="true"
      :transition="600"
      :pauseAutoplayOnHover="true"
      :currentSlide="currentSlide"
    >
      <slide v-for="slide in props.slides" :key="slide.id + 20">
        <div class="carousel__stack">
          <img alt="avatar" class="carousel__avatar" :src="`${images[`${slide.avatar}`]}`" />
          <h3 class="carousel__title">{{ slide.name }}</h3>
          <p class="carousel__text">{{ slide.feedback }}</p>
          <p class="carousel__contact">{{ slide.contact }}</p>
        </div>
      </slide>

      <template #addons>
        <button @click="currentSlide--" class="carousel__button prev" />
        <button @click="currentSlide++" class="carousel__button next" />
        <div class="carousel__pagination">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            type="button"
            class="carousel__dot"
            :class="{ _active: currentSlide === index }"
            @click="() => (currentSlide = index)"
          ></button>
        </div>
      </template>
    </carousel>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import images from '../assets/images/feedbackCarousel/index'

const currentSlide = ref(0)

const items = ref(1.1)

const props = defineProps({
  slides: {
    type: Array
  }
})

const handleResize = () => {
  let bodyWidth = Math.max(
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  )
  if (bodyWidth <= 768) return (items.value = 1.15)
  if (bodyWidth > 768 && bodyWidth <= 1200) return (items.value = 1.25)
  if (bodyWidth > 1200) return (items.value = 1.3)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default {
  components: {
    Carousel,
    Slide
  }
}
</script>

<style lang="sass" scoped>
@import ../sass/index
.carousel
    position: relative
    &__slide
        position: relative
        min-height: 20vw
        width: 100%
    &__stack
        height: 100%
        padding: min(30px, 5vw)
        margin: 0 min(100px, 2vw)
        width: calc(100% - 20px)
        background: rgba($base-white-color, 0.192)
        backdrop-filter: blur(10px)
        border-radius: 15px
        border: 1px solid rgba($base-white-color, 0.25)
        box-shadow: 2px 2px 11px rgba($base-black-color, 0.4)
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: min(25px, 4vw)
    &__top
        display: flex
        align-items: center
    &__avatar
        width: 100px
        height: 100px
        border-radius: 50px
    &__title
        font-weight: 400
        line-height: 1.3
        text-align: start
        font-size: min(26px, 6vw)
        color: $base-white-color
        // text-shadow: 1px 1px 2px rgba($base-black-color, 0.6)
        margin: 0
    &__text
        font-weight: 300
        line-height: 1.3
        text-align: start
        font-size: min(18px, 4vw)
        color: $base-white-color
        // text-shadow: 1px 1px 2px rgba($base-black-color, 0.6)
        margin: 0
    &__contact
        text-align: end
        font-size: min(18px, 4vw)
        color: $base-white-color
        // text-shadow: 1px 1px 2px rgba($base-black-color, 0.6)
        margin: auto 0 0
        align-self: flex-end
    &__button
        position: absolute
        top: 0
        width: 7%
        height: 100%
        background: transparent
        border: none
        cursor: pointer
        &.next
            right: 0
        &.prev
            left: 0
    &__pagination
        display: flex
        gap: 10px
        padding: 0
        margin-top: min(50px, 5vw)
    &__dot
        border: none
        background: rgba($base-white-color, 0.3)
        width: 8px
        height: 8px
        border-radius: 4px
        padding: 0
        transition: $app-transition03
        &._active
            transition: $app-transition03
            background: rgba($base-white-color, 1)
</style>
