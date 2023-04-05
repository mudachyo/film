import axios from "axios";

export const $kpToken = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/',
    headers: {
        'X-API-KEY': '82d173d4-27f4-460a-96cb-a16fa115cb2a',
        'Content-Type': 'application/json',
    }
})
