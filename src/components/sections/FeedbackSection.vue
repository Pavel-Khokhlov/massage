<template>
  <section class="section feedbacks" id="911362">
    <h2 class="section__title feedbacks">Отзывы</h2>
    <p class="section__text feedbacks">
      Благодарю вас за оказанное мне доверие. Мне очень приятно получать от вас обратную связь.
      Благодарю от всей души! С&nbsp;уважением&nbsp;Павел.
    </p>
    <FeedbackCarousel :slides="feedbacks" />
  </section>
</template>

<script setup>
import feedbacks from '@/data/dataFeedbacks.js'
import FeedbackCarousel from '@/components/FeedbackCarousel.vue'
</script>

<style lang="sass"></style>
