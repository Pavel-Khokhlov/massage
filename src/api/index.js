import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_TELEGRAM_API}${import.meta.env.VITE_TELEGRAM_BOT}:${import.meta.env.VITE_TELEGRAM_TOKEN}`
});

export default api;