import API from '..';
import { showError } from '../../utils';
import { CreateSolveDto, Solve } from './types';

export const getSolves = async (): Promise<Solve[]> => {
    try {
        const res = await API.get('solves');
        return res.data;
    } catch (error) {
        showError();
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
