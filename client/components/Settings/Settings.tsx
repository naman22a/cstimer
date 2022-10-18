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
            <button className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200">
                <IoIosSettings />
            </button>
            <button
                className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200"
                onClick={() => handleLogout()}
            >
                <FiLogOut />
            </button>
            <button className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200">
                <BsFillGrid3X3GapFill />
            </button>

            <button className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200">
                CsTimer
            </button>

            <button className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200">
                <AiOutlineUnorderedList />
            </button>
            <button className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200">
                <HiOutlineCurrencyRupee />
            </button>
            <button className="bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200">
                <HiOutlineAdjustments />
            </button>
        </div>
    );
};

export default Settings;
