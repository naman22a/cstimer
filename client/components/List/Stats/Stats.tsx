import React from 'react';
import styles from './Stats.module.scss';
import * as api from '@api';
import { useQuery } from '@tanstack/react-query';
import { Status } from '../../../api/solves/types';
import { mean } from '@utils';

const Stats: React.FC = () => {
    const { data: solves } = useQuery(['solves'], api.solves.getSolves);
    return (
        <div className={styles.container}>
            <h4>Mean: {mean(solves ? solves : [])}</h4>
            <h4>
                Solves:{' '}
                {solves?.filter(solve => solve.status !== Status.DNF).length}/
                {solves?.length}
            </h4>
        </div>
    );
};

export default Stats;
