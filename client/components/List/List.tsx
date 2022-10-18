import React from 'react';
import styles from './List.module.scss';
import Session from './Session/Session';
import Solves from './Solves/Solves';
import Stats from './Stats/Stats';

const List: React.FC = () => {
    return (
        <div className={`${styles.container} dark:bg-Grey bg-gray-200`}>
            <Session />
            <Stats />
            <Solves />
        </div>
    );
};

export default List;
