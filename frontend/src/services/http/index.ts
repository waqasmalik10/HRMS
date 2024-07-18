import axios from "axios";

// console.log(import.meta.env.VITE_APP_TITLE); 
// console.log(import.meta.env.VITE_APP_BACKEND_API_URL); 

const baseURL: string = import.meta.env.VITE_APP_BACKEND_API_URL || "";

const userToken = JSON.parse(localStorage.getItem("user") || "{}")?.token;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    common: {
      Authorization: `Bearer ${userToken}`,
    },
  },
});


function setAuthToken(token = "") {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const methods = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
  setAuthToken,
};

export default methods;