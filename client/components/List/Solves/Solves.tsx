import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineSearch } from 'react-icons/ai';
import Solve from './Solve/Solve';
import * as api from '@api';
import { showError } from '../../../utils';

const Solves: React.FC = () => {
    const {
        data: solves,
        isLoading,
        isError
    } = useQuery(['solves'], api.solves.getSolves);

    if (isLoading) return <p>Loading...</p>;

    if (isError) {
        showError();
        return null;
    }

    return (
        // table container
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>
                            <AiOutlineSearch />
                        </th>
                        <th>time</th>
                        <th>ao5</th>
                        <th>ao12</th>
                    </tr>
                </thead>
                <tbody>
                    {solves.map((solve, index) => (
                        <Solve index={index} key={solve.id} {...solve} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Solves;
