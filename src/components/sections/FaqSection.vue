<template>
  <section class="section faq" id="911364">
    <h2 class="section__title">Вопрос - Ответ</h2>
    <ul class="faq__list">
      <li v-for="faq in faqs" :key="faq.id" class="faq__item">
        <p class="faq__text question">{{ faq.question }}</p>
        <p class="faq__text answer">{{ faq.answer }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import faqs from '@/data/dataFaqs.js'
</script>

<style lang="sass">
@import @/sass/index
.faq
  box-sizing: border-box
  margin: 0
  background-color: rgb(242, 242, 242)
  &__list
    width: min(1000px, 100%)
    margin: 0 auto
    list-style: none
    padding: 0 5px
    display: flex
    flex-direction: column
    gap: min(30px, 5vw)
    box-sizing: border-box
  &__item
    display: flex
    flex-direction: column
    gap: min(30px, 5vw)
  &__text
    font-weight: 400
    line-height: 1.3
    position: relative
    padding: 10px 15px
    &.question
      margin: 0 0 0 10px
      font-size: min(24px, 5vw)
      background-color: $base-brand-color
      color: white
      border-radius: 15px 15px 15px 0
      max-width: min(700px, 60vw)
      &::before
        content: ''
        position: absolute
        bottom: 0
        left: max(-20px, -3vw)
        width: min(20px, 3vw)
        height: min(20px, 3vw)
        background-color: $base-brand-color
      &::after
        content: ''
        position: absolute
        bottom: 0
        left: max(-20px, -3vw)
        width: min(20px, 3vw)
        height: 20px
        background-color: rgb(242, 242, 242)
        border-radius: 0 0 min(20px, 3vw) 0
        border: none
    &.answer
      font-weight: 300
      line-height: 1.5
      margin: 0 10px 0 0
      font-size: min(20px, 4vw)
      max-width: min(900px,80vw)
      background-color: rgba(white, 1)
      color: black
      border-radius: 15px 15px 0 15px
      align-self: flex-end
      &::before
        content: ''
        position: absolute
        bottom: 0
        right: max(-20px, -3vw)
        width: min(20px, 3vw)
        height: min(20px, 3vw)
        background-color: rgba(white, 1)
      &::after
        content: ''
        position: absolute
        bottom: 0
        right: max(-20px, -3vw)
        width: min(20px, 3vw)
        height: 20px
        background-color: rgb(242, 242, 242)
        border-radius: 0 0 0 min(20px, 3vw)
        border: none
</style>
