import React from 'react';
import styles from './List.module.scss';
import Session from './Session/Session';
import Solves from './Solves/Solves';
import Stats from './Stats/Stats';
import { useStore } from '@store';
import { AnimatePresence, motion } from 'framer-motion';
import { fade } from '@global';

const List: React.FC = () => {
    const listVisible = useStore(state => state.listVisible);

    return (
        <AnimatePresence initial={false} mode="wait">
            {listVisible && (
                <motion.div
                    className={`${styles.container} dark:bg-Grey bg-gray-200`}
                    variants={fade}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <Session />
                    <Stats />
                    <Solves />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default List;
