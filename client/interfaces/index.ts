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

export interface ResetPasswordInfo {
    password: string;
    cpassword: string;
}

export type HandleSubmit<T> = (
    values: T,
    formikHelpers: FormikHelpers<T>
) => void | Promise<any>;
