import React, { useState } from 'react';
import dayjs from 'dayjs';
import * as api from '@api';
import { useQuery } from '@tanstack/react-query';
import { Solve as ISolve, Status } from '../../../../api/solves/types';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SolveModal from './SolveModal';
dayjs.extend(customParseFormat);

interface Props extends ISolve {
    index: number;
}

const Solve: React.FC<Props> = ({ index, ...solve }) => {
    const { id, time, status, scramble, createdAt } = solve;

    const { data: solves } = useQuery(['solves'], api.solves.getSolves);
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);

    // time formats
    const okTime = time.slice(0, time.length - 1);
    const plus2Time = dayjs(time, 'm:ss.SSS').isValid()
        ? dayjs(time, 'm:ss.SSS')
              .add(2, 'seconds')
              .format('m:ss.SSS')
              .slice(
                  0,
                  dayjs(time, 'm:ss.SSS').add(2, 'seconds').format('m:ss.SSS')
                      .length - 1
              ) + '+'
        : dayjs(time, 'ss.SSS').isValid()
        ? dayjs(time, 'ss.SSS').add(2, 'seconds').minute() === 0
            ? dayjs(time, 'ss.SSS')
                  .add(2, 'seconds')
                  .format('ss.SSS')
                  .slice(
                      0,
                      dayjs(time, 'ss.SSS').add(2, 'seconds').format('ss.SSS')
                          .length - 1
                  ) + '+'
            : dayjs(time, 'ss.SSS')
                  .add(2, 'seconds')
                  .format('m:ss.SSS')
                  .slice(
                      0,
                      dayjs(time, 'ss.SSS').add(2, 'seconds').format('m:ss.SSS')
                          .length - 1
                  ) + '+'
        : 'Invaild time';
    const dnfTime = 'DNF';

    return (
        <>
            <tr
                className="cursor-pointer"
                onClick={() => setModalOpen(!modalOpen)}
            >
                <td>{solves?.length! - index}</td>
                {status === Status.DNF && <td>{dnfTime}</td>}
                {status === Status.PLUS2 && <td>{plus2Time}</td>}
                {status === Status.OK && <td>{okTime}</td>}
                <td>-</td>
                <td>-</td>
            </tr>

            <SolveModal
                {...{
                    modalOpen,
                    setModalOpen,
                    okTime,
                    plus2Time,
                    dnfTime,
                    id,
                    scramble,
                    createdAt,
                    status
                }}
            />
        </>
    );
};

export default Solve;
