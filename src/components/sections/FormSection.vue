<template>
  <section class="section service" id="911363">
    <h2 class="section__title">Контакты</h2>
    <p class="form__label form__label_radio">Выберите предпочитаемый вид связи:</p>
    <div class="form__radiobuttons">
      <div v-for="c in communications" :key="c">
        <button
          :id="c"
          :name="c"
          class="form__button_radio"
          :class="{ _active: c === $store.state.formState.contactType }"
          :style="{
            backgroundImage: `url(${images[`${c}`]})`
          }"
          @click="handleChangeCommunication($event)"
        ></button>
      </div>
    </div>
    <form class="form" action="" @submit.prevent="onSubmit" @input="formUpdated" autocomplete="off">
      <div class="form__field">
        <label for="name" class="form__label">Имя</label>
        <input
          type="text"
          id="name"
          :value="$store.state.formState.name"
          placeholder="Ваше имя"
          class="form__input"
          autocomplete="off"
          @input="handleChange($event)"
        />
        <p class="form__error">{{ $store.state.formError.name }}</p>
      </div>
      <div class="form__field">
        <label for="contact" class="form__label">{{
          ENUM_COMMUNICATION[$store.state.formState.contactType]
        }}</label>
        <input
          type="text"
          id="contact"
          :value="$store.state.formState.contact"
          placeholder="Ваш контакт"
          class="form__input"
          @input="handleChange($event)"
        />
        <p class="form__error">{{ $store.state.formError.contact }}</p>
      </div>
      <div class="form__field">
        <label for="message" class="form__label">Сообщение, отзыв</label>
        <textarea
          type="text"
          id="message"
          :value="$store.state.formState.message"
          placeholder="Отправьте мне сообщение"
          class="form__input form__input_textarea"
          rows="5"
          cols="30"
          @input="handleChange($event)"
        ></textarea>
        <p class="form__error">{{ $store.state.formError.message }}</p>
      </div>
      <div class="form__control">
        <button
          type="button"
          class="form__button form__button_clear"
          :class="{ _disabled: isFormClear }"
          :disabled="isFormClear"
          @click="handleClearForm"
        >
          Очистить
        </button>
        <button
          type="button"
          class="form__button form__button_submit"
          :class="{ _active: isFormCompleted }"
          :disabled="!isFormCompleted"
          @click="submitForm"
        >
          Отправить
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '@/api'
import images from '@/assets/images/icons/index'

const COMMUNICATION = {
  phone: 'Телефон',
  telegram: 'Имя пользователя Telegram',
  whatsapp: 'Телефон WhatsApp',
  email: 'Электронный адрес'
}

export default {
  data() {
    return {
      ENUM_COMMUNICATION: COMMUNICATION,
      communications: ['phone', 'telegram', 'whatsapp', 'email'],
      isFormCompleted: false,
      isFormClear: true,
      images: images
    }
  },
  methods: {
    ...mapMutations([
      'resetForm', // `this.resetForm()` будет вызывать `this.$store.commit('resetForm')`
      'changeCommunication', // `this.changeCommunication(amount)` будет вызывать `this.$store.commit('changeCommunication', amount)`
      'handleFormChange' // `this.handleFormChange(amount)` будет вызывать `this.$store.commit('handleFormChange', amount)`
    ]),
    handleChange(event) {
      this.handleFormChange(event)
    },
    handleChangeCommunication(event) {
      this.changeCommunication(event.target)
    },
    handleClearForm() {
      this.resetForm()
      this.isFormCompleted = false
      this.isFormClear = true
    },
    async submitForm() {
      let message = `Request: Pravilo / Massage%0AName: ${this.$store.state.formState.name}%0ACommunication: ${this.$store.state.formState.contactType}%0AContact: ${this.$store.state.formState.contact}%0AMessage: ${this.$store.state.formState.message}`
      try {
        await api.post(
          `/sendMessage?chat_id=${import.meta.env.VITE_TELEGRAM_CHAT_ID}&text=${message}`
        )
        this.handleClearForm()
      } catch (e) {
        console.error(e)
      }
    },
    formUpdated() {
      this.isFormClear = false
      // проверка на заполенение каждого поля формы
      for (let key in this.$store.state.formState) {
        if (this.$store.state.formState[key] == null || this.$store.state.formState[key] == '')
          return (this.isFormCompleted = false)
      }
      return (this.isFormCompleted = true)
    }
  }
}
</script>

<style lang="sass">
.form
    margin-top: min(30px, 5vw)
    display: flex
    flex-direction: column
    gap: min(25px, 5vw)
    &__radiobuttons
        display: flex
        flex-direction: row
        align-items: center
        gap: min(20px, 5vw)
    &__radiobutton
        display: none
        &_label
            text-transform: capitalize
            color: blue
            &._active
                color: red
    &__field
        display: flex
        flex-direction: column
        gap: min(5px, 1vw)
    &__input
        width: min(400px, 100%)
        font-family: 'Trebuchet'
        font-size: min(20px, 5vw)
        font-weight: 400
        height: min(50px, 10vw)
        border: none
        border-bottom: 1px solid rgba(grey, 0.5)
        resize: none
        &:focus
          outline: none
          border-bottom: 1px solid rgba(blue, 0.5)
        &::placeholder
          color: rgba(grey, 0.8)
          font-weight: 400
        &_textarea
          width: 100%
          height: auto
    &__label
        font-family: 'Trebuchet'
        font-size: min(16px, 3.5vw)
        font-weight: 400
        margin: 0
        color: rgba(black, 1)
        &_radio
            margin-top: min(50px, 10vw)
            margin-bottom: min(20px, 3vw)
    &__control
        display: flex
        flex-direction: row
        justify-content: space-between
        padding: 0 min(30px, 3vw)
        margin-top: min(40px, 5vw)
        @media screen and (min-width: 768px)
            padding: 0
            justify-content: flex-end
            gap: 20px
    &__button
        border: none
        background: transparent
        border-radius: min(12px, 2vw)
        padding: 10px 30px
        font-size: min(24px, 5vw)
        cursor: pointer
        &_clear
            border: 1px solid rgba(blue, 0.5)
            color: rgba(blue, 0.5)
            &._disabled
                border: 1px solid rgba(grey, 0.5)
                color: rgba(grey, 0.5)
        &_submit
            color: rgba(white, 1)
            background: rgba(grey, 0.5)
            &._active
                background: rgba(blue, 0.5)
        &_radio
            width: 40px
            height: 40px
            opacity: 1
            border: none
            cursor: pointer
            background-color: transparent
            background-position: center
            background-size: cover
            transform: scale(0.6)
            transition: all 0.5s ease
            &._active
                transform: scale(1)
    &__error
        font-size: min(14px, 3vw)
        padding: 0
        margin: 0
        color: red
        height: 16px
</style>
