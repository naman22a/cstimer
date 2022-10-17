import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.container}>
            <h1>Header</h1>
        </header>
    );
};

export default Header;
