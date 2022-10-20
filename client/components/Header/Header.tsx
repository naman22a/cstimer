import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { useTheme } from 'next-themes';
import { useLoaded } from '@hooks';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import { useStore } from '@store';
import { scrambleGenrator } from '@utils';

const Header: React.FC = () => {
    // dark / light theme toggle
    const { theme, setTheme } = useTheme();
    const loaded = useLoaded();

    // state
    const scramble = useStore(state => state.scramble);
    const setScramble = useStore(state => state.setScramble);
    const puzzleType = useStore(state => state.puzzleType);
    const scrambleList = useStore(state => state.scrambleList);
    const addScrambleList = useStore(state => state.addScrambleList);

    useEffect(() => {
        // default scramble on load
        const newScramble = scrambleGenrator(puzzleType);
        addScrambleList(newScramble);
        setScramble(newScramble);
    }, []);

    // function for last scramble
    const handleLastClick = () => {
        if (scrambleList.length >= 2) {
            setScramble(scrambleList[scrambleList.length - 2]);
        } else {
            setScramble(scrambleList[0]);
        }
    };

    // function for next scramble
    const handleNextClick = () => {
        const newScramble = scrambleGenrator(puzzleType);
        addScrambleList(newScramble);
        setScramble(newScramble);
    };

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
                    {loaded && theme === 'light' ? (
                        <BsFillMoonFill />
                    ) : (
                        <BsSunFill />
                    )}
                </button>
                <span className="cursor-pointer" onClick={handleLastClick}>
                    last
                </span>
                <span className="mx-1">/</span>
                <span
                    className="text-Neon-200 dark:text-Neon-100 cursor-pointer"
                    onClick={handleNextClick}
                >
                    next
                </span>
                <span className="ml-3">scramble</span>
            </div>
            <h2>{scramble}</h2>
        </header>
    );
};

export default Header;
