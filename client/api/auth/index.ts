import axios from 'axios';
import API from '..';
import { OkResponse } from '../types';
import { LoginDto, RegisterDto, ResetPasswordDto } from './types';

export const register = async (data: RegisterDto): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/register', data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};

export const confirmEmail = async (token: string): Promise<OkResponse> => {
    try {
        const res = await API.post(`/auth/confirm/${token}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};

export const login = async (data: LoginDto): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/login', data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};

export const forgotPassword = async (email: string): Promise<OkResponse> => {
    try {
        const res = await API.post('/auth/forgot-password', { email });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};

export const resetPassword = async ({
    token,
    password
}: ResetPasswordDto): Promise<OkResponse> => {
    try {
        const res = await API.post(`/auth/reset-password/${token}`, {
            password
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};
