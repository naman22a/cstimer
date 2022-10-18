import React from 'react';
import styles from './Timer.module.scss';
import Avg from './Avg/Avg';

const Timer: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>0.00</h1>
            <div className="mt-5">
                <Avg n={5} />
                <Avg n={12} />
            </div>
        </div>
    );
};

export default Timer;
