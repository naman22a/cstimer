import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@store';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import * as api from '@api';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const
        }
    }
};

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const ToolBox: React.FC = () => {
    const toolBoxVisible = useStore(state => state.toolBoxVisible);
    const {
        data: solves,
        isLoading,
        isError
    } = useQuery(['solves'], api.solves.getSolves);

    if (isLoading || isError || !solves) {
        return <p>Loading...</p>;
    }

    const labels: string[] = [];

    for (const solve of solves) {
        labels.push(months[dayjs(solve.createdAt).month()]);
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: solves.map(solve => {
                    const { time } = solve;
                    if (dayjs(time, 'm:ss.SSS').isValid()) {
                        return dayjs(time, 'm:ss.SSS').unix();
                    } else if (dayjs(time, 'ss.SSS').isValid()) {
                        return dayjs(time, 'ss.SSS').unix();
                    } else {
                        return 0;
                    }
                }),
                borderColor: '#51C4D3',
                backgroundColor: '#126E82'
            }
        ]
    };

    return (
        <AnimatePresence initial={false} mode="wait">
            {toolBoxVisible && (
                <div className="absolute md:bottom-0 bottom-10 right-0 bg-gray-200 dark:bg-Grey p-6 rounded-2xl">
                    <Line options={options} data={data} />
                </div>
            )}
        </AnimatePresence>
    );
};

export default ToolBox;
