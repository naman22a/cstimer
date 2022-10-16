import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
    return (
        <div className={styles.container}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default Loading;
