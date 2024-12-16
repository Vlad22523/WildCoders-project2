import axios from "axios";

export const mongoApi = axios.create({
  baseURL: "https://backend-taskpro.onrender.com/",
});

export const setToken = (token) => {
  if (token) {
    mongoApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete mongoApi.defaults.headers.common["Authorization"];
  }
};

export const clearToken = () => {
  mongoApi.defaults.headers.common.Authorization = "";
};
