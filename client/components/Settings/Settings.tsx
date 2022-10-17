import React from 'react';
import styles from './Settings.module.scss';
import { IoIosSettings } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { HiOutlineCurrencyRupee, HiOutlineAdjustments } from 'react-icons/hi';

const Settings: React.FC = () => {
    return (
        <div className={styles.container}>
            <button>
                <IoIosSettings />
            </button>
            <button>
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
