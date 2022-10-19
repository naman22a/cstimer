import API from '..';
import { showError } from '../../utils';
import { OkResponse } from '../types';
import { Session, Sessions } from './types';

export const sessions = async (): Promise<Sessions> => {
    try {
        const res = await API.get('/sessions');
        return res.data;
    } catch (error) {
        showError('Something went wrong');
        return null;
    }
};

export const currentSession = async (): Promise<Session> => {
    try {
        const res = await API.get('/sessions/current');
        return res.data;
    } catch (error) {
        showError('Something went wrong');
        return null;
    }
};

export const createSession = async (name: string): Promise<Session> => {
    try {
        const res = await API.post('/sessions', { name });
        return res.data;
    } catch (error) {
        showError('Something went wrong');
        return null;
    }
};

export const deleteSession = async (id: number): Promise<OkResponse> => {
    try {
        const res = await API.delete(`/sessions/${id}`);
        return res.data;
    } catch (error) {
        showError('Something went wrong');
        return { ok: false };
    }
};

export const changeSession = async (id: number): Promise<OkResponse> => {
    try {
        const res = await API.patch(`/sessions/change/${id}`);
        return res.data;
    } catch (error) {
        showError('Something went wrong');
        return { ok: false };
    }
};

export const renameSession = async (name: string): Promise<OkResponse> => {
    try {
        const res = await API.patch('/sessions/rename', { name });
        return res.data;
    } catch (error) {
        showError('Something went wrong');
        return { ok: false };
    }
};
