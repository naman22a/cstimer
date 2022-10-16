import { FieldError } from '../api/types';
import toast from 'react-hot-toast';

export const mapToErrors = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    for (const error of errors) {
        errorMap[error.field] = error.message;
    }
    return errorMap;
};

export const notify = (text: string) =>
    toast.success(text, {
        duration: 2000,
        position: 'top-center',
        className: 'toast'
    });

export const showError = (text: string = 'Something went wrong') =>
    toast.error(text, {
        duration: 2000,
        position: 'top-center',
        className: 'toast'
    });
