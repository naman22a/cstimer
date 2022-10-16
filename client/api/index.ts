import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export default API;
export * as auth from './auth';
export * as user from './users';
