import React, { Fragment } from 'react';
import styles from './SolveModal.module.scss';
import dayjs from 'dayjs';
import * as api from '@api';
import toast from 'react-hot-toast';
import { notify, showError } from '@utils';
import { AiOutlineClose } from 'react-icons/ai';
import { Status } from '../../../../api/solves/types';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface Props {
    modalOpen: boolean;
    closeModal: () => void;
    okTime: string;
    plus2Time: string;
    dnfTime: string;
    id: number;
    scramble: string;
    createdAt: string;
    status: Status;
}

const SolveModal: React.FC<Props> = props => {
    const queryClient = useQueryClient();
    const {
        modalOpen,
        closeModal,
        okTime,
        plus2Time,
        dnfTime,
        id,
        scramble,
        createdAt,
        status
    } = props;

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
        closeModal();
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

    return (
        <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`bg-gray-200 dark:bg-Grey ${styles.modalPanel}`}
                            >
                                <Dialog.Title as="h3">
                                    {status === Status.DNF && (
                                        <>
                                            {dnfTime}({okTime})
                                        </>
                                    )}
                                    {status === Status.PLUS2 && (
                                        <>{plus2Time}</>
                                    )}
                                    {status === Status.OK && <>{okTime}</>}
                                </Dialog.Title>
                                <div className={styles.btns}>
                                    <button
                                        className={styles.ok}
                                        onClick={okSolve}
                                    >
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
                                    onClick={closeModal}
                                >
                                    close
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SolveModal;
