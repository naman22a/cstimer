import React from 'react';
import styles from './Input.module.scss';

interface Props {
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    handleInputButtonClick: () => void;
}

const Input: React.FC<Props> = ({
    inputText,
    handleInputButtonClick,
    setInputText
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <input
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    className={`bg-gray-300 dark:bg-Black dark:text-white`}
                />
                <button
                    onClick={handleInputButtonClick}
                    className={`bg-gray-300 dark:bg-Neon-200`}
                >
                    Done
                </button>
            </div>
            <p>do not press spacebar while typing the input scramble</p>
        </div>
    );
};

export default Input;
