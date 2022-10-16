import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import { HandeSubmit, LoginInfo } from '../interfaces';
import { InputField, LoadingButton } from '../components';
import styles from '../styles/auth.module.scss';
import * as api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mapToErrors, notify } from '../utils';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutateAsync: login } = useMutation(
        ['auth', 'login'],
        api.auth.login,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['users', 'me']);
            }
        }
    );

    const handleSubmit: HandeSubmit<LoginInfo> = async (
        values,
        { setErrors }
    ) => {
        const { email, password } = values;

        const res = await login({ email, password });
        if (res.ok && !res.errors) {
            notify('Logged in');
            router.push('/');
        } else {
            setErrors(mapToErrors(res.errors!));
        }
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
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="email" label="Email" type="email" />
                        <InputField
                            name="password"
                            label="Password"
                            type="password"
                        />
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
        </div>
    );
};

export default Login;
