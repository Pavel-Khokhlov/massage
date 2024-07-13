import axios from 'axios';

export default axios.create({
  baseURL: `${import.meta.env.VITE_TELEGRAM_API}${import.meta.env.VITE_TELEGRAM_BOT}:${import.meta.env.VITE_TELEGRAM_TOKEN}`
});
