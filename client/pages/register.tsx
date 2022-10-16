import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import { HandeSubmit, RegisterInfo } from '../interfaces';
import { InputField, LoadingButton } from '../components';
import styles from '../styles/auth.module.scss';
import * as api from '../api';
import { useMutation } from '@tanstack/react-query';
import { mapToErrors, notify } from '../utils';
import { Toaster } from 'react-hot-toast';

const Register: NextPage = () => {
    const { mutateAsync: register } = useMutation(
        ['auth', 'register'],
        api.auth.register
    );

    const handleSubmit: HandeSubmit<RegisterInfo> = async (
        values,
        { setErrors }
    ) => {
        const { name, email, password, cpassword } = values;

        if (password !== cpassword) {
            setErrors({ cpassword: 'Passwords must be same' });
            return;
        }

        const res = await register({ name, email, password });
        if (res.ok && !res.errors) {
            notify('Please check your email');
        } else {
            setErrors(mapToErrors(res.errors!));
        }
    };

    return (
        <div className={styles.container}>
            <h1>register</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    cpassword: ''
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="name" label="Name" />
                        <InputField name="email" label="Email" type="email" />
                        <InputField
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <InputField
                            name="cpassword"
                            label="Confirm Password"
                            type="password"
                        />
                        <LoadingButton
                            isLoading={isSubmitting}
                            type="submit"
                            className="mt-3"
                        >
                            Register
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
};

export default Register;
