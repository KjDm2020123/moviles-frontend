import axios from 'axios';

//Debes de crear su propio archivo .env en la raiz del proyecto con la variable EXPO_PUBLIC_API_URL
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Coloquen aqui interceptores, cuando les pasemos la api de autenticacion

export default api;