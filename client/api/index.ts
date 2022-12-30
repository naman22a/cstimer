import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    withCredentials: true
});

export default API;
export * as auth from './auth';
export * as user from './users';
export * as sessions from './sessions';
export * as solves from './solves';
