import API from '..';
import { User } from './types';

export const me = async (): Promise<User> => {
    try {
        const res = await API.get('/users/me');
        return res.data;
    } catch (error) {
        return null;
    }
};
