import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as api from '../../api';
import { LoadingButton } from '../../components';
import { notify, showError } from '../../utils';

const ConfirmEmail: NextPage = () => {
    const router = useRouter();
    const token = router.query.token as string;
    const { mutateAsync: confirmEmail, isLoading } = useMutation(
        ['auth', 'confirm-email'],
        api.auth.confirmEmail
    );

    const handleConfirmEmail = async () => {
        const res = await confirmEmail(token);
        if (res.ok && !res.errors) {
            notify('Email confirmed');
            router.push('/login');
        } else {
            showError();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-2xl font-semibold">Confirm Email</h1>
            <LoadingButton
                isLoading={isLoading}
                className="mt-5"
                onClick={() => handleConfirmEmail()}
            >
                Confirm Email
            </LoadingButton>
        </div>
    );
};

export default ConfirmEmail;
