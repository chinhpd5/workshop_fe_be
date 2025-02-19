import axios from "axios";

const token = localStorage.getItem("token")

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Authorization': token ? `Bearer ${token}`: ''
  }
})

// Sử dụng interceptors

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default instance;