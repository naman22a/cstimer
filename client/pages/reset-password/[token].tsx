import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField, LoadingButton } from '@components';
import { HandleSubmit, ResetPasswordInfo } from '@interfaces';
import * as api from '@api';
import { mapToErrors, notify, showError } from '@utils';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const token = router.query.token as string;
    const { mutateAsync: resetPassword } = useMutation(
        ['auth', 'reset-password'],
        api.auth.resetPassword
    );

    const handleSubmit: HandleSubmit<ResetPasswordInfo> = async (
        values,
        { setErrors }
    ) => {
        const { password, cpassword } = values;

        if (password !== cpassword) {
            setErrors({ cpassword: 'Passwords must be same' });
            return;
        }

        const res = await resetPassword({ password, token });
        if (res.ok && !res.errors) {
            notify('Reset password done');
            router.push('/login');
        } else {
            if (res.errors) {
                setErrors(mapToErrors(res.errors));
                return;
            } else {
                showError();
                return;
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-2xl font-semibold mb-5">Reset Password</h1>
            <Formik
                initialValues={{ password: '', cpassword: '' }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
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
                            className="mt-7"
                        >
                            Reset Password
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
