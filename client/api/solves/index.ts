import API from '..';
import { showError } from '../../utils';
import { Solve } from './types';

export const getSolves = async (): Promise<Solve[]> => {
    try {
        const res = await API.get('solves');
        return res.data;
    } catch (error) {
        showError();
        return [];
    }
};
