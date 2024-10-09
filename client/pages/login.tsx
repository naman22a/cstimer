import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Formik, Form, FormikErrors } from 'formik';
import { HandleSubmit, LoginInfo } from '@interfaces';
import { InputField, LoadingButton } from '@components';
import styles from '../styles/auth.module.scss';
import * as api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isEmail, mapToErrors, notify, showError } from '@utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Login: NextPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutateAsync: login } = useMutation(
        ['auth', 'login'],
        api.auth.login
    );
    const { mutateAsync: forgotPassword } = useMutation(
        ['auth', 'forgot-password'],
        api.auth.forgotPassword
    );

    const handleSubmit: HandleSubmit<LoginInfo> = async (
        values,
        { setErrors }
    ) => {
        const { email, password } = values;

        const res = await login({ email, password });
        if (res.ok && !res.errors) {
            await queryClient.invalidateQueries(['users', 'me']);
            await router.push('/');
            notify('Logged in');
        } else {
            setErrors(mapToErrors(res.errors!));
        }
    };

    const handleForgotPassword = async (
        email: string,
        setErrors: (
            errors: FormikErrors<{
                email: string;
                password: string;
            }>
        ) => void
    ) => {
        const toastId = toast.loading('Loading...');

        if (!isEmail(email)) {
            setErrors({
                email: 'Invalid email'
            });
        }

        const res = await forgotPassword(email);

        if (res.ok && !res.errors) {
            notify('Reset password email sent');
        } else {
            showError();
        }

        toast.dismiss(toastId);
    };

    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values: { email }, setErrors }) => (
                    <Form>
                        <InputField name="email" label="Email" type="email" />
                        <InputField
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <p
                            className="font-semibold mb-3 border-b-2 border-b-Neon-200 inline-block pb-2 cursor-pointer"
                            onClick={() =>
                                handleForgotPassword(email, setErrors)
                            }
                        >
                            Forgot password ?
                        </p>
                        <LoadingButton
                            isLoading={isSubmitting}
                            type="submit"
                            className="mt-3"
                        >
                            Login
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
            <p className="mt-3">
                Don't have an account already ?{' '}
                <span className="text-Neon-100 underline">
                    <Link href="/register">Register</Link>
                </span>
            </p>
        </div>
    );
};

export default Login;
