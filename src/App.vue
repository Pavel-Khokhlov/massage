<script setup>
import slides from '@/data/mainCarousel.js'
import MyHeader from '@/components/MyHeader.vue'
import MainCarousel from '@/components/MainCarousel.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServiceSection from '@/components/sections/ServiceSection.vue'
import FeedbackSection from '@/components/sections/FeedbackSection.vue'
import FormSection from '@/components/sections/FormSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import MyFooter from '@/components/MyFooter.vue'
import MenuModal from '@/components/modals/MenuModal.vue'
import DiplomasModal from '@/components/modals/DiplomasModal.vue'
</script>

<template>
  <MyHeader />
  <MainCarousel :slides="slides" />
  <AboutSection />
  <ServiceSection />
  <FeedbackSection />
  <FormSection />
  <FaqSection />
  <MyFooter />
  <MenuModal :isOpen="$store.state.isMenuOpen" />
  <DiplomasModal :isOpen="$store.state.isDiplomasOpen" />
</template>

<style lang="sass">
a:active,
a:focus,
input,
input:active,
input:focus
    outline: 0
    outline-style: none
    outline-width: 0
a:active,
a:focus,
button::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
input[type="file"] > input[type="button"]::-moz-focus-inner
    border: none
.section
  margin-bottom: min(50px, 10vw)
  padding: min(50px, 5vw) min(200px, 5vw)
  &.about
    width: min(1000px, 100%)
    margin: 0 auto
    padding-top: 0
    padding-bottom: min(100px, 10vw)
  &.service
    // background: rgb(242, 242, 242)
    width: min(1000px, 100%)
    margin: 0 auto
    padding-top: 0
    padding-bottom: min(100px, 10vw)
    box-sizing: border-box
  &.feedbacks
    background: url('./assets/images/backgrounds/feedbacksV.webp')
    background-position: center
    background-size: cover
    background-repeat: no-repeat
    padding: min(50px, 5vw) 0
    @media screen and (min-width: 768px)
      background: url('./assets/images/backgrounds/feedbacksH.webp')
      background-repeat: no-repeat
      background-position: center
      background-size: cover
  &__title
    margin: 0 auto
    font-size: min(40px, 6vw)
    line-height: 1.3
    font-family: 'RobotoCondensed'
    font-weight: 500
    margin-bottom: min(50px, 10vw)
    &.feedbacks
      padding-left: min(50px, 5vw)
      color: white
      margin-bottom: 0
      @media screen and (min-width: 768px)
        padding-left: 0
    @media screen and (min-width: 768px)
      text-align: center
  &__subtitle
    font-size: min(28px, 5.5vw)
    line-height: 1.3
    font-weight: 500
  &__text
    font-size: min(20px, 4.5vw)
    line-height: 1.3
    padding: min(40px, 5vw) 0
    margin: 0
    &.feedbacks
      font-family: 'RobotoCondensed'
      font-weight: 400
      color: white
      width: min(600px, 90vw)
      margin: 0 auto
</style>
