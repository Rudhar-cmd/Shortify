import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    withCredentials: true,
});

export const getShortUrl = (shortCode) => {
    return `${import.meta.env.VITE_BACKEND_URL}/${shortCode}`;
};

export default api;