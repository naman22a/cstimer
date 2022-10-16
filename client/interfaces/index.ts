import { FormikHelpers } from 'formik';

export interface RegisterInfo {
    name: string;
    email: string;
    password: string;
    cpassword: string;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export type HandeSubmit<T> = (
    values: T,
    formikHelpers: FormikHelpers<T>
) => void | Promise<any>;