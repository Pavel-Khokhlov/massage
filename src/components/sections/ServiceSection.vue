<template>
  <section class="section service" id="911400">
    <h2 class="section__title">Мои услуги</h2>
    <div class="service__list">
      <div
        v-for="service in $store.state.services"
        :key="service.id"
        class="service__block"
        :class="{ _active: service.isOpened }"
      >
        <button
          type="button"
          :id="service.id"
          :name="service.id"
          class="service__button"
          @click="isCurrentServiceShown(service.id)"
        >
          <h2 class="section__subtitle">{{ service.title }}</h2>
          <img
            src="@/assets/images/icons/chevron.svg"
            alt="иконка список"
            class="service__icon"
            :class="{ _active: service.isOpened }"
          />
        </button>
        <p class="section__text">{{ service.text_one }}</p>
        <img
          :src="`${images[`${service.image}`]}`"
          alt="изображение кинезио"
          class="service__image"
        />
        <h3 class="section__small-title">Показания:</h3>
        <ul class="service__list">
          <li v-for="item in service.indications" :key="item" class="service__list_item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import images from '@/assets/images/services/index'
import { useStore } from 'vuex'
const store = useStore()

const isCurrentServiceShown = (id) => store.commit('isCurrentServiceShown', id)
</script>

<style lang="sass">
@import @/sass/index
.service
    &__list
        display: flex
        flex-direction: column
        gap: min(30px, 6vw)
        &_item
            font-size: $text-section-text
            font-weight: 300
            line-height: 1.3
    &__block
        background: $base-white-color
        height: min(70px, 12vw)
        transition: $app-transition05
        border-radius: 10px
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1)
        overflow: hidden
        padding: 0 min(40px, 3vw)
        &._active
            height: auto
            transition: $app-transition05
            padding-bottom: min(30px, 5vw)
    &__button
        width: 100%
        height: min(70px, 12vw)
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        border: none
        background: transparent
        cursor: pointer
        padding: 0
    &__icon
        transition: $app-transition05
        &._active
            transform: rotate(180deg)
            transition: all 0.5s ease
    &__image
        display: block
        width: min(400px, 100%)
        margin: 0 auto
        border-radius: min(20px, 2vw)
    &__text
        font-size: $text-main-text
        line-height: 1.3
</style>
