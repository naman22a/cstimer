import React from 'react';
import * as api from '@api';
import { motion } from 'framer-motion';
import { BiReset } from 'react-icons/bi';
import { notify, showError } from '@utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ResetButton: React.FC = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: resetSolves } = useMutation(
        ['solves', 'reset'],
        api.solves.resetSolves
    );

    const handleReset = async () => {
        const res = await resetSolves();
        if (res.ok && !res.errors) {
            notify('All Solves deleted sucessfully');
            await queryClient.invalidateQueries(['solves']);
        } else {
            showError();
        }
    };

    return (
        <motion.button
            className="bg-Neon-100 hover:bg-Neon-200 dark:bg-Neon-200 dark:hover:bg-Neon-100 p-1 text-white rounded-lg"
            onClick={() => handleReset()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <BiReset />
        </motion.button>
    );
};

export default ResetButton;
