<template>
  <section class="section" id="911356">
    <carousel
      ref="carousel"
      v-model="currentSlide"
      :items-to-show="1"
      :autoplay="
        $store.state.isMenuOpen || $store.state.isDiplomasOpen ? 0 : 5000
      "
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
          backgroundImage: `url(${images[isMobile ? `${slide.path}` : `${slide.path}_d`]})`,
        }"
      >
        <div class="carousel__info">
          <h1 class="carousel__title">{{ slide.title }}</h1>
          <p class="carousel__text">{{ slide.text }}</p>
          <button
            type="button"
            class="carousel__button"
            @click="handleClickOrder(slide.path)"
          >
            <span>Записаться</span
            ><img
              :src="doubleArrow"
              alt="иконка перейти записаться"
              class="carousel__nav-icon"
            />
          </button>
        </div>
      </slide>

      <template #addons>
        <button @click="prevSlide" class="carousel__nav prev">
          <img
            :src="arrowPrev"
            alt="иконка предыдущий слайдер"
            class="carousel__nav-icon"
          />
        </button>
        <button @click="nextSlide" class="carousel__nav next">
          <img
            :src="arrowNext"
            alt="иконка следующий слайдер"
            class="carousel__nav-icon"
          />
        </button>
        <div class="carousel__pagination">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            type="button"
            class="carousel__dot"
            :class="{ _active: currentSlide === index }"
            @click="handleClickPage(index)"
          ></button>
        </div>
      </template>
    </carousel>
  </section>
</template>

<script>
import { computed } from "vue";
import { mapMutations } from "vuex";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import images from "@/assets/images/mainCarousel/index";
import arrowPrev from "@/assets/images/icons/arrowPrev.svg";
import arrowNext from "@/assets/images/icons/arrowNext.svg";
import doubleArrow from "@/assets/images/icons/double-arrow.svg";

const isMobile = computed(() => {
  return screen.width <= 760;
});

export default {
  components: {
    Carousel,
    Slide,
  },
  setup() {
    return {
      arrowPrev,
      arrowNext,
      doubleArrow,
    };
  },
  data() {
    return {
      currentSlide: 0,
      images: images,
      isMobile: isMobile,
    };
  },
  props: {
    slides: {
      type: Array,
    },
  },
  methods: {
    ...mapMutations([
      "setCurrentMessageForOrder", // `this.setCurrentMessageForOrder(value)` будет вызывать `this.$store.commit('setCurrentMessageForOrder', value)`
    ]),
    handleClickPage(value) {
      this.currentSlide = value;
    },
    nextSlide() {
      this.currentSlide += 1;
    },
    prevSlide() {
      this.currentSlide -= 1;
    },
    handleClickOrder(value) {
      this.setCurrentMessageForOrder(value);
    },
  },
};
</script>

<style lang="sass" scoped>
@import ../sass/index
.section
    position: relative
    margin: 0 -min(50px, 3vw)
    padding: 0
.carousel
    &__slide
        position: relative
        height: calc(100vh - $header-height)
        width: 100%
        background-position: center
        background-size: cover
    &__image
        width: 100%
        height: 100%
    &__info
        position: absolute
        bottom: 33%
        left: 50%
        transform: translate(-50%, 100%)
        width: min(400px, 90vw)
        background: rgba($base-white-color, 0.6)
        padding: min(15px, 3vw)
        border-radius: 10px
        box-shadow: 2px 2px 4px rgba($base-black-color, 0.3)
        display: flex
        flex-direction: column
        gap: min(30px, 2vw)
        border: 1px solid rgba($base-white-color, 0.5)
        @media screen and (min-width: 1000px)
            position: relative
            top: 0
            left: 0
            transform: translate(0, 0)
            background: transparent
            width: 100vw
            height: 100vh
            box-shadow: none
            border-radius: 0
            border: none
            justify-content: center
            padding: 0 100px
            gap: min(110px, 10vw)
    &__title
        text-align: start
        font-family: 'Trebuchet'
        font-weight: 700
        font-size: min(34px, 6vw)
        color: $base-black-color
        text-shadow: 1px 1px 2px rgba($base-black-color, 0.1)
        margin: 0
        @media screen and (min-width: 1000px)
            font-size: min(120px, 9vw)
            color: rgba($base-white-color, 0.95)
            font-family: 'LobsterRegular'
            text-shadow: 2px 2px 7px rgba($base-black-color, 0.4)
    &__text
        font-family: 'Trebuchet'
        text-align: start
        font-size: min(18px, 4vw)
        color: $base-black-color
        // text-shadow: 1px 1px 2px rgba($base-black-color, 0.6)
        margin: 0
        @media screen and (min-width: 1000px)
            font-size: min(50px, 4vw)
            color: rgba($base-white-color, 1)
    &__button
        align-self: flex-end
        width: min(300px, 60%)
        height: min(60px, 12vw)
        border: none
        border-radius: min(12px, 2vw)
        background: #2c3e50
        background: -webkit-linear-gradient(to right, #3498db, #2c3e50)
        background: linear-gradient(to right, #3498db, #2c3e50)
        font-family: 'RobotoCondensed'
        font-weight: 400
        font-size: min(24px, 5vw)
        color: $base-white-color
        box-shadow: 2px 2px 4px rgba($base-black-color, 0.3)
        margin-top: 5vw
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        gap: 20px
        transition: $app-transition03
        &:hover
            gap: 30px
        @media screen and (min-width: 1000px)
            border: 0.5px solid rgba($base-white-color, 1)
    &__nav
        position: absolute
        top: 0
        width: min(60px, 10%)
        height: 100%
        padding: 0
        background: transparent
        border: none
        cursor: pointer
        opacity: 0.3
        transition: $app-transition03
        &:active
            outline: none !important
            border: none !important
            box-shadow: none !important
        &:focus
            outline: 0 !important
        &:-moz-focus-inner
            border: 0
        &:hover
            opacity: 1
        &.next
            right: 0
        &.prev
            left: 0
        &-icon
            width: min(40px, 6vw)
            height: min(40px, 6vw)
    &__pagination
        position: absolute
        display: flex
        gap: 10px
        bottom: 3vw
        right: 50%
        transform: translate(50%, 0)
        margin: 0
        padding: 0
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
