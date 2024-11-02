import axios from "axios";

export const mongoApi = axios.create({
  baseURL: "https://backend-taskpro.onrender.com/",
});

export const setToken = (token) => {
  mongoApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  mongoApi.defaults.headers.common.Authorization = "";
};
