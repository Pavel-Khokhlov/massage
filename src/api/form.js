import api from '@/api'

export async function submitForm(value) {
  try {
    await api.post(`/sendMessage?chat_id=${import.meta.env.VITE_TELEGRAM_CHAT_ID}&text=${value}`)
    return { message: 200 }
  } catch (e) {
    return { error: e }
  }
}
