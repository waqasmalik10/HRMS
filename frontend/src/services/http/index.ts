import axios from "axios";

const baseURL: string = import.meta.env.VITE_APP_BACKEND_API_URL || "";

const userToken = JSON.parse(localStorage.getItem("user") || "{}")?.access_token;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    common: {
      Authorization: `Bearer ${userToken}`,
    },
  },
});

function setAuthToken(token = "") {
  console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn:",token);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.log("axiosInstanceeeeeeeeeeee:",axiosInstance.defaults.headers.common.Authorization );
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