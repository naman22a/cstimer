import React from 'react';
import * as api from '@api';
import { useQuery } from '@tanstack/react-query';
import { Status } from '../../../api/solves/types';

const Stats: React.FC = () => {
    const { data: solves } = useQuery(['solves'], api.solves.getSolves);
    return (
        <div className="my-3 flex flex-col justify-center items-center text-sm md:text-base">
            <h4 className="font-semibold md:font-bold">Mean: {11.56}</h4>
            <h4 className="font-semibold md:font-bold">
                Solves:{' '}
                {solves?.filter(solve => solve.status !== Status.DNF).length}/
                {solves?.length}
            </h4>
        </div>
    );
};

export default Stats;
