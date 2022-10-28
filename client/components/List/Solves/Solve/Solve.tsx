import React, { useState } from 'react';
import { Solve as ISolve, Status } from '../../../../api/solves/types';
import { useQuery } from '@tanstack/react-query';
import * as api from '@api';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AiOutlineClose } from 'react-icons/ai';
dayjs.extend(customParseFormat);

interface Props extends ISolve {
    index: number;
}

const Solve: React.FC<Props> = ({ index, ...solve }) => {
    const { data: solves } = useQuery(['solves'], api.solves.getSolves);
    const { id, time, status, scramble, createdAt } = solve;
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <tr
                className="cursor-pointer"
                onClick={() => setModalOpen(!modalOpen)}
            >
                <td>{solves?.length! - index}</td>
                {status === Status.DNF && <td>DNF</td>}
                {status === Status.PLUS2 && (
                    <td>
                        {dayjs(time, 'ss.SSS').isValid() &&
                        dayjs(time, 'ss.SSS').add(2, 'seconds').minute() === 0
                            ? dayjs(time, 'ss.SSS')
                                  .add(2, 'seconds')
                                  .format('s.SSS')
                                  .slice(
                                      0,
                                      dayjs(time, 's.SSS').format('s.SSS')
                                          .length - 1
                                  )
                            : dayjs(time, 'ss.SSS')
                                  .add(2, 'seconds')
                                  .format('m:ss.SSS')
                                  .slice(
                                      0,
                                      dayjs(time, 'ss.SSS')
                                          .add(2, 'seconds')
                                          .format('m:ss.SSS').length - 1
                                  )}
                        +
                    </td>
                )}
                {status === Status.OK && (
                    <td>{time.slice(0, time.length - 1)}</td>
                )}
                <td>-</td>
                <td>-</td>
            </tr>

            <input
                type="checkbox"
                id={`solve-modal-${id}`}
                className="hidden"
                onClick={() => setModalOpen(false)}
            />
            <label
                htmlFor={`solve-modal-${id}`}
                className={`modal cursor-pointer ${
                    modalOpen ? 'modal-open' : ''
                }`}
            >
                <label className="bg-gray-200 dark:bg-Grey p-4 md:p-8 rounded-lg relative flex flex-col justify-center items-center mx-5">
                    <h3 className="text-lg font-bold mb-2">
                        {status === Status.DNF && <>DNF({time})</>}
                        {status === Status.PLUS2 && (
                            <>
                                {dayjs(time, 'ss.SSS').isValid() &&
                                dayjs(time, 'ss.SSS')
                                    .add(2, 'seconds')
                                    .minute() === 0
                                    ? dayjs(time, 'ss.SSS')
                                          .add(2, 'seconds')
                                          .format('s.SSS')
                                          .slice(
                                              0,
                                              dayjs(time, 's.SSS').format(
                                                  's.SSS'
                                              ).length - 1
                                          )
                                    : dayjs(time, 'ss.SSS')
                                          .add(2, 'seconds')
                                          .format('m:ss.SSS')
                                          .slice(
                                              0,
                                              dayjs(time, 'ss.SSS')
                                                  .add(2, 'seconds')
                                                  .format('m:ss.SSS').length - 1
                                          )}
                                +
                            </>
                        )}
                        {status === Status.OK && (
                            <>{time.slice(0, time.length - 1)}</>
                        )}
                    </h3>
                    <div className="my-2 flex flex-wrap gap-3">
                        <button className="md:text-lg px-3 py-1 text-white bg-green-600 rounded-lg">
                            OK
                        </button>
                        <button className="md:text-lg px-3 py-1 text-white bg-yellow-500 rounded-lg">
                            +2
                        </button>
                        <button className="md:text-lg px-3 py-1 text-white bg-orange-600 rounded-lg">
                            DNF
                        </button>
                        <button className="md:text-lg px-3 py-1 text-white bg-red-600 rounded-lg">
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="my-2">
                        <span className="font-semibold text-lg mr-2 text-Neon-100">
                            Scramble:{' '}
                        </span>
                        {scramble}
                    </div>
                    <div className="my-2">
                        <span className="font-semibold text-lg mr-2 text-Neon-100">
                            Date:{' '}
                        </span>
                        {dayjs(createdAt).format('DD/MM/YYYY hh:mm:ss A')}
                    </div>
                    <button
                        className="mt-2 uppercase py-2 px-4 text-white dark:bg-Neon-200 bg-Neon-100 rounded-lg"
                        onClick={() => setModalOpen(false)}
                    >
                        close
                    </button>
                </label>
            </label>
        </>
    );
};

export default Solve;
