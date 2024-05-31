import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.freecurrencyapi.com/v1/`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Api Error:", error);
    return Promise.reject(error);
  }
);
