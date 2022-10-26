import { useQuery } from '@tanstack/react-query';
import React from 'react';
import * as api from '@api';
import { avg } from '@utils';

const Avg: React.FC<{ n: number }> = ({ n }) => {
    const {
        data: solves,
        isLoading,
        isError
    } = useQuery(['solves'], api.solves.getSolves);

    return (
        <div className="text-xl">
            <span className="text-Neon-100 font-semibold">Ao{n}: </span>
            {isLoading || isError || !solves ? (
                <p>Loading...</p>
            ) : solves.length >= n ? (
                `${avg(solves.slice(0, n))}`
            ) : (
                '-'
            )}
        </div>
    );
};

export default Avg;
