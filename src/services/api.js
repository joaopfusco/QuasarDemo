import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer `,
  },
});

api.interceptors.request.use(async (config) => {
  try {
    if (typeof window !== 'undefined') {
      if (config.url.includes('/login')) {
        return config;
      }

      let bearer = sessionStorage.getItem('token');

      if (!bearer) {
        console.warn('Token não encontrado no sessionStorage.');
        return config;
      }

      let decoded;
      try {
        decoded = jwtDecode(bearer);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return config;
      }

      const currentTime = moment().unix();

      if (decoded.exp && currentTime > decoded.exp) {
        console.warn('Token expirado. Requer nova autenticação.');
        return config;
      }

      config.headers['Authorization'] = `Bearer ${bearer}`;
    }
  } catch (error) {
    console.error('Erro no interceptor de requisição:', error);
  }

  return config;
});

export default api;
