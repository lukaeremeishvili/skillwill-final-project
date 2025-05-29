import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
});

export default axiosInstance;
