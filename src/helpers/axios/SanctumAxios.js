import axios from "axios";
const SanctumAxios = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",

    // "Access-Control-Allow-Origin": "*",
  },
});

SanctumAxios.defaults.withCredentials = true;

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response.status === 401) {
//       const authStore = useAuthStore();
//       authStore.authenticated = false;
//       router.push({name: 'forbidden'});
//     }
//     return Promise.reject(error);
//   }
// );

export default SanctumAxios;
