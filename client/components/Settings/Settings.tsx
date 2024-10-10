import React from 'react';
import styles from './Settings.module.scss';
import { IoIosSettings } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { HiOutlineCurrencyRupee, HiOutlineAdjustments } from 'react-icons/hi';
import { useRouter } from 'next/router';
import * as api from '@api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { notify, showError } from '@utils';
import { useStore } from '@store';
import AboutModal from './AboutModal/AboutModal';

const Settings: React.FC = () => {
    // Toggle btns
    const toggleHeader = useStore((state) => state.toggleHeader);
    const toggleList = useStore((state) => state.toggleList);
    const aboutModalOpen = useStore((state) => state.aboutModalOpen);
    const toggleAboutModal = useStore((state) => state.toggleAboutModal);
    const toggleToolBox = useStore((state) => state.toggleToolBox);

    // logout
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
            await router.push('/auth');
        } else {
            showError();
            toast.dismiss(toastId);
        }
    };

    const btnStyle =
        'bg-gray-200 dark:bg-Grey hover:bg-Neon-100 dark:hover:bg-Neon-200';

    return (
        <>
            <div className={styles.container}>
                <button className={btnStyle}>
                    <IoIosSettings />
                </button>
                <button className={btnStyle} onClick={() => handleLogout()}>
                    <FiLogOut />
                </button>
                <button className={btnStyle} onClick={toggleHeader}>
                    <BsFillGrid3X3GapFill />
                </button>

                <button className={btnStyle} onClick={toggleAboutModal}>
                    CsTimer
                </button>

                <button className={btnStyle} onClick={toggleList}>
                    <AiOutlineUnorderedList />
                </button>
                <button className={btnStyle}>
                    <HiOutlineCurrencyRupee />
                </button>
                <button className={btnStyle} onClick={toggleToolBox}>
                    <HiOutlineAdjustments />
                </button>
            </div>
            {/* ------------- Modals ------------- */}
            <AboutModal isOpen={aboutModalOpen} closeModal={toggleAboutModal} />
        </>
    );
};

export default Settings;
