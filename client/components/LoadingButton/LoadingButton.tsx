import React, { InputHTMLAttributes } from 'react';
import { CgSpinner } from 'react-icons/cg';
import styles from './LoadingButton.module.scss';

type Props = InputHTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean;
    children: React.ReactNode;
};

const LoadingButton: React.FC<Props> = ({
    isLoading,
    className,
    type,
    children,
    ...props
}) => {
    return (
        <button
            className={`${styles.btn} ${className}`}
            {...props}
            type={type as any}
        >
            {isLoading && <CgSpinner />}
            <span>{children}</span>
        </button>
    );
};

export default LoadingButton;
