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
        <p class="form__error">{{ $store.state.formError.name.error }}</p>
      </div>
      <div class="form__field">
        <label for="contact" class="form__label">{{
          ENUM_COMMUNICATION[$store.state.formState.contactType]
        }}</label>
        <input
          ref="contact"
          type="text"
          id="contact"
          name="contact"
          :value="$store.state.formState.contact"
          placeholder="Ваш контакт"
          class="form__input"
          autocomplete="off"
          @input="handleChange($event)"
        />
        <p class="form__error">{{ $store.state.formError.contact.error }}</p>
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
          autocomplete="off"
          @input="handleChange($event)"
        ></textarea>
        <p class="form__error">{{ $store.state.formError.message.error }}</p>
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
      for (let key in this.$store.state.formError) {
        if (
          this.$store.state.formError[key].error == '' &&
          !this.$store.state.formError[key].status
        )
          return (this.isFormCompleted = false)
      }
      return (this.isFormCompleted = true)
    },
    focus() {
      this.$refs.contact.name = 'fuck'
      console.log('here will be focus', this.$refs.contact.name)
    },
    blur() {
      this.$refs.contact.name = 'contact'
      console.log('here will be focus', this.$refs.contact.name)
    }
  }
}
</script>

<style lang="sass">
@import @/sass/index
.form
    margin-top: min(55px, 10vw)
    display: flex
    flex-direction: column
    gap: min(28px, 7vw)
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
        font-size: $text-section-text-big
        font-weight: 400
        height: min(50px, 10vw)
        border: none
        border-bottom: 1px solid $base-silver-color
        resize: none
        &:focus
          outline: none
          border-bottom: 1px solid $base-brand-color
        &::placeholder
          color: $base-silver-color
          font-weight: 200
          font-size: $text-section-text-big
        &_textarea
          font-size: $text-section-text-big
          font-family: RobotoFlex
          width: 100%
          height: auto
    &__label
        font-size: $text-form-label
        font-weight: 400
        margin: 0
        color: rgba(black, 0.7)
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
        font-size: $text-main-button
        cursor: pointer
        &_clear
            border: 1px solid $base-brand-color
            color: $base-brand-color
            &._disabled
                border: 1px solid $base-silver-color
                color: $base-silver-color
        &_submit
            color: rgba(white, 1)
            background: $base-silver-color
            &._active
                background: $base-brand-color
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
        font-size: $text-form-error
        padding: 0
        margin: 0
        color: red
        height: 16px
</style>
