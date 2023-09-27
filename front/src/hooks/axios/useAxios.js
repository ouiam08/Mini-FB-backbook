import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_VITE_API_BASE_URL,
});
