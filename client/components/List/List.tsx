import React from 'react';
import styles from './List.module.scss';

const List: React.FC = () => {
    return (
        <div className={`${styles.container} dark:bg-Grey bg-gray-200`}>
            <h1>List</h1>
        </div>
    );
};

export default List;
