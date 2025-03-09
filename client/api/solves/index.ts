import axios from 'axios';
import API from '..';
import { showError } from '../../utils';
import { OkResponse } from '../types';
import { CreateSolveDto, Solve, UpdateSolveStatusDto } from './types';

export const getSolves = async (): Promise<Solve[]> => {
    try {
        const res = await API.get('solves');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createSolve = async (
    data: CreateSolveDto
): Promise<Solve | null> => {
    try {
        const res = await API.post('solves', data);
        return res.data;
    } catch (error) {
        showError();
        return null;
    }
};

export const deleteSolve = async (id: number): Promise<OkResponse> => {
    try {
        const res = await API.delete(`solves/${id}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};

export const updateSolveStatus = async (
    data: UpdateSolveStatusDto
): Promise<OkResponse> => {
    const { id, status } = data;

    try {
        const res = await API.patch(`solves/status/${id}`, { status });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};

export const resetSolves = async (): Promise<OkResponse> => {
    try {
        const res = await API.patch(`solves/reset`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return { ok: false };
    }
};
