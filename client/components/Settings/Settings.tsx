import React from 'react';
import styles from './Settings.module.scss';
import { IoIosSettings } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { HiOutlineCurrencyRupee, HiOutlineAdjustments } from 'react-icons/hi';
import { useRouter } from 'next/router';
import * as api from '../../api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { notify, showError } from '../../utils';

const Settings: React.FC = () => {
    const router = useRouter();
    const { mutateAsync: logout } = useMutation(
        ['auth', 'logout'],
        api.auth.logout
    );

    const handleLogout = async () => {
        const toastId = toast.loading('Loading...');

        const res = await logout();
        if (res.ok && !res.errors) {
            notify('Logged out');
            toast.dismiss(toastId);
            await router.push('/login');
        } else {
            showError();
            toast.dismiss(toastId);
        }
    };

    return (
        <div className={styles.container}>
            <button>
                <IoIosSettings />
            </button>
            <button onClick={() => handleLogout()}>
                <FiLogOut />
            </button>
            <button>
                <BsFillGrid3X3GapFill />
            </button>

            <button>CsTimer</button>

            <button>
                <AiOutlineUnorderedList />
            </button>
            <button>
                <HiOutlineCurrencyRupee />
            </button>
            <button>
                <HiOutlineAdjustments />
            </button>
        </div>
    );
};

export default Settings;
