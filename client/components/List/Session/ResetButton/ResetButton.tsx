import React from 'react';
import { BiReset } from 'react-icons/bi';

const ResetButton: React.FC = () => {
    return (
        <button className="bg-Neon-100 hover:bg-Neon-200 dark:bg-Neon-200 dark:hover:bg-Neon-100 p-1 text-white rounded-lg">
            <BiReset />
        </button>
    );
};

export default ResetButton;
