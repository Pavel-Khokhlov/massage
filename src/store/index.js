import { createStore } from 'vuex'
import Services from '../data/dataServices'

const body = document.querySelector('.body')

const REG_NAME = /^[a-zA-Zа-яА-ЯЁё\s-_']+$/i
const REG_TELEGRAM = /^@[A-Za-z\d_]{5,64}$/
const REG_PHONE = /^\+(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/
const REG_EMAIL = /^([a-zA-Z\d_.+-])+@(([a-zA-Z\d-])+\.)+([a-zA-Z0\d]{2,4})+$/

const ORDER_MESSAGE = {
  pravilo: 'Здравствуйте, хочу получить консультацию на счет вытяжения на Правило, заранее спасибо',
  massage: 'Здравствуйте, хочу получить консультацию по поводу массажа, заранее спасибо',
  nailstanding: 'Здравствуйте, есть желание провести практику на гвоздях Садху, заранее спасибо',
  kinezio: 'Здравствуйте, необходима консультация по применению Кинезиотейпов, заранее спасибо'
}

const initialServices = (service) => {
  return service.map((s) => {
    return (s = { ...s, isOpened: false })
  })
}

function initialFormState() {
  return {
    contactType: 'phone',
    name: '',
    contact: '+7',
    message: 'Здравствуйте, '
  }
}

function initialFormError() {
  return {
    name: { error: '', status: false },
    contact: { error: '', status: false },
    message: { error: '', status: false }
  }
}

export const store = createStore({
  state() {
    return {
      isMenuOpen: false,
      isDiplomasOpen: false,
      currentDiploma: '',
      currentServiceOpen: '',
      currentScrollPosition: '',
      services: initialServices(Services),
      formState: initialFormState(),
      formError: initialFormError()
    }
  },
  mutations: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen
      if (state.isMenuOpen) {
        body.style.overflow = 'hidden'
        setTimeout(() => {
          state.services = state.services.map((s) => {
            return (s = { ...s, isOpened: false })
          })
        }, 800)
      } else {
        body.style.overflow = 'auto'
      }
    },

    isDiplomaShown(state, payload) {
      state.isDiplomasOpen = true
      state.currentDiploma = payload
    },

    closeDiplomas(state) {
      state.isDiplomasOpen = false
      setTimeout(() => {
        state.currentDiploma = ''
      }, 800)
    },

    isCurrentServiceShown(state, payload) {
      state.services = state.services.map((s) => {
        if (s.id === payload) {
          return (s = { ...s, isOpened: !s.isOpened })
        } else {
          return s
        }
      })
    },

    openCurrentService(state, payload) {
      state.services = state.services.map((s) => {
        if (s.id === payload) {
          return (s = { ...s, isOpened: true })
        } else {
          return (s = { ...s, isOpened: false })
        }
      })
      state.currentScrollPosition = payload
    },

    resetForm(state) {
      state.formState = initialFormState()
      state.formError = initialFormError()
    },

    changeCommunication(state, payload) {
      state.formState.contactType = payload.name
      let tempValue = ''
      switch (payload.name) {
        case 'phone':
        case 'whatsapp':
          tempValue = '+7'
          break

        case 'telegram':
          tempValue = '@'
          break

        default:
          tempValue = ''
          break
      }
      state.formState.contact = tempValue
    },

    handleFormChange(state, payload) {
      const { id, value } = payload.target
      if (id === 'name') {
        state.formState.name = value
        if (value.length === 0)
          return (state.formError.name = { error: 'Поле должно быть заполнено', status: false })
        if (value.length < 2)
          return (state.formError.name = {
            error: 'Имя должно быть больше одной буквы',
            status: false
          })
        if (!REG_NAME.test(value))
          return (state.formError.name = { error: 'Только буквы, пробел - _', status: false })
        return (state.formError.name = { error: '', status: true })
      }
      if (id === 'contact') {
        state.formState.contact = value
        if (value.length === 0)
          return (state.formError.contact = { error: 'Поле должно быть заполнено', status: false })
        if (this.contactType === 'telegram') {
          if (!/^@/.test(value))
            return (state.formError.contact = { error: 'Первый символ @', status: false })
          if (!REG_TELEGRAM.test(value))
            return (state.formError.contact = {
              error: 'Только латинские буквы и _, больше 5 символов',
              status: false
            })
        }
        if (state.formState.contactType === 'email') {
          if (!REG_EMAIL.test(value))
            return (state.formError.contact = {
              error: 'Введите корректный адрес почты',
              status: false
            })
        }
        if (state.formState.contactType === 'phone' || state.formState.contactType === 'whatsapp') {
          if (!/^\+/.test(value))
            return (state.formError.contact = { error: 'Первый символ +', status: false })
          if (!REG_PHONE.test(value))
            return (state.formError.contact = {
              error: 'Введите корректный номер, больше 10 цифр',
              status: false
            })
        }
        return (state.formError.contact = { error: '', status: true })
      }
      if (id === 'message') {
        state.formState.message = value
        if (value.length === 0)
          return (state.formError.message = { error: 'Поле должно быть заполнено', status: true })
        return (state.formError.message = { error: '', status: true })
      }
    },

    setCurrentMessageForOrder(state, payload) {
      state.formState.message = ORDER_MESSAGE[payload]
      const headerHeight = document.getElementById('header').clientHeight
      let offset = 10
      const container = document.getElementById('911363')
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = container.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - headerHeight - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      state.isMenuOpen = false
      body.style.overflow = 'auto'
    }
  }
})
