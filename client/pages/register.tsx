import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import { HandeSubmit, RegisterInfo } from '../interfaces';
import { InputField } from '../components';
import styles from '../styles/auth.module.scss';
import * as api from '../api';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { mapToErrors, notify } from '../utils';
import { Toaster } from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';

const Register: NextPage = () => {
    const router = useRouter();
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
                        <button type="submit">
                            {isSubmitting && <CgSpinner />}
                            <span>Register</span>
                        </button>
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
};

export default Register;
