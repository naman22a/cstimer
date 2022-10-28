import React, { useState } from 'react';
import styles from './Solve.module.scss';
import dayjs from 'dayjs';
import * as api from '@api';
import toast from 'react-hot-toast';
import { notify, showError } from '@utils';
import { AiOutlineClose } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Solve as ISolve, Status } from '../../../../api/solves/types';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface Props extends ISolve {
    index: number;
}

const Solve: React.FC<Props> = ({ index, ...solve }) => {
    const { id, time, status, scramble, createdAt } = solve;

    const queryClient = useQueryClient();
    const { data: solves } = useQuery(['solves'], api.solves.getSolves);
    const [modalOpen, setModalOpen] = useState(false);

    // delete solve
    const { mutateAsync: deleteSolve } = useMutation(
        ['solves', 'delete', id],
        api.solves.deleteSolve
    );
    const handleDeleteSolve = async () => {
        const yes = confirm('Are you sure you want to delete the solve');

        if (yes) {
            const toastId = toast.loading('Loading...');
            const res = await deleteSolve(id);
            if (res.ok && !res.errors) {
                notify('Solve deleted sucessfully');
                await queryClient.invalidateQueries(['solves']);
            } else {
                showError();
            }
            toast.dismiss(toastId);
        }
        setModalOpen(false);
    };

    // update solve status
    const { mutateAsync: updateSolveStatus } = useMutation(
        ['solves', 'update-status', id],
        api.solves.updateSolveStatus
    );
    const handleUpdateSolve = async (status: Status) => {
        const res = await updateSolveStatus({ id, status });
        if (res.ok && !res.errors) {
            notify('Solve updated sucessfully');
            await queryClient.invalidateQueries(['solves']);
        } else {
            showError();
        }
    };

    const okSolve = () => handleUpdateSolve(Status.OK);
    const plus2Solve = () => handleUpdateSolve(Status.PLUS2);
    const dnfSolve = () => handleUpdateSolve(Status.DNF);

    console.log();

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

            <tr className={styles.Modal}>
                <td>
                    <input
                        type="checkbox"
                        id={`solve-modal-${id}`}
                        onClick={() => setModalOpen(false)}
                    />
                    <label
                        htmlFor={`solve-modal-${id}`}
                        className={`modal ${modalOpen ? 'modal-open' : ''}`}
                    >
                        <label className="bg-gray-200 dark:bg-Grey">
                            <h3>
                                {status === Status.DNF && (
                                    <>
                                        {dnfTime}({okTime})
                                    </>
                                )}
                                {status === Status.PLUS2 && <>{plus2Time}</>}
                                {status === Status.OK && <>{okTime}</>}
                            </h3>
                            <div className={styles.btns}>
                                <button className={styles.ok} onClick={okSolve}>
                                    OK
                                </button>
                                <button
                                    className={styles.plus2}
                                    onClickCapture={plus2Solve}
                                >
                                    +2
                                </button>
                                <button
                                    className={styles.dnf}
                                    onClick={dnfSolve}
                                >
                                    DNF
                                </button>
                                <button
                                    className={styles.delete}
                                    onClick={() => handleDeleteSolve()}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <div>
                                <span>Scramble: </span>
                                {scramble}
                            </div>
                            <div>
                                <span>Date: </span>
                                {dayjs(createdAt).format(
                                    'DD/MM/YYYY hh:mm:ss A'
                                )}
                            </div>
                            <button
                                className=" dark:bg-Neon-200 bg-Neon-100"
                                onClick={() => setModalOpen(false)}
                            >
                                close
                            </button>
                        </label>
                    </label>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </>
    );
};

export default Solve;
