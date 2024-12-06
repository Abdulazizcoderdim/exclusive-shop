import axios from 'axios';

const $axios = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

export default $axios;
