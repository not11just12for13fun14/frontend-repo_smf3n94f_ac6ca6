import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  timeout: 15000,
})

// Example interceptors (no auth required as per request)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Bubble up error in a friendly format
    const message = error?.response?.data?.message || error.message || 'Terjadi kesalahan.'
    return Promise.reject(new Error(message))
  }
)

export default api
