import React from 'react';
import styles from './Header.module.scss';
import { useTheme } from 'next-themes';
import { useLoaded } from '../../hooks';
import { BsMoon, BsSunFill } from 'react-icons/bs';

const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const loaded = useLoaded();

    return (
        <header className={`${styles.container} dark:bg-Grey bg-gray-200`}>
            <div>
                <select name="wca" defaultValue="wca">
                    <option value="wca">WCA</option>
                    <option value="input">Input</option>
                </select>
                <select name="puzzleType" defaultValue="3x3">
                    <option value="2x2">2x2</option>
                    <option value="3x3">3x3</option>
                    <option value="4x4">4x4</option>
                    <option value="5x5">5x5</option>
                    <option value="6x6">6x6</option>
                    <option value="7x7">7x7</option>
                </select>
                <button
                    className="mr-2"
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                >
                    {loaded && theme === 'light' ? <BsMoon /> : <BsSunFill />}
                </button>
                <span>last</span>
                <span className="mx-1">/</span>
                <span className="text-Neon-200 dark:text-Neon-100">next</span>
                <span className="ml-3">scramble</span>
            </div>
            <h2>L2 B2 R2 B2 R2 U' L2 B2 U2 F2 D U' F' R' F2 D2 L F D' L F'</h2>
        </header>
    );
};

export default Header;
