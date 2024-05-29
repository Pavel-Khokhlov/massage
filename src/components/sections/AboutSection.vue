<template>
  <section class="section about" id="911361">
    <h2 class="section__title">Обо мне</h2>
    <!-- <diplomas-carousel :slides="diplomas" /> -->
    <div class="about__top">
      <img
        src="@/assets/images/backgrounds/portrait.webp"
        atr="фотография портрет"
        class="about__portrait"
      />
      <p class="about__me">
        Меня зовут Павел, профессионально занимаюсь массажем с 2016 года. Массаж
        для меня в первую очередь это здоровье, красота и отличное настроение.
        Все эти годы изучал и практиковал различные техники массажа и
        остановился на самых эффективных. Для быстрой коррекции тела конечно же
        самый лучший инструмент это "Правило". Он помогает в максимально
        короткий срок привести наш организм в симметрию и укрепить физическое
        состояние наших мышц. Работает как в глубоких слоях наших мышц, так и
        отлично справляется с проблемами суставов и сухожилий. Конечно же сейчас
        трудно представить массаж без миофасциальных техник. Фасции - как мягкий
        скелет нашего организма. Они должны быть эластичными и способными
        пропускать свободно наш лимфоток. На своих процедурах активно использую
        техники вибрационно-звукового массажа, который в максимально короткий
        срок запустить кровоток и лимфоток в вашем теле и подготовить организм к
        более глубоким нагрузкам. Не могу сейчас представить свою жизнь без
        гвоздестояния. Гвозди "Садху" помогают расслабить эмоциональное и
        психическое состояние, что особенно важно при больших стрессовых
        нагрузках, которые мы испытываем в современном мире. Но самый важный
        момент, это же конечно обратная связь от моих любимых клиентов.
        Некоторые из них уже со мной на протяжении нескольких лет и это для меня
        самый важный момент в работе, значит они в меня верят и ценят мой труд.
      </p>
    </div>
    <h2 class="section__subtitle">Опыт работы:</h2>
    <ul class="about__jobs">
      <li v-for="job in jobs" :key="job.id" class="about__job">
        <p class="about__job-time">{{ job.time }}</p>
        <p class="about__job-place">{{ job.place }}</p>
      </li>
    </ul>
    <div class="about__certificates">
      <button
        v-for="thumb in diplomas"
        :key="thumb.id"
        class="about__button"
        :style="{
          backgroundImage: `url(${images[`${thumb.img}`]})`,
        }"
        :on:click="() => isDiplomaShown(thumb.img)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import diplomas from "@/data/dataDiplomas.js";
import jobs from "@/data/dataJobs.js";
import images from "@/assets/images/diplomasCarousel/thumb/index";
import { useStore } from 'vuex'
const store = useStore()

const isDiplomaShown = (value) => store.commit('isDiplomaShown', value)
</script>

<style lang="sass">
@import @/sass/index
.about
  &__top
    display: grid
    grid-template-columns: 1fr 2fr
    gap: min(30px, 6vw)
    margin-bottom: min(100px, 10vw)
    @media screen and (max-width: 768px)
      display: flex
      flex-direction: column
  &__portrait
    width: min(300px, 80%)
  &__me
    width: 100%
    font-size: $text-section-text
    line-height: 1.3
    font-weight: 300
    margin: 0
  &__jobs
    padding: 0
    margin: min(40px, 8vw) 0
    list-style: none
    display: grid
    grid-template-columns: 1fr 1fr
    gap: min(30px, 8vw)
    @media screen and (max-width: 768px)
      grid-template-columns: 1fr
  &__job
    border-radius: 10px
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1)
    padding: min(20px, 3vw)
    &-time
      font-size: $text-section-text-big
      margin: 0 0 12px
    &-place
      font-size: $text-section-text
      margin: 0
  &__certificates
    display: flex
    justify-content: center
    gap: min(50px, 5vw)
    overflow-x: auto
    scroll-behavior: smooth
    width: 100%
    box-sizing: border-box
    padding: min(10px, 2vw)
    -ms-overflow-style: none
    scrollbar-width: none
    &::-webkit-scrollbar
      display: none
    @media screen and (max-width: 768px)
      justify-content: flex-start
      width: 100vw
      margin: 0 min(-20px, -5vw)
  &__button
    border: none
    background: transparent
    width: min(120px, 16vw)
    height: min(120px, 16vw)
    border-radius: min(20px, 2vw)
    background-position: center
    background-size: cover
    padding: 0
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3)
    cursor: pointer
    flex-shrink: 0
    transition: all 0.5s ease
    &:hover
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.35)
</style>
