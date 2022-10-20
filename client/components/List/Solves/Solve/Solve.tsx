import React from 'react';
import { Solve as ISolve } from '../../../../api/solves/types';
import { useQuery } from '@tanstack/react-query';
import * as api from '@api';

interface Props extends ISolve {
    index: number;
}

const Solve: React.FC<Props> = ({ index, time }) => {
    const { data: solves } = useQuery(['solves'], api.solves.getSolves);

    return (
        <tr>
            <td>{solves?.length! - index}</td>
            <td>{time}</td>
            <td>-</td>
            <td>-</td>
        </tr>
    );
};

export default Solve;
